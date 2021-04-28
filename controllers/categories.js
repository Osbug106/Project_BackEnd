const Categories = require("../models/categories")

module.exports.getAll = (req, res, next) => {
    Categories.find({}, { _id: 1, name: 1,productCount:1,
        //  L1: 1, L2: 1, L3: 1, L4: 1,
        parent:1 }).then(result => {
        res.json(result)
    })
}

module.exports.getByLevel = (req, res, next) => {
    const Q = {
        [`L${req.params.level}`]: { $ne: null },
        [`L${Number(req.params.level) + 1}`]: null
    }
    Categories.find(Q).then(result => {
        res.json(result)
    })
}

module.exports.getByParent = (req, res, next) => {
    const Q = {
        parent: req.params.parentId
    }
    Categories.find(Q).then(result => {
        res.json(result)
    })
}