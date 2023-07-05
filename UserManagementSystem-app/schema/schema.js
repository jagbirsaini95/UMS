const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenKey = 'mynameisjagbirsinghiamadeveloper'

const userData = new mongoose.Schema({
    role: { type: String, default: 'user', enum: ['admin', 'user'] },
    fname: { type: String, required: true },
    lname: { type: String, default: null },
    username: { type: String, index: { unique: true }, required: true, lowercase: true },
    mNo: { type: Number, default: null },
    email: { type: String, index: { unique: true }, required: true, lowercase: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now, trim: true },
    // updated: { type: Date, default: Date.now },
    tokens: [{ token: { type: String } }]
}, {
    versionKey: false,
    // timestamps:true
})

//generating token
userData.methods.generateAuthToken = async function () {
    try {
        // console.log("i am generatetoken");
        let tokengenerated = jwt.sign({ _id: this._id }, tokenKey)
        this.tokens = this.tokens.concat({ token: tokengenerated })
        await this.save()
        // console.log("bye generatetoken");
        return tokengenerated
    } catch (error) {
        next(error)
    }
}
module.exports = mongoose.model('UsersTable', userData)