// Library

const httpStatus = require("http-status-codes");

// UTILS

const response = require("../libs/utils/response-api");

// MODEL

const db = require("../models/index");

const Team = db.Team;

exports.create = async (req, res) => {
  const { clubname } = req.body;

  const teamcheck = await Team.findOne({
    where: {
      clubname: clubname,
    },
  });
  if (teamcheck) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response.error("Bad Request", `team sudah tersedia`));
  }

  Team.create({
    clubname,
    score: 0,
    points: 0,
    standing: 0,
  })

    .then((result) => {
      res.status(httpStatus.CREATED).json(response.success("Success", result));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.list = (req, res) => {
  Team.findAll()
    .then((data) => {
      res.status(httpStatus.OK).json(response.success("Success", data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.view = (req, res) => {
  Team.findByPk(req.params.id)

    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(
            response.error(
              "Not Found",
              `Team with ID ${req.params.id} Not Found`
            )
          );

      res.status(httpStatus.OK).json(response.success("Success", result));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  await Team.destroy({
    where: { id },
  })

    .then((result) => {
      if (result == 0)
        return res
          .status(httpStatus.NOT_FOUND)
          .json(response.error("Not Found", `Team with ID ${id} Not Found`));

      res.status(httpStatus.OK).json(response.success("Success", {}));
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
