import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'	
import { validationResult } from 'express-validator'
import UserModel  from '../models/user.js'
import mongoose from 'mongoose'

export const register = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email: req.body.email,
			userName: req.body.userName,
			passwordHash: hash,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			},
		)

		const {passwordHash, ...userData} = user._doc;

		console.log(token);
		res.json({
			... userData,
			token
		})
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'dont registrate',
		})
	}
}


export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email});
		

		if (!user) {
			return res.status(404).json({
				message: 'User not find',
			})
		}

		const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isValidPass) {
			return res.status(400).json({
					message: 'Password or login is not corrects'
			})
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			},
		)

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Authorization is wrong',
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId)
		console.log(user);

		if (!user) {
			console.log('Error: user not defined');
			return res.status(404).json({
				message: 'User not exist',
			});
		}

		const { passwordHash, ...userData } = user._doc;
		console.log('userData');
		console.log(userData);
		res.json(userData)

	} catch(err) {
		console.log(err);
		return res.status(500).json({
			message: 'Nono acces'
		})
	}
}