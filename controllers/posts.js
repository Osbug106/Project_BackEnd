const mongoose = require("mongoose");
const Posts = require("../models/posts")
const PAGE_SIZE = 20
module.exports.getByVendorInPages = (req, res) => {
    const { vendor, page, size } = req.params;
    let pageSize = PAGE_SIZE;
    let $size = parseInt(size);
    let $page = parseInt(page);
    if (size && $size !== NaN) {
        pageSize = $size
    }
    Posts.count({ merchant_id: vendor }, (err, count) => {
        if (err) {
            res.json({ isOK: false, error: err })
        } else {
            Posts.aggregate([
                {
                    $match: {
                        merchant_id: mongoose.Types.ObjectId(vendor)
                    }
                },
                {
                    $skip: pageSize * ($page - 1)

                },
                {
                    $limit: pageSize,
                },
                {
                    $project: {
                        post_name: 1,
                        _id: 1,
                        category: 1,
                        post_video:1,
                        description: 1,
                        post_images: { "250": 1 },
                        merchant_id: 1
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        // localField: "merchant_id",
                        // foreignField: "_id",
                        "let": { "id": "$merchant_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$eq": ["$$id", "$_id"]
                                    }
                                }
                            },
                            {
                                "$project": {
                                    businessTypeName:1,
                                    business_info: { businessName: 1,businessLocation:1 }, _id: 1, images: {
                                        profile_pic: 1,
                                    }
                                }
                            }
                        ],
                        as: "merchant",
                    },
                },
                { $unwind: '$merchant' },
                {
                    $project: {
                        post_name: 1,
                        _id: 1,
                        category: 1,
                        description: 1,
                        post_images: 1,
                        post_video:1,
                        merchant: 1
                    }
                },

            ])

                // Products
                //     .find({ category: { $in: categories } }, { merchant_id: 1, title: 1, _id: 1, product_images: { "250": 1 } })
                //     .limit(pageSize)
                //     .skip(pageSize * ($page - 1))
                //     .populate("merchant_id", {
                //         business_info: { businessName: 1 }, _id: 1, images: {
                //             profile_pic: {

                //                 "250": 1
                //             }
                //         }
                //     })
                .exec()
                .then((result) => {
                    let pages = Math.ceil(Number(count / pageSize));
                    if (!pages && count > 0) {
                        pages = 1;
                    }
                    res.json({
                        isOK: true,
                        data: result,
                        meta: {
                            totalPages: pages,
                            size: pageSize,
                            count: count,
                            page: $page,
                        },
                    })
                })
                .catch(err => { res.json({ isOK: false, error: err }) })
        }
    })
}