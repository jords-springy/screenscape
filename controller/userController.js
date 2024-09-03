import {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDB,findUserByEmail} from '../model/userDB.js'
import {hash} from 'bcrypt'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const getUsers = async (req, res, next) => {
  try {
      const users = await getUsersDb();
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error.message);
      next(new Error('Failed to retrieve users'));
  }
}

const getUser = async (req, res, next) => {
  try {
      const user = await getUserDb(req.params.userID);
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      next(error);
  }
}

const insertUser = async (req, res, next) => {
  try {
      const { firstName, lastName, userAge, gender, userRole, emailAdd, userProfile, userPass } = req.body;
      const hashedP = await bcrypt.hash(userPass, 10);
      await insertUserDb(firstName, lastName, userAge, gender, userRole, emailAdd, hashedP, userProfile);
      res.status(201).send('User was inserted successfully');
  } catch (error) {
      console.error('Error inserting user:', error.message);
      next(new Error('Failed to insert user'));
  }
}

const deleteUser = async (req, res, next) => {
  try {
      await deleteUserDb(req.params.userID);
      res.status(200).send('User has been deleted');
  } catch (error) {
      console.error('Error deleting user:', error.message);
      next(new Error('Failed to delete user'));
  }
}

const updateUser = async (req, res, next) => {
  try {
      let { firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile } = req.body;
      const user = await getUserDb(req.params.userID);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      firstName = firstName || user.firstName;
      lastName = lastName || user.lastName;
      userAge = userAge || user.userAge;
      gender = gender || user.gender;
      userRole = userRole || user.userRole;
      emailAdd = emailAdd || user.emailAdd;
      userPass = userPass ? await bcrypt.hash(userPass, 10) : user.userPass; // Hash only if new password is provided
      userProfile = userProfile || user.userProfile;
      await updateUserDB(req.params.userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile);
      res.status(200).send('Update User was successful');
  } catch (error) {
      console.error('Error updating user:', error.message);
      next(new Error('Failed to update user'));
  }
}
const loginUser = async (req, res) => {
    const { emailAdd, password } = req.body;
  
    try {
      // Normalize email to lowercase to avoid case sensitivity issues
      const normalizedEmail = emailAdd.toLowerCase();
  
      // Log the received email and password for debugging
      console.log('Login Request:', normalizedEmail, password);
  
      // Find user by email
      const user = await findUserByEmail(normalizedEmail);
      
      // Log the result from the database
      console.log('User from DB:', user);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if both password and hashed password exist
      if (!password || !user.userPass) {
        return res.status(400).json({ message: 'Password or hashed password missing' });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.userPass);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { emailAdd: user.emailAdd, userRole: user.userRole },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login Error:', error); // Log the error for debugging purposes
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };
  
  
  
const registerUser = async (req, res) => {
    const { firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile } = req.body;

    try {
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(userPass, 10);

        // Set the role to 'user' by default
        const role = userRole === 'admin' ? 'admin' : 'user';

        // Insert the user into the database
        await insertUserDb(firstName, lastName, userAge, gender, role, emailAdd, hashedPassword, userProfile);

        // Generate a JWT token
        const token = jwt.sign({ emailAdd, userRole: role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error.message); // Log the error message for debugging
        res.status(500).json({ message: 'Error registering user', error: error.message }); // Return a detailed error message
    }
};


  
export {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser,registerUser}