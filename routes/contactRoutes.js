const router = require('express').Router();
const contactCtrl = require('../controllers/contactController');
const { verifyToken } = require('../middleware/auth');

router.post('/', contactCtrl.create);
router.get('/', verifyToken, contactCtrl.getAll);
router.get('/:id', verifyToken, contactCtrl.getOne);
router.put('/:id', verifyToken, contactCtrl.update);
router.delete('/:id', verifyToken, contactCtrl.delete);

module.exports = router;
