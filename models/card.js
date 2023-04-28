import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema(
	{
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: false,
	}, 
	items: [
		{
			name: {type: String},
			quantity: {type: Number}
		}
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	
	
	}, { 
		timestamps: true
		}
)

export default mongoose.model('Card', CardSchema)