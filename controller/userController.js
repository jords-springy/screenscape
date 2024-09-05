import {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDB,findUserByEmail} from '../model/userDb.js'
import {hash} from 'bcrypt'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const getUsers = async (req, res, next) => {
  try {
    const users = await getUsersDb();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
  }
}


const getUser = async (req, res, next) => {
  try {
    const user = await getUserDb(req.params.userID);
    if (user) {
      res.status(200).json(user); 
    } else {
      res.status(404).json({ message: 'User not found' }); 
    }
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
  }
}


const insertUser = async (req, res, next) => {
  try {
    const { firstName, lastName, userAge, gender, userRole, emailAdd, userProfile, userPass } = req.body;
    const hashedP = await bcrypt.hash(userPass, 10);
    await insertUserDb(firstName, lastName, userAge, gender, userRole, emailAdd, hashedP, userProfile);
    res.status(201).json({ message: 'User was inserted successfully' }); 
  } catch (error) {
    console.error('Error inserting user:', error.message);
    res.status(500).json({ message: 'Failed to insert user', error: error.message });
  }
}


const deleteUser = async (req, res, next) => {
  try {
    await deleteUserDb(req.params.userID);
    res.status(200).json({ message: 'User has been deleted' }); 
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
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
    userPass = userPass ? await bcrypt.hash(userPass, 10) : user.userPass; 
    userProfile = userProfile || user.userProfile;
    await updateUserDB(req.params.userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile);
    res.status(200).json({ message: 'Update User was successful' }); 
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
}


const loginUser = async (req, res) => {
  const { emailAdd, password } = req.body;
  try {
    const normalizedEmail = emailAdd.toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); 
    }

    const isMatch = await bcrypt.compare(password, user.userPass);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }

    const token = jwt.sign(
      { emailAdd: user.emailAdd, userRole: user.userRole },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.status(200).json({ message: 'Login successful' }); 
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


const registerUser = async (req, res) => {
  const { firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(userPass, 10);
    const role = userRole === 'admin' ? 'admin' : 'user';
    await insertUserDb(firstName, lastName, userAge, gender, role, emailAdd, hashedPassword, userProfile);

    const token = jwt.sign({ emailAdd, userRole: role }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token }); 
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

export {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser,registerUser}