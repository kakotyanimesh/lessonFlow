import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:3004/api/v1'

const axiosInstancess = axios.create({
    baseURL:'https://lessonflow.onrender.com/api/v1/user'
    // baseURL:'http://localhost:3004/api/v1/user'
})
const createUser =async ({email, username, password}) => {
    try {
        const response = await axiosInstancess.post('/signup', {
            email,
            username,
            password
        })
    
        // console.log(response.data);
        
        return response.data
    } catch (error) {
       console.log(`error while creating the user : ${error}`);
        
    }
}

const logInUser =async ({email, password}) => {
    const response =await axiosInstancess.post('/signin', {
        email,
        password
    })

    // console.log(response.data);
    
    return response.data
}

const LogOutUser =async () => {
    try {
        await axios.get('/api/logOut', {withCredentials : true})
    } catch (error) {
        console.log('logOut failed');
        
    }
}

export {
    createUser,
    logInUser,
    LogOutUser
}