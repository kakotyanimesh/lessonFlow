import {atom} from 'recoil'

export const userCreateState = atom({
    key: 'userState',
    default : {
        email : '',
        username : '',
        password : ''
    }
})

export const userLoginState = atom({
    key : 'logInstate',
    default : {
        email : '',
        password : ''
    }
})


export const authMessageState = atom({
    key: 'authMessageState',
    default : 'Invalid Credentials, try again!'
})