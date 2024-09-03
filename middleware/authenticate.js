import {compare} from 'bcrypt';
import { getUserDb } from '../model/userDB.js';
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validate token
      req.user = decoded; // Attach decoded user data (e.g., id, role) to request object
      next(); // Proceed to the next middleware or route handler
  } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

const verifyAToken = (roles = []) => {
  return async (req, res, next) => {
      try {
          // Get token from Authorization header
          const authHeader = req.headers.authorization;
          if (!authHeader) {
              return res.status(401).json({ message: 'No token provided' });
          }

          // Extract token from the header
          const token = authHeader.split(' ')[1]; // 'Bearer <token>'
          if (!token) {
              return res.status(401).json({ message: 'No token provided' });
          }

          // Verify token
          const decoded = await jwt.verify(token, process.env.SECRET_KEY);

          // Attach decoded token to request object
          req.user = decoded;

          // Check if user role is authorized
          if (roles.length && !roles.includes(decoded.userRole)) {
              return res.status(403).json({ message: 'Access denied' });
          }

          // Proceed to next middleware or route handler
          next();
      } catch (err) {
          // Handle verification errors
          res.status(403).json({ message: 'Token is invalid or has expired' });
      }
  };
};
const generateToken = (user) => {
  const payload = {
      emailAdd: user.email,
      userRole: user.userRole // Add userRole to the payload
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const adminMiddleware = (req, res, next) => {
  const { role } = req.user;

  if (role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
  }

  next(); // Proceed to the next middleware or route handler
};

export {authMiddleware,verifyAToken,adminMiddleware,generateToken}