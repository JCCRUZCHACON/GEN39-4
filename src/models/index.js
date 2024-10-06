const User = require('./User')
const Post = require('./Post')

// 1:N
Post.belongsTo(User)
User.hasMany(Post)

//RELACIONES MUCHOS A MUCHOS
Post.belongsToMany(User, { through:'favorites' })
User.belongsToMany(Post, { through:'favorites' })
