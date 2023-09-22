import express from 'express';
import { cardCreateValidation, registerValidation, loginValidation } from './validation/validation.js'
import mongoose from 'mongoose'

import { checkAuth, handleValidationError } from './utils/index.js'


import { UserController, CardController } from './controllers/index.js'

import cors from 'cors'

mongoose.set('strictQuery', false);

const user = "user";
const password = "chefdb";

mongoose
	.connect(`mongodb+srv://chef:chefdb@cluster0.ubfmihc.mongodb.net/?retryWrites=true&w=majority`)
	.then( () => console.log('db connect'))
	.catch( (err) => console.log('DB error ', err))

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
	origin: ['https://itsuhsko14.github.io', 'http://localhost:3000'],
}))

app.get('/',  (req, res) => {			
});

app.post('/auth/register', registerValidation, handleValidationError, UserController.register)
app.post('/auth/login',  loginValidation, handleValidationError, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/cards', CardController.getAll)
app.get('/cards/:id', CardController.getOne)
app.post('/cards', checkAuth, cardCreateValidation, CardController.create)
app.delete('/cards/:id', checkAuth, CardController.remove)
app.patch('/cards/:id', checkAuth, CardController.update)

app.listen(PORT, (err) => {
	if (err) {
		return console.log(err);
	}
});

	console.log('Server started on PORT ' + PORT);










