// Library

const httpStatus = require("http-status-codes");

// UTILS

const response = require("../libs/utils/response-api");

exports.create = async (req, res) => {
  const { first_word, second_word } = req.body;

  try {
    const arr1 = first_word.split("");
    const arr2 = second_word.split("");

    console.log(arr1);
    console.log(arr2);

    let newarr = [];

    for (i = 0; i < arr2.length; i++) {
      for (j = 0; j < arr1.length; j++) {
        console.log(arr2[i]);
        console.log(arr1[j]);
        if (arr2[i] === arr1[j]) {
          arr2[i] = null;
          arr1[j] = null;
        }
      }
      // newarr.push(arr1[j]);
    }
    console.log(arr1);
    console.log(arr1.length);
    let result;
    if (allAreNull(arr1) == true) {
      result = true;
    } else {
      result = false;
    }
    res.status(httpStatus.OK).json(response.success("Success", result));

    //res.status(httpStatus.CREATED).json(response.success("Success", {}));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

function allAreNull(arr) {
  return arr.every((element) => element === null);
}
