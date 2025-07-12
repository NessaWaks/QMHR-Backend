const router = require('express').Router();
const membershipCtrl = require('../controllers/membershipController');
const { verifyToken } = require('../middleware/auth');

router.post('/register', membershipCtrl.register);
router.post('/login', membershipCtrl.login);

router.get('/', verifyToken, membershipCtrl.getAll);
router.get('/:id', verifyToken, membershipCtrl.getOne);
router.put('/:id', verifyToken, membershipCtrl.update);
router.delete('/:id', verifyToken, membershipCtrl.delete);

module.exports = router;
