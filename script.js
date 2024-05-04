// Import Sequelize models
const { Transfer } = require('./models');

// Define a function to create a transfer
async function createTransfer() {
    try {
        // Define transfer data
        const transferData = {
            player_name: 'John Doe',
            from_club: 'Old Club',
            to_club: 'New Club',
            season: '2023/2024',
            date: '2023-06-30',
            fee: 1000000, // Example fee in Euros
        };

        // Create transfer in the database
        const transfer = await Transfer.create(transferData);

        console.log('Transfer created successfully:');
        console.log(transfer.toJSON());
    } catch (error) {
        console.error('Error creating transfer:', error);
    }
}

// Call the function to create a transfer
createTransfer();
