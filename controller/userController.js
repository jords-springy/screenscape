import {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDB} from '../model/userDB.js'
import {hash} from 'bcrypt'
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
        res.json(user); // Return the user data as JSON
      } else {
        res.status(404).json({ message: 'User not found' }); // Handle case where no user is found
      }
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  }
  
  
  const insertUser = async (req, res, next) => {
    try {
      const { firstName, lastName, userAge, gender, userRole, emailAdd, userProfile, userPass } = req.body;
  
      const hashedP = await hash(userPass, 10);
      console.log(hashedP);
  
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
      let { userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile } = req.body;
  
      const user = await getUserDb(req.params.userID);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update fields only if new values are provided, otherwise keep existing values
      firstName = firstName || user.firstName;
      lastName = lastName || user.lastName;
      userAge = userAge || user.userAge;
      gender = gender || user.gender;
      userRole = userRole || user.userRole;
      emailAdd = emailAdd || user.emailAdd;
      userPass = userPass || user.userPass; // Ensure hashing for new passwords
      userProfile = userProfile || user.userProfile;
  
      await updateUserDb(req.params.userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile);
      res.status(200).send('Update User was successful');
    } catch (error) {
      console.error('Error updating user:', error.message);
      next(new Error('Failed to update user'));
    }
  }
  const loginUser = async (req, res, next) => {
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
      const token = jwt.sign({ userID: user.userID }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      // Respond with token
      res.json({ message: 'You have signed in!', token });
    } catch (error) {
      console.error('Error during login:', error.message);
      next(new Error('Failed to login'));
    }
  }
  
  const registerUser = async (req, res, next) => {
    try {
      const { firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile } = req.body;
  
      // Encrypt password
      const hashedPassword = await hash(userPass, 10);
  
      // Insert user into database
      await insertUserDb(firstName, lastName, userAge, gender, userRole, emailAdd, hashedPassword, userProfile);
  
      // Generate JWT token
      const token = jwt.sign({ emailAdd, role: userRole }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      // Respond with token
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Error during registration:', error.message);
      next(new Error('Failed to register user'));
    }
  };
  
export {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser,registerUser}