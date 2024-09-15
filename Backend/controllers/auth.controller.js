import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { generateTokenAndCookie } from '../utils/generateToken.js';

export async function signup(req, res) {
    const { username, email, password } = req.body
    try {

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'all field are required' })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            res.status(400).json({ success: false, message: 'invalid Email' })
        }
        if (password.length < 6) {
            res.status(400).json({ success: false, message: 'password should be at least 6 characters' })
        }

        const existingUserByEmail = await User.findOne({ email: email })

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }


        const existingUserByUsername = await User.findOne({ username: username })

        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: 'Username already exists' })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const profile_pics = ['/avatar1.png', '/avatar2.png', '/avatar3.png']

        const image = profile_pics[Math.floor(Math.random() * profile_pics.length)]

        const newUser = await User({
            username,
            email,
            password: hashedPassword,
            image
        })

        generateTokenAndCookie(newUser._id, res);

        await newUser.save()

        res.status(201).json({
            success: true, user: {
                ...newUser._doc,
                password: ""
            }
        })


    } catch (error) {
        console.error("error in signup controller : " + error.message);

        res.status(400).json({ success: false, message: "Internal server error" })
    }
}

export async function login(req, res) {
    try {
        const { email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const user = await User.findOne({ email:email })

        if (!user) {
            res.status(404).json({ success: false, message: 'Invalid credentials' })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)

        if (!isPasswordCorrect) {
            res.status(400).json({ success: false, message: 'Invalid credentials' })
        }
        generateTokenAndCookie(user._id, res);

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""
            }
        })

    } catch (error) {
        console.error('error in login controller : ' + error.message);
        res.status(400).json({ success: false, message: "Internal server error" })

    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('jwt-netflix')
        // res.cookie("jwt-netflix","")
        res.status(200).json({ success: true, message: 'Logged out successful' })
        res.end()
    } catch (error) {
        console.error("error in logout controller : " + error.message);
        res.status(400).json({ success: false, message: "internal server error" })
    }
}



export async function authCheck(req, res) {
	try {
		// console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}