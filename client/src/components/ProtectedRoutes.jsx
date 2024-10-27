import React from 'react'
import { protectedRoutesState  } from '../recoil/createUser.recoil'
import { useRecoilValue } from 'recoil'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const userAuthenticated = useRecoilValue(protectedRoutesState)

    if(!userAuthenticated){
        return <Navigate to='/auth/signin'/>
    }

    return <Outlet/>
}

export default ProtectedRoutes