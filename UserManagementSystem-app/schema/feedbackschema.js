const mongoose = require('mongoose')
const moment=require('moment')
const feedbackData = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,},
    mNo: { type: Number, default: null },
    message: { type: String, required: true },
    feedback_creation_Date: { type: String, default:moment().format('LL')},
    feedback_creation_Time: { type: String, default:moment().format('LT')},

    // updated: { type: Date, default: Date.now },
}, {
    versionKey: false
})


module.exports = mongoose.model('FeedbackForm', feedbackData)