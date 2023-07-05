const feedbackSchema = require('../schema/feedbackschema')
module.exports = {
    feedback: async (req, res, next) => {
        try {
            const { name, email, mNo, message } = req.body;
            const feedbackData = new feedbackSchema({ name, email, mNo, message })
            // console.log("hello feedback form")
            const dataSaved = await feedbackData.save()
            // console.log(dataSaved);
            res.status(201).send(dataSaved)
        } catch (error) {
            next(error)
        }
    },
    getallfeedbacks:async (req,res,next)=>{
        try {
            feedbackSchema.find({}, { projection: { _id: 0, } },
                function (err, result) {
                    if (err) throw new Error(err);
                    // console.log(result);
                    res.send(result)
                });
        } catch (error) {
            next(error)
        }
    }
}