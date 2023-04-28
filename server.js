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

const PORT = 5000;

app.use(express.json());

app.use(cors())


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


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-9zY5NAFS_dTA1dlbZXAwh1DwRlWWIfE",
  authDomain: "cheff-173de.firebaseapp.com",
  projectId: "cheff-173de",
  storageBucket: "cheff-173de.appspot.com",
  messagingSenderId: "487205944495",
  appId: "1:487205944495:web:56db277958a946cc05685a",
  measurementId: "G-PXF2BYHGP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);











