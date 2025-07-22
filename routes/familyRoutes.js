const router = require('express').Router();
const familyCtrl = require('../controllers/familyController');

// No more token verification here
router.post('/register', familyCtrl.register);
router.post('/login', familyCtrl.login);

// Open admin routes
router.get('/', familyCtrl.getAll);
router.get('/:id', familyCtrl.getOne);
router.put('/:id', familyCtrl.update);
router.delete('/:id', familyCtrl.delete);

module.exports = router;
