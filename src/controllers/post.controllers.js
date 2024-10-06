const catchError = require("../utils/catchError");
const {getAllServices, createServices, getOneServices, updateServices, removeServices} = require("../services/post.services");
const Post = require("../models/Post");

const getAll = catchError(async (req, res) => {
  const results = await getAllServices();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const user = req.user;
  const newBody = { ...req.body, userId: user.id };
  const result = await createServices(newBody);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getOneServices(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await removeServices(id);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { post } = req.body
  const result = await updateServices(id, 
    { post },
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setUser = catchError(async(req, res) => {
  const { id } =  req.params
  const post = await Post.findByPk(id)
  await post.setUsers(req.body)
  const users = await post.getUsers()
  return res.json(users)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setUser
};
