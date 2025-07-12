const router = require('express').Router();
const familyCtrl = require('../controllers/familyController');
const { verifyToken } = require('../middleware/auth');

router.post('/register', familyCtrl.register);
router.post('/login', familyCtrl.login);

router.get('/', verifyToken, familyCtrl.getAll);
router.get('/:id', verifyToken, familyCtrl.getOne);
router.put('/:id', verifyToken, familyCtrl.update);
router.delete('/:id', verifyToken, familyCtrl.delete);

module.exports = router;
