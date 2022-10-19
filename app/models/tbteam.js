"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model, Op } = require("sequelize");
const {
  TEAM_MODEL_NAME,
  TEAM_TABLE_NAME,
  TEAM_HAS_MANY_MATCH,
} = require("../fixtures/team.fixture");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Match, TEAM_HAS_MANY_MATCH);
    }
  }
  Team.init(
    {
      id: { allowNull: true, primaryKey: true, type: DataTypes.UUID },
      clubname: DataTypes.STRING,
      score: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      standing: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: TEAM_MODEL_NAME,
      tableName: TEAM_TABLE_NAME,
    }
  );

  Team.beforeCreate((model, options) => {
    return (model.id = uuidv4());
  });

  return Team;
};
