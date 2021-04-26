const Categories = require("../models/categories")

module.exports.getAll = (req,res,next)=>{
    Categories.find().then(result=>{
        res.json(result)
    })
}