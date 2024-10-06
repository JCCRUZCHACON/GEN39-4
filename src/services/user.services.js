const Post = require("../models/Post")
const User = require("../models/User")

const getAllServices = async() => {
return await User.findAll({include: [Post]})
}

const createServices = async(user) => {
    return await User.create(user)
}

const getOneServices = async(id) => {
    return await User.findByPk(id, {include: [Post]})
}

const removeServices = async(id) => {
    return await User.destroy({ where: {id} });
}

const updateServices = async(id, user) => {
    return await User.update(user, { where: {id}, returning: true })
}

const getUserServices = async (email) => {
    return await User.findOne({ where: { email}});
  };

module.exports = {
    getAllServices,
    createServices,
    getOneServices,
    removeServices,
    updateServices,
    getUserServices
}