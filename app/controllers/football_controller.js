// Library

const httpStatus = require("http-status-codes");

// UTILS

const response = require("../libs/utils/response-api");

// MODEL

const db = require("../models/index");

const Team = db.Team;
const Match = db.Match;
const sequelize = db.sequelize;
const QueryTypes = db.Sequelize.QueryTypes;

exports.create = async (req, res) => {
  const { clubhome_id, clubaway_id, score } = req.body;

  try {
    const scoresplit = score.split(":");
    console.log(scoresplit);
    let i;
    let arra = [];
    let max;
    let maxindex;
    for (i = 0; i < scoresplit.length; i++) {
      max = parseInt(scoresplit[0]);
      maxindex = 0;
      if (parseInt(scoresplit[i]) > max) {
        maxindex = i;
        max = parseInt(scoresplit[i]);
      } else if (parseInt(scoresplit[i]) == max) {
        maxindex = null;
      }
      arra.push(parseInt(scoresplit[i]));
    }
    console.log(maxindex);
    console.log(arra);

    var arr = [
      {
        team_id: clubhome_id,
        score: parseInt(scoresplit[0]),
      },
      {
        team_id: clubaway_id,
        score: parseInt(scoresplit[1]),
      },
    ];

    //let i =

    console.log(arr);
    for (const obj of arr) {
      console.log(obj.team_id);
      await Match.create({
        team_id: obj.team_id,
        score: obj.score,
      });
    }

    if (maxindex != null) {
      const idmax = arr[maxindex].team_id;
      const scoremax = arr[maxindex].score;
      const checkteam = await Team.findOne({
        where: {
          id: idmax,
        },
      });

      await Team.update(
        {
          score: checkteam.score + scoremax,
          points: checkteam.points + 3,
        },
        {
          where: {
            id: idmax,
          },
        }
      );
    } else {
      let j;
      for (j = 0; j < arr.length; j++) {
        const checkteam = await Team.findOne({
          where: {
            id: arr[j].team_id,
          },
        });

        await Team.update(
          {
            score: checkteam.score + arr[j].score,
            points: checkteam.points + 1,
          },
          {
            where: { id: arr[j].team_id },
          }
        );
      }
    }
    res.status(httpStatus.CREATED).json(response.success("Success", {}));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.listleaguestanding = async (req, res) => {
  let baseQuery = `
    select 
      id,
      clubname,
      points
    from 
      teams 
    order by points DESC;
  `;
  let result = [];
  try {
    result = await sequelize.query(baseQuery, {
      type: QueryTypes.SELECT,
    });
    res.status(httpStatus.OK).json(response.success("Success", result));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
