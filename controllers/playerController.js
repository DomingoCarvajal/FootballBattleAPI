const { Player} = require('../models');

// Controller function to create a new tenure
const createPlayer = async (ctx) => {
  try {
    // Extract request data
    const { playerName, tmID } = ctx.request.body;

    // Create a new playerrecord
    const player= await Player.create({     
        playerName,
        tmID
    });

    // Send response
    ctx.status = 201;
    ctx.body = { player};
  } catch (error) {
    // Handle errors
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
    console.error('Error creating player:', error);
  }
};

const getPlayers = async (ctx) => {
  try {
      // Get only id and playerName columns for all players
      const players = await Player.findAll({
          attributes: ['id', 'playerName']
      });
  
      // Send response
      ctx.status = 200;
      ctx.body = { players };
  } catch (error) {
      // Handle errors
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
      console.error('Error fetching players:', error);
  }
};

const getPlayerByID = async (ctx) => {
  try {
      // Get only player with given id
      const player = await Player.findOne({
          where: {
            id: ctx.params.id
          }
      });

      // Send response
      ctx.status = 200;
      ctx.body = { player };
  } catch (error) {
      // Handle errors
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
      console.error('Error fetching players:', error);
  }
};

const getPlayerIDs = async (ctx) => {
  try {
      // Get only id and playerName columns for all players
      const players = await Player.findAll({
          attributes: ['tmID']
      });
  
      // Send response
      ctx.status = 200;
      ctx.body = { players };
  } catch (error) {
      // Handle errors
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
      console.error('Error fetching players:', error);
  }
};

    

module.exports = { createPlayer, getPlayers, getPlayerIDs, getPlayerByID  };