const catchError = require('../utils/catchError');
const { getAllServices, createServices, getOneServices, removeServices, updateServices } = require('../services/user.services');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const results = await getAllServices();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    //! UN EJEMPLO CON EL RESTOFPROPERTY: SE ESTA COLOCANDO EN UN NUEVO OBJETO Y GUARDADO EN 
    //! UNA NUEVA VARIABLE newBody, req.passwordHash viene del hash.middlewares
    const newBody = { ...req.body, password: req.passwordHash };
    const result = await createServices(newBody)
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await getOneServices(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await removeServices(id)
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName, image, dateOfBirth} = req.body
    const result = await updateServices(id, 
        { firstName, lastName, image, dateOfBirth}
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
    const user = req.userLogin;
    if (!user) return res.status(401).json({ error: "invalid credencias" });
  
    const token = jwt.sign(
      { user }, 
      process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ user, token });
  });

  const logged = catchError(async(req, res) => {
    return res.json(req.user)
  })

  const setPost = catchError(async(req, res) => {
    const { id } =  req.params
    const user = await User.findByPk(id)
    await user.setPosts(req.body)
    const posts = await user.getPosts()
    return res.json(posts)
  })

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged,
    setPost
}