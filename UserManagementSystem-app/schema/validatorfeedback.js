const joi = require("joi");
const validation = joi.object({
    name: joi.string().min(3).max(25).regex(/^[a-zA-Z]/).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    mNo: joi.string().length(10).pattern(/^[0-9]+$/).required(),
    message:joi.string().min(5).max(50).required(),
});

const userValidation = async (req, res, next) => {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        mNo: req.body.mNo,
        message:req.body.message,
    }
    const { error } = validation.validate(payload);
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