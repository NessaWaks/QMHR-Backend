const { verifyToken } = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/isAdmin');

router.get('/admin-data', verifyToken, verifyAdmin, adminCtrl.getData);
