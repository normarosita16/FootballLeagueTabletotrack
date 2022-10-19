module.exports.TEAM_TABLE_NAME = "teams";
module.exports.TEAM_MODEL_NAME = "Team";

module.exports.TEAM_HAS_MANY_MATCH = {
  as: "match",
  foreignKey: "team_id",
};
