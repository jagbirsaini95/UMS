const joi = require("joi");
const validation = joi.object({
    fname: joi.string().min(3).max(25).regex(/^[a-zA-Z]/).trim(true).required(),
    username: joi.string().alphanum().min(3).max(25).trim(true).required(),
    mNo: joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
});

const userValidation = async (req, res, next) => {
    const payload = {
        fname: req.body.fname,
        username: req.body.username,
        mNo: req.body.mNo,
        email: req.body.email,
        password: req.body.password,
    }
    // console.log("username :",username);
    const { error } = validation.validate(payload);
    // console.log(error);
    if (error) {
        res.status(401);
        return res.json({
            msg: "Error in User Data ",
            errr: error.message,
        })
    }
    else {
        next();
    }
};
module.exports = userValidation;