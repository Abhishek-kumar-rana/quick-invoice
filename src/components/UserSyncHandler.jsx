import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

const UserSyncHandler = () => {
    const [synced, setSynced] = useState(false);
    const {isLoaded, isSignedIn, getToken} = useAuth();
  const { user } = useUser();
  const {baseURL} = useContext(AppContext);
  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || synced) {  
        return;
        }
        try{
            const token = await getToken();
            const userData = {
                clerkId: user.id,
                email: user.primaryEmailAddress.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                photoUrl: user.imageUrl,
        }
        console.log("Saving user data to backend:", userData);
         await
        axios.post(`${baseURL}/users`, userData,  {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setSynced(true);
        }catch(err){
            toast.error(err.message);
        }
    };
  
    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced]);

  return null; // This component doesn't render anything
}


export default UserSyncHandler;