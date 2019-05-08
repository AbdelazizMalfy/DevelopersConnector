const express = require('express');
const router  = express.Router();

// @route  GET api/posts/test
// @desc   Tests posts route
// @access Puplic
router.get('/test', (req,res) => res.json({msg:'posts works'}))


module.exports = router;