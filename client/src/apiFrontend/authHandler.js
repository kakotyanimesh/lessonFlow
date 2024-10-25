import axios from 'axios';
import axiosInstance from './axiosInstance'

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

export  {
    createUser,
    logInUser
}