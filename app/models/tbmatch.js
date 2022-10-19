"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model, Op } = require("sequelize");
const {
  MATCH_MODEL_NAME,
  MATCH_TABLE_NAME,
  MATCH_BELONGS_TO_TEAM,
} = require("../fixtures/match.fixture");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Team, MATCH_BELONGS_TO_TEAM);
    }
  }
  Match.init(
    {
      id: { allowNull: true, primaryKey: true, type: DataTypes.UUID },
      team_id: DataTypes.UUID,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: MATCH_MODEL_NAME,
      tableName: MATCH_TABLE_NAME,
    }
  );

  Match.beforeCreate((model, options) => {
    return (model.id = uuidv4());
  });

  return Match;
};
