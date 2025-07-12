const router = require('express').Router();
const announcementCtrl = require('../controllers/announcementController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, announcementCtrl.create);
router.get('/', announcementCtrl.getAll);
router.get('/:id', announcementCtrl.getOne);
router.put('/:id', verifyToken, announcementCtrl.update);
router.delete('/:id', verifyToken, announcementCtrl.delete);

module.exports = router;
