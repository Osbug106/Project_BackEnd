const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const post = new Schema(
    {
        category: [String],
        catalog_id: { type: ObjectId, ref: "catalogs" },
        product_id: { type: ObjectId, ref: "products" },
        more_images: [String],
        status: Boolean,
        isTrashed: Boolean,
        schedule_status: false,
        priceOn: Boolean,
        share_with: [],
        totalViews:Number,
        tags: { type: ObjectId },
        invisible: [],
        post_name: String,
        slug: String,
        bags: String,
        post_class: String,
        price: String,
        merchant_id: { type: ObjectId, ref: "users" },
        description: String,
        optimizedImages: [{}],
        post_images: [{}],
        published_date: Date,
        edit_history: [],
        post_images: [{}]
    }, { timestamps: true })
module.exports = mongoose.model('posts', post);