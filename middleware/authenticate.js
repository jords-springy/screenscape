import {compare} from 'bcrypt';
import { getUserDb } from '../model/userDB.js';
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()


const checkUser = async (req, res, next) => {
    try {
      const { emailAdd, userPass } = req.body;
  
      // Fetch user from the database
      const user = await getUserByEmail(emailAdd);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare provided password with hashed password
      const isMatch = await compare(userPass, user.userPass);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate token
      const token = jwt.sign({ userID: user.userID, emailAdd: emailAdd }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      // Attach token to the request body (or directly in the response)
      req.token = token;
  
      // Call next middleware or route handler
      next();
    } catch (error) {
      console.error('Error during authentication:', error.message);
      next(new Error('Failed to authenticate user'));
    }
  }

const verifyAToken = (req,res,next)=>{
    let {cookie} = req.headers
    // checks if token exists first


    let token = cookie && cookie.split('=')[1]
    // console.log(token);
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded) =>{
        if(err){
            res.json({message:'Token has expired'})
            return
        }
        req.body.user = decoded.emailAdd
        console.log(decoded);
        
    })
     next()
}

const checkAdmin = async (req, res, next) => {
    try {
      const { userID } = req.body; // Assume admin's userID is sent in the body or fetched from a token
      
      // Fetch user from the database (assuming you have a function to get user by ID)
      const user = await getUserById(userID); // Adjust function as needed
      
      if (user && user.userRole === 'admin') {
        next(); // User is admin, proceed to the registration route
      } else {
        res.status(403).json({ message: 'Only admins can add new users' });
      }
    } catch (error) {
      console.error('Error checking admin status:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

export {checkUser,verifyAToken,checkAdmin}