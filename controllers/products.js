const Categories = require("../models/categories");
const Products = require("../models/products")

/**
 * by categories paginated result
 * @param {*} req 
 * @param {*} res 
 */
const NUM_LEVELS = 4;
const getAllLevels = (n) => {
    let levels = {};
    for (let i = 1; i <= n; i++) {
        levels[`L${i}`] = 1;
    }
    return levels;
}
const getLevel = (nth) => `L${nth}`;
let PAGE_SIZE = 20;

module.exports.getByCategoryInPages = (req, res) => {
    const { category, page, size } = req.params;
    let pageSize = PAGE_SIZE;
    let $size = parseInt(size);
    let $page=parseInt(page);
    if (size && $size !== NaN) {
        pageSize = $size
    }

    (function getCategories(categories, id, getProducts, RCount) {
        RCount = RCount || { count: 1 }
        RCount.count++;
        Categories.find({ parent: id }, { _id: 1, ...getAllLevels(NUM_LEVELS) }).then(result => {
            RCount.count--;
            for (let r of result) {
                if (r[getLevel(NUM_LEVELS)] === undefined)
                    getCategories(categories, r._id, getProducts, RCount);
                else
                    categories.push(String(r._id));
            }
            categories.push(String(id));
            console.log(`RCount`, RCount)
        }).finally(() => {
            if (RCount.count === 1) {
                if (typeof getProducts === "function")
                    getProducts(categories);
            }
        })
    })([], category, getProducts);
    function getProducts(categories) {
        console.log(`categories`, categories)
        Products.count({ category: { $in: categories } }, (err, count) => {
            if (err) {
                res.json({ isOK: false, error: err })
            } else {
                Products
                    .find({ category: { $in: categories } }, { title: 1, _id: 1, product_images: { "250": 1 } })
                    .limit(pageSize)
                    .skip(pageSize * ($page - 1))
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
                                page:$page,
                            },
                        })
                    }).catch(err => { res.json({ isOK: false, error, err }) })
            }
        })
    }
}
module.exports.getByProductId = (req, res) => { }