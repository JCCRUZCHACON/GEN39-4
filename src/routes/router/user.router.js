const { getAll, create, getOne, remove, update, login, logged, setPost } = require('../../controllers/user.controllers');
const express = require('express');
const hash = require('../../middlewares/hash.middlewares');
const credentials = require('../../middlewares/login.middlewares');
const { verifyJWT } = require('../../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT, getAll)
    .post(hash, create);

userRouter.route('/login')
    .post(credentials, login)

userRouter.route('/me')
    .get(verifyJWT, logged)

userRouter.route('/:id/posts')
.post(setPost)

userRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRouter;