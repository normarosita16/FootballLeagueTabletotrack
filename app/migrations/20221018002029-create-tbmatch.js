const { MATCH_TABLE_NAME } = require("../fixtures/match.fixture");
const { TEAM_TABLE_NAME } = require("../fixtures/team.fixture");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(MATCH_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: TEAM_TABLE_NAME,
          },
          key: "id",
        },
      },
      score: {
        type: Sequelize.INTEGER,
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(MATCH_TABLE_NAME);
  },
};
