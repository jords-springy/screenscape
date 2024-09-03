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
      let {  firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile } = req.body;
  
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
  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ email: user.email, userRole: user.userRole }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
  
  const registerUser = async (req, res) => {
    const { emailAdd, userPass, userRole } = req.body;

    try {
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(userPass, 10);

        // Check if userRole is admin
        if (userRole === 'admin') {
            // Only admin role can be added to the database
            await addUser(emailAdd, hashedPassword, userRole);
        } else {
            // Regular user registration (not adding to the admin role in the database)
            await addUser(emailAdd, hashedPassword, 'user');
        }

        // Generate a JWT token
        const token = jwt.sign({ emailAdd, userRole: userRole || 'user' }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
  
export {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser,registerUser}