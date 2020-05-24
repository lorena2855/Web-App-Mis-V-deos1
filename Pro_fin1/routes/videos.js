const router = require('express').Router();

const videoController = require('../controllers/video');
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');


router.get('/', isLoggedIn, videoController.list);


router.get('/add', (req, res) => {
    pool.query('SELECT * FROM red_social ', (err, red) => {
        res.render('videos/add', {
            red: red
        });
    });
});
router.post('/add', videoController.save);
router.get('/update/:id', videoController.edit);
router.post('/update/:id', videoController.update);
router.get('/delete/:id', videoController.delete);

//---------------------------------------------------------------------
router.get('/api', isLoggedIn, videoController.list_api);


router.get('/api/add', (req, res) => {
    pool.query('SELECT * FROM red_social ', (err, red) => {
        res.json({
            red: red
        });
    });
});
router.post('/api/add', videoController.save_api);
router.get('/api/update/:id', videoController.edit_api);
router.post('/api/update/:id', videoController.update_api);
router.get('/api/delete/:id', videoController.delete_api);



module.exports = router;