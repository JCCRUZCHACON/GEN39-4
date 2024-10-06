const { getUserServices } = require("../services/user.services");
const bcrypt = require('bcrypt')

const credentials = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await getUserServices(email)
    if(!user) return res.status(401).json({ error: "invalid credencias"})

    const  isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({ error: "invalid credencias"})

    req.userLogin = user

    next()
}
module.exports = credentials