const express = require('express');
const userRouter = require('./router/user.router');
const postRouter = require('./router/post.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)
router.use('/posts', postRouter)

module.exports = router;