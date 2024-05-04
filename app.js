const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors'); // Import the CORS middleware

const playerController = require('./controllers/playerController');
const tenureController = require('./controllers/tenureController');
const capsController = require('./controllers/capsController');
const teammateFinder = require('./controllers/teammateFinder');

const app = new Koa();
const router = new Router(); // Create a router instance

// Middleware to parse request bodies
app.use(bodyParser());

// Enable CORS middleware
app.use(cors());

// Define your routes using the router instance
router.post('/tenures', tenureController.createTenure);
router.post('/player-tenures', tenureController.getPlayerTenures);
// router.post('/teammates', tenureController.getTeammates);
router.get('/player-names', tenureController.getPlayerNames);
router.post('/players', playerController.createPlayer);
router.get('/players', playerController.getPlayers);
router.get('/players/:id', playerController.getPlayerByID);
router.get('/player-ids', playerController.getPlayerIDs);
router.post('/capped-players', capsController.createCappedPlayer);
router.get('/capped-players', capsController.getCappedPlayer);
router.post('/player-caps', capsController.createPlayerCap);
router.get('/player-caps', capsController.getPlayerCaps);
router.post('/teammates', teammateFinder.getTeammates);
router.post('/international-teammates', teammateFinder.getInternationalTeammates);

router.get('/test', (ctx) => {
  ctx.body = 'Hello World';
});

// Use the router routes
app.use(router.routes());
app.use(router.allowedMethods());

// Set the port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

