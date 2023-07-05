const userSchema = require('../schema/schema')
const bcrypt = require('bcrypt')
const access = require('../access control/accessControl')

module.exports = {
    //granting permission
    //allows only users with certain roles access to the route. 
    // arguments action and resource, 
    // action will be a  readAny, deleteAny, etc.. 
    // resource represents what resource the defined action has permission to operate on e.g profile.
    // roles.can(userRole)[action](resource) determines if user’s role has permission to perform action of provided resource.
    // grantAccess: (action, resource) => {
    //     return async (req, res, next) => {
    //         try {
    //             const permission = access.can(req.user.role)[action](resource);
    //             if (!permission.granted) {
    //                 return res.status(401).json({
    //                     error: "You don't have enough permission to perform this action"
    //                 });
    //             }
    //             next()
    //         } catch (error) {
    //             next(error)
    //         }
    //     }
    // },
    //sign up 
    register: async (userBody, role, res, next) => {
        try {
            const { fname, lname, username, email, password, mNo } = userBody.body
            // console.log("hello register");
            // check if user already exist in our database
            const oldUser = await userSchema.findOne({ $or: [{ username }, { email }] });
            if (oldUser) {
                const error = new Error('email or username already exist. please login')
                error.status = 422
                throw error
            }
            //inserting data in database
            const user = await new userSchema({ fname, lname, role, username, mNo, email, password: await bcrypt.hash(password, 10), })
            const userRegistered = await user.save()
            // console.log("end of register");
            res.status(201).send(user)

            // return res.status(201).redirect('http://localhost:3000/sign-in')
        }
        catch (error) {
            next(error)
        }
    },
    //login route
    login: async (req, res, next) => {
        try {
            // console.log("hello login");
            // const token;
            const { email, password } = req.body
            //input insertion validating
            if (!(email && password)) {
                const error = new Error('all inputs are required')
                error.status = 402
                throw error
            }
            //find if email is available
            const oldUser = await userSchema.findOne({ email });
            if (!oldUser) {
                const error = new Error('email doesnot exist. please signup')
                error.status = 404
                throw error
            }
            // Validate if user exist in our database
            const userLogin = await userSchema.findOne({ email });
            //check role
            // if (userLogin.role !== role) {
            //     const error = new Error('please make sure you are login from right portal') // user or admin portal
            //     error.status = 403
            //     throw error
            // }

            //correct portal check for credentials
            if (userLogin && await bcrypt.compare(password, userLogin.password)) {
                //calling generate token
                const token = await userLogin.generateAuthToken()
                // console.log("token:", token) 
                //storing token in cookie and sending to client
                res.cookie('x', token, {
                    // path: "/",
                    // sameSite: true,
                    maxAge: 1000 * 60 * 60 * 1, // would expire after 1 hours,
                    httpOnly: true
                })
                // res.redirect('http://localhost:3000/welcome')
                res.status(200).send(userLogin)
            }
            else {
                const error = new Error('check credentials')
                error.status = 401
                throw error
            }
        }
        catch (error) {
            next(error)
        }
    },
    // admininfo / userinfo profile route
    user: async (req, res, next) => {
        try {
            //getting data from jwt verify middleware i.e. req.user
            let user = req.user
            // show only user info to user and removing key value pair of password using function
            const removedPswrd = (user) => {
                return {
                    _id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    mNo: user.mNo,
                    created: user.created,
                }
            }
            // function call of remove password key value pair and send response
            res.status(200).send(removedPswrd(user))

        } catch (error) {
            next(error)
        }
    },
    // getall users/admin route
    users: async (req, res, next) => {
        try {
            // console.log("hello about us");
            //regex mongodb search and pagination
            let skip = req.query.skip || 0;
            let limit = 5;
            let search = req.query.search || '';
            let filter={
                $or: [
                    { fname: { $regex: search } },
                    { lname: { $regex: search } },
                    { username: { $regex: search } },
                    { email: { $regex: search } },
                ]
            }
            let totalFiltered=await userSchema.find(filter).countDocuments();
            const userFiltered = await userSchema.find(filter).sort({ fname: req.query.sort }).limit(limit).skip(skip)
            // console.log(totalFiltered);
            res.status(200).json({totalFiltered,userFiltered})

        } catch (error) {
            next(error)
        }
    },

    updateuser: async (req, res, next) => {
        try {
            // console.log("hello update",req.body._id);
            //update user on the basis of id
            const userupdate = await userSchema.findOneAndUpdate({ _id: req.body._id }, {
                fname: req.body.fname,
                lname: req.body.lname,
                mNo: req.body.mNo
            },
                { new: true } //used to return updated data
            )
            // or $set method 
            // const userupdate = await userSchema.findOneAndUpdate({ _id: req.body._id }, {
            //     $set:[
            //       { fname: req.body.fname},
            //        {lname: req.body.lname},
            //         {mNo: req.body.mNo}
            //     ]
            // },
            //     { new: true } //used to return updated data
            // )

            // console.log(userupdate)
            if (userupdate) {
                res.status(200).json({ msg: "new data", userupdate })
            }
            else throw new Error('unable to update')
        } catch (error) {
            next(error)
        }
    },
    deleteuser: async (req, res, next) => {
        try {
            // console.log("hello delete", req.query.username);
            //check user exist or not
            const userFound = await userSchema.findOne({ username: req.query.username });
            // console.log(userFound)
            if (!userFound) {
                const error = new Error('no user found')
                error.status = 401
                throw error
            }
            else {
                //if user exist delete user
                const userdelete = await userSchema.findOneAndDelete({ username: req.query.username })
                if (userdelete) {
                    res.status(202).send(userdelete)
                }
                else {
                    throw new Error('unable to update')
                }
            }
        } catch (error) {
            next(error)
        }
    },
    //forget password
    forgetpassword: async (req, res, next) => {
        try {
            // console.log("hi forget")
            const { email, fname } = req.body
            //match email and fname in data base
            const forgetData = await userSchema.findOne({ email, fname })
            //if match not found
            if (!forgetData) throw new Error("Data missmatch")
            res.status(200).send(forgetData)
        } catch (error) {
            next(error)
        }
    },
    //logout
    logout: async (req, res, next) => {
        // console.log(x-access-token)
        // console.log("hello logout");
        res.clearCookie('x')
        const msg = "log out success"
        res.status(201).send(msg)
        // console.log(("bye log out"));
    },
}