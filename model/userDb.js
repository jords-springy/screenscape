import { pool } from "../config/config.js";
const getUsersDb = async () => {
    try {
      const [data] = await pool.query('SELECT * FROM bfgktuen9wud2azxdgho.users');
      return data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      throw new Error('Failed to retrieve users from the database');
    }
  }
  
const getUserDb = async (userID) => {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM bfgktuen9wud2azxdgho.users WHERE userID = ?',
        [userID]
      );
  
      if (rows.length > 0) {
        return rows[0]; // Return the first matching row.
      } else {
        return null; // No matching user found
      }
    } catch (error) {
      throw new Error('Database query failed');
    }
  }
  
  
  

  const insertUserDb = async (firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile) => {
    try {
      await pool.query(
        `INSERT INTO bfgktuen9wud2azxdgho.users
          (firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile]
      );
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw new Error('Failed to insert new user into the database');
    }
  }
  
  const deleteUserDb = async (userID) => {
    try {
      await pool.query('DELETE FROM bfgktuen9wud2azxdgho.users WHERE userID = ?', [userID]);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw new Error('Failed to delete user from the database');
    }
  }
  

  const updateUserDB = async (userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile) => {
    try {
      await pool.query(
        `UPDATE bfgktuen9wud2azxdgho.users
         SET firstName = ?, lastName = ?, userAge = ?, gender = ?, userRole = ?, emailAdd = ?, userPass = ?, userProfile = ?
         WHERE userID = ?`,
        [firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile, userID]
      );
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw new Error('Failed to update user in the database');
    }
  }
  
  const findUserByEmail = async (email) => {
    let [[user]] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return user;
};
// console.log(await insertUser('Matthew','23','purple','gatsby'))
console.log(await getUsersDb());
// console.log(await getUser(1));
export {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDB,findUserByEmail}







