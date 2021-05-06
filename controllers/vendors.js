const Users = require("../models/users")
module.exports.getAll = (req, res, next) => {
    Users.find({
        isTrashed: false,
        user_type: "general",
        "status": {
            active: true,
            suspended: false
        }
    }, {
        username: 1,
        email_verification: 1,
        phone_number_verification: 1, images: 1,
        business_info: 1, _id: 1,
        businessTypeName: 1, profileCompletion: 1
    })
        .then(result => {

            res.json(result)
        })
        .catch(err => {
            console.log(`err`, err)
            res.json({ error: err || {} })
        })
}

module.exports.getByProfileCompletion = (req, res, next) => {
    Users.find({
        isTrashed: false,
        user_type: "general", "status": {
            active: true,
            suspended: false,
        }, profileCompleteion: { $gte: req.params.percent }
    }, {
        email_verification: 1,
        phone_number_verification: 1, images: 1, location: 1, buisness_name: 1, _id: 1, businessTypeName: 1, profileCompletion: 1
    })
        .then(result => res.json(result))
        .catch(err => res.json({ error: err || {} }))
}

module.exports.getById = (req, res, next) => {
    Users.find({
        user_type: "general", "status": {
            active: true,
            suspended: false,
        }, _id: req.params.id
    }, {})
        .then(result => res.json(result))
        .catch(err => res.json({ error: err || {} }))
}