const router = require('express').Router();

const user_videoController = require('../controllers/user_videos');


router.get('/user_videos/:id', user_videoController.list);
router.get('/users', user_videoController.list_users);

router.get('/api/user_videos/:id', user_videoController.lists);
router.get('/api/users', user_videoController.list_users_api);

module.exports = router;