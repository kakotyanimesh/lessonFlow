import React from 'react'
import { useRecoilValue } from 'recoil'
import { userLoginState } from '../recoil/createUser.recoil'

const Dashboard = () => {
  const user = useRecoilValue(userLoginState)
  return (
    <div>
      <h1>welcome {user.email}</h1>
    </div>
  )
}

export default Dashboard
