const {Router} = require('express');
const WalletsController = require('../controllers/WalletsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const walletRoutes = Router();
const walletsController = new WalletsController();

walletRoutes.use(ensureAuthenticated);

walletRoutes.post('/', walletsController.create);
walletRoutes.get('/', walletsController.index);
walletRoutes.delete('/:id', walletsController.delete);
walletRoutes.put('/:id', walletsController.update);

module.exports = walletRoutes;