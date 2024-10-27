import axios from 'axios';
import axiosInstance from './axiosInstance'
import { Navigate } from 'react-router-dom';

const createUser = async ({email, password, username} ) => {
    try {

        const response = await axiosInstance.post('/user/signup', {
            email,
            password,
            username
        }) 

        console.log('user created successfully');
        
        return response.data
    } catch (error) {
        console.log('error while creating user', error);
        // return res.json(`${error.message}`)
    }
}


const logInUser = async({email, password}) => {
    try {
        const response = await axiosInstance.post('/user/signin', {
            email,
            password
        })

        console.log('user logged in ');
        
        return response.data
    } catch (error) {
        console.log(`error while sign in process : ${error.message}`);
        
    }

}

const LogOutUser = async () => {
    try {
        await axios.get('/user/api/logOut', {withCredentials : true})
    } catch (error) {
        console.log('logOut failed');
        
    }
}

export  {
    createUser,
    logInUser,
    LogOutUser
}