const User = require('../models/User')
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const { response } = require('express')

/**
 * @DESC To register the user (user, retailer, admin)
 */ 
const userRegister = async (userDets, role, res) => {
    try {
        const { name, email, phone, password } = { name: userDets.name, email: userDets.email, phone: userDets.phone, password: userDets.password };
        // let errors = [];
        //Check every field should filled
        if (!name || !email || !phone || !password) 
        {
            // errors.push({ msg: 'All field should required to fill' } );
            return res.json({ msg: 'All field should required to fill' });
        }
        //Check password length
        if (password.length < 6)
        {
            // errors.push({ msg: 'Password should at least 6 charecters' });
            return res.json({ msg: 'Password should at least 6 charecters' });
        }
        //Validate the email for username
        let username = await User.findOne({ email });
        let username2 = await User.findOne({ phone });
        if (username)
        {
            // errors.push({msg: 'Email already exist'})
            return res.status(400).json({ msg: "Email already exist" });
        }
        if (username2)
        {    
            // errors.push({msg: 'Mobile no already exist'})
            return res.status(400).json({ msg: 'Mobile no already exist' })
        }
        // Get password hashed
        const passwordHashed = await bcrypt.hash(userDets.password, 12);

        // //Check any errors
        // if (errors.length > 0) 
        // {
        //     res.json(errors);
        // }
        
        //Create a new user
        const newUser = new User({
            ...userDets,
            password:passwordHashed,
            role
        })
        await newUser.save()
        return res.status(201).json({msg:'User register sucessfully'})
    } catch (error) {
        if (error) throw error;
    }


}

// const userRegister = async(userDets, role, res) => {
//     try {
//         //User valideate from Mobile & Email id
//         let usernameTaken = await validatePhone(userDets.userphone)
//         let emailRegistered = await validateEmail(userDets.useremail)
//         // let errors = [];
//         // //Check Name 
//         // if (!userDets.name || !userDets.email || !userDets.phone || !userDets.password){
//         //     res.json({ msg: 'Name is required' });
//         //     errors.push({ msg: 'Please fill the all fields' });
//         // }
//         // //Check Name 
//         // if (userDets.password.length<6){
//         //     res.json({ msg: 'Password must be 6 characters' });
//         //     errors.push({msg: 'Password should be at least 6 characters'})
//         // }

//         if (!usernameTaken || !emailRegistered){
//             return res.status(400).json({msg:'User already exist'})
//         }
//         // Get password hashed
//         const password = await bcrypt.hash(userDets.password, 12)
//         //Create a new user
//         const newUser = new User({
//             ...userDets,
//             password,
//             role
//         })
//         await newUser.save()
//         return res.status(201).json({msg:'User register sucessfully'})
//     } catch (err) {
//         //Implement logger function (Wingston)
//         if (err) throw err;
//         return res.status(500).json({msg:'Unable to create your account'})
//     }

// }

// const validatePhone = async phone => {
//     let userphone = await User.findOne({ phone });
//     // console.log(userphone)
//     return userphone ? false : true;
// }
// const validateEmail = async email => {
//     let useremail = await User.findOne({ email })
//     // console.log(useremail)
//     return useremail ? false : true;
// }
/**
 * @DESC To register the user (user, retailer, admin)
 */ 
const userLogin = async (userCreds, role, res) => {
    let { email, password } = userCreds;
    //First check the username in the database
    const user = await User.findOne({ email })
    if(!user) return res.status(404).json({msg: "User doesn't exist"})
    //Second check the role of user
    if (user.role !== role) return res.status(403).json({ msg: "Make sure you are login to right portal" })
    
    //That mean the user is existing and trying to signin from the right portal
    //Now check the password 
    let isMatch = await bcrypt.compare(password, user.password)
    if (isMatch){
        //Sign in the token and issue the user
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            email: user.email,
            phone: user.phone
        }, SECRET, { expiresIn: "7d" })
        
        let result = {
            email: user.email,
            role: user.role,
            phone: user.phone,
            token: `Bearer ${token}`,
            expiresIn: 168
        }
        return res.status(200).json({
            ...result,
            msg: "You are logged in"
        })
    } else{
        return res.status(403).json({msg: "Password is incorrect"})
    }
}

/**
 * @Dec Passport middleare
 */
const userAuth = passport.authenticate('jwt', { session: false })

/**
 * @DESSC Check the roles Middleware
 */
const checkRole = roles => (req, res, next) => !roles.includes(req.user.role) ? res.status(400).json({ msg: "Access denied" }) : next();

//Seriealise function
const serializeUser = user => {
    return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        _id: user._id,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    }
}

module.exports = {
    userRegister,
    userLogin,
    userAuth,
    checkRole,
    serializeUser

}