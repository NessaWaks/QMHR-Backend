const router = require('express').Router();
const membershipCtrl = require('../controllers/membershipController');

// No more token verification here
router.post('/register', membershipCtrl.register);
router.post('/login', membershipCtrl.login);

// Open admin routes
router.get('/', membershipCtrl.getAll);
router.get('/:id', membershipCtrl.getOne);
router.put('/:id', membershipCtrl.update);
router.delete('/:id', membershipCtrl.delete);

module.exports = router;
