import { compare } from "bcrypt";
import userModel from "../models/userModel.js";
import { hashPassword } from "./../helpers/authHelper.js";//-----------temporary comment due to error!
import JWT from "jsonwebtoken";
import { comparePassword } from "./../helpers/authHelper.js";


export const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address } = req.body
        //validations
        if (!name) {
            return res.send({ error: 'Name is Required' })
        }
        if (!email) {
            return res.send({ error: 'Email is Required' })
        }
        if (!password) {
            return res.send({ error: 'Password is Required' })
        }
        if (!phone) {
            return res.send({ error: 'Phone is Required' })
        }
        if (!address) {
            return res.send({ error: 'Address is Required' })
        }
        //check the user existing or not
        const existingUser = await userModel.findOne({ email });
        //Existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'User Already Registered! Please Login.',
            })
        }

        //user register
        const hashedPassword = await hashPassword(password);
        //saving the data
        const user = new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            messsage: "Registration Successfull!",
            user,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something Wrong Happened During Registration!',
            error,
        })
    }

};


//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};
