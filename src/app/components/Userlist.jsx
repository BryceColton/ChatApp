// UserList.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

const UserList = ({ user, onSelectRecipient }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    

    getUsers();
  }, []);

  return (
    <div className='user-list w-full'>
      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li className='flex justify-center items-center hover:bg-violet-100 cursor-pointer' key={u.id} onClick={() => onSelectRecipient(u)}>
          
            <img
              src={u.photo}
              alt="Profile"
              className='h-8 w-8 rounded-xl bg-center bg-cover'
            />
           
            {u.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
