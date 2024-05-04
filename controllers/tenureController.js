// Import the Tenure model
const { Player, Tenure } = require('../models');

// Controller function to create a new tenure
const createTenure = async (ctx) => {
  try {
    // Extract request data
    const { playerID, team, startDate, endDate } = ctx.request.body;

    // Create a new tenure record
    const tenure = await Tenure.create({
      playerID,
      team,
      startDate,
      endDate,
    });

    // Send response
    ctx.status = 201;
    ctx.body = { tenure };
  } catch (error) {
    // Handle errors
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
    console.error('Error creating tenure:', error);
  }
};

const getPlayerTenures = async (ctx) => {
  try {
    console.log('getPlayerTenures');
    // Extract request data
    const { playerID } = ctx.request.body;

    // Get tenures for the player
    const tenures = await Tenure.findAll({
      where: {
        playerID,
      },
    });

    // Send response
    ctx.status = 200;
    ctx.body = { tenures };
  } catch (error) {
    // Handle errors
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
    console.error('Error retrieving tenures:', error);
  }
};


const getTeammates = async (ctx) => {
  try {
    // Extract player names from request body
    const { playerID1, playerID2 } = ctx.request.body;

    // Fetch tenures for both players
    const tenuresPlayer1 = await Tenure.findAll({ where: { playerID: playerID1 } });
    const tenuresPlayer2 = await Tenure.findAll({ where: { playerID: playerID2 } });

    // Initialize array to store common teams
    let commonTeams = [];

    // Check for common teams and overlapping tenures
    for (const tenure1 of tenuresPlayer1) {
      for (const tenure2 of tenuresPlayer2) {
        if (tenure1.team === tenure2.team && commonTeams.includes(tenure1.team) === false &&
            !(tenure1.endDate < tenure2.startDate || tenure1.startDate > tenure2.endDate)) {
          commonTeams.push(tenure1.team);
          break; // Exit inner loop if a common team is found for this tenure of player1
        }
      }
    }

    // Check if common teams were found
    const wereTheyTeammates = commonTeams.length > 0;

    // Send response
    ctx.status = 200;
    ctx.body = { wereTheyTeammates, teams: commonTeams };
  } catch (error) {
    // Handle errors
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
    console.error('Error checking teammates:', error);
  }
};

// Controller function to get all player names
const getPlayerNames = async (ctx) => {
  try {
    // Query the database for all distinct player names
    const playerNames = await Tenure.findAll({
      attributes: ['playerName'], // Select only the playerName attribute
      group: ['playerName'], // Group by playerName to get distinct values
    });

    // Extract player names from the query result
    const names = playerNames.map((player) => player.playerName);

    // Send response with the list of player names
    ctx.status = 200;
    ctx.body = { playerNames: names };
  } catch (error) {
    // Handle errors
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
    console.error('Error retrieving player names:', error);
  }
};



// Export controller function
module.exports = { createTenure, getPlayerTenures, getTeammates, getPlayerNames };
