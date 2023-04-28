import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	const token = ( req.headers.authorization || '').replace(/Bearer\s?/, '')
	
	if (token) {
		try {
			const decoded = jwt.verify(token, 'secret123');
			console.log("checkAuth complete")
			req.userId = decoded._id;
			next();
		} catch (err) {
			console.log(err);
			return res.status(403).json({
				message: 'no acces'
			})
		}
	} else {
		return res.status(403).json({
			message: "No acces from checkAuth.js"
		})
	}
}