const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyAdminToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
  console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided' });
  }

  jwt.verify(token , JWT_SECRET,(err,user)=>{
    if(err){
      return res.status(403).json({message:"Invalid credentials"})
    }
    req.user = user;
    next();
  })

}

module.exports = verifyAdminToken;  