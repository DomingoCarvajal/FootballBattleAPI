const { PlayerCap, CappedPlayer } = require('../models');

// Controller function to create a new player cap

const createPlayerCap = async (ctx) => {
    try {
        // Extract request data
        const { playerID, startDate, endDate } = ctx.request.body;
    
        // Create a new player cap record
        const playerCap = await PlayerCap.create({
        playerID,
        startDate,
        endDate,
        });
    
        // Send response
        ctx.status = 201;
        ctx.body = { playerCap };
    } catch (error) {
        // Handle errors
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
        console.error('Error creating player cap:', error);
    }
};

const getPlayerCaps = async (ctx) => {
    try {
        // Extract request data
        const { playerID } = ctx.request.body;
    
        // Get player caps for the player
        const playerCaps = await PlayerCap.findAll({
        where: {
            playerID,
        },
        });
    
        // Send response
        ctx.status = 200;
        ctx.body = { playerCaps };
    } catch (error) {
        // Handle errors
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
        console.error('Error retrieving player caps:', error);
    }
};

const createCappedPlayer = async (ctx) => {
    try {
        // Extract request data
        const { playerID, nation } = ctx.request.body;
    
        // Create a new capped player record
        const cappedPlayer = await CappedPlayer.create({
        playerID,
        nation,
        });
    
        // Send response
        ctx.status = 201;
        ctx.body = { cappedPlayer };
    } catch (error) {
        // Handle errors
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
        console.error('Error creating capped player:', error);
    }
}

const getCappedPlayer = async (ctx) => {
    try {
        // Extract request data
        const { playerID } = ctx.request.body;
    
        // Get capped players for the player
        const cappedPlayer = await CappedPlayer.findOne({
        where: {
            playerID,
        },
        });
    
        // Send response
        ctx.status = 200;
        ctx.body = { cappedPlayer };
    } catch (error) {
        // Handle errors
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
        console.error('Error retrieving capped players:', error);
    }
};


module.exports = { createPlayerCap, getPlayerCaps, createCappedPlayer, getCappedPlayer };
