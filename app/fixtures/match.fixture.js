module.exports.MATCH_TABLE_NAME = "matchs";
module.exports.MATCH_MODEL_NAME = "Match";

module.exports.MATCH_BELONGS_TO_TEAM = {
  as: "team",
  foreignKey: "team_id",
};
