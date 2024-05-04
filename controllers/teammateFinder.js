const { Player, Tenure, CappedPlayer, PlayerCap } = require('../models');

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

const getInternationalTeammates = async (ctx) => {
    try {

        const { playerID1, playerID2 } = ctx.request.body;

        const nationalTeamData1 = await CappedPlayer.findOne({
            where: {
                playerID: playerID1
            }
        });

        const nationalTeamData2 = await CappedPlayer.findOne({
            where: {
                playerID: playerID2
            }
        });

        console.log(nationalTeamData1);
        console.log(nationalTeamData2);

        const nationalTeam1 = nationalTeamData1.nation;
        const nationalTeam2 = nationalTeamData2.nation;

        let commonTeams = [];

        if (nationalTeam1 === nationalTeam2) {
            
            const nationalCaps1 = await PlayerCap.findAll({
                where: {
                    playerID: playerID1
                }
            });

            const nationalCaps2 = await PlayerCap.findAll({
                where: {
                    playerID: playerID2
                }
            });

            

            for (const nationalCap1 of nationalCaps1) {
                for (const nationalCap2 of nationalCaps2) {
                    if (!(nationalCap1.endDate < nationalCap2.startDate || nationalCap1.startDate > nationalCap2.endDate)) {
                        commonTeams = [nationalTeam1];
                        break; // Exit inner loop if a common team is found for this tenure of player1
                    }
                }
            }
        }

        const wereTheyTeammates = commonTeams.length > 0;

        ctx.status = 200;
        ctx.body = { wereTheyTeammates, teams: commonTeams };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
        console.error('Error checking national teammates:', error);
    }
}

module.exports = { getTeammates, getInternationalTeammates  };