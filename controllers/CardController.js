import CardModel from '../models/card.js'
import mongoose from 'mongoose'

export const getAll = async (req, res) => {
	try {
		const cards = await CardModel.find().populate('user').exec();
		console.log(cards);
		res.json(cards);
	} catch(err) {
		console.log("Get all error: ");
		console.log(err);
		res.status(500).json({
			message: "Can't find cards"
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const cardId = req.params.id;
		console.log(cardId);
		const card = await CardModel.findOne({
			_id: cardId
		})
		res.json(card);
		
	} catch(err) {
		console.log("GetOne error: ");
		console.log(err);
		res.status(500).json({
			message: "Can't find cards"
		})
	}
}

export const create = async (req, res) => {
	try {
		console.log("card controller create started");
		const doc = new CardModel({
			title: req.body.title,
			text: req.body.text,
			items: req.body.items,
			user: req.userId,
		});

		const card = await doc.save();
		console.log(card);
		res.json(card);
		
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Can't create card"
		})

	}
}

export const remove = async (req, res) => {
	try {
		const cardId = req.params.id;
		console.log(cardId);
		console.log('function remove on server')
		const result = await CardModel.findOneAndDelete(
		{
			_id: cardId,
		})
		
		return res.json({
				message: "card was delete"
			})
		

		console.log("result");
		console.log(result);
					
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Can't delete card"
		})
	}
}

export const update = async (req, res) => {
	try {
		const cardId = req.params.id;

		const result = await CardModel.updateOne(
			{
				_id: cardId
			},
			{
				title: req.body.title,
				text: req.body.text,
				user: req.userId,
			}
		)

		console.log('result');
		console.log(result);

		return res.json({
			message: "card updated"
		})
	} catch(err) {
		console.log("err");
		console.log(err);
		res.status(500).json({	
			message: "Card not updated"
		})
	}
}
