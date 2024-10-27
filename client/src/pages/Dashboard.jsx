import React , {useEffect}from 'react'
import { useRecoilState } from 'recoil'
import { usernameState } from '../recoil/createUser.recoil'
import Button from '../components/Button'

const Dashboard = () => {
  const [username, setUsername] = useRecoilState(usernameState)
  useEffect(() => {
    const user = localStorage.getItem('username')
    setUsername(user)
    
  }, [])
  
  return (
    <div className='flex flex-col items-center mt-24 '>
      <div className='flex sm:gap-20 gap-2 items-center'>
        <h1 className='sm:text-2xl text'>Welcome {username}</h1>
        <Button prop='Create A new Plan' />
      </div>
      <div className='grid grid-cols space-y-7 text-center mt-10'>
        <h1 className='sm:text-3xl '>Your Created Lesson Plans</h1>
        <div className=''>
          <ul className='space-y-4' >
            <li className='flex flex-cols items-center sm:gap-36 gap-4'><h1>lessson plan name</h1> <Button prop='Download'/></li>
            <li className='flex flex-cols items-center sm:gap-36 gap-4'><h1>lessson plan name</h1> <Button prop='Download'/></li>
            <li className='flex flex-cols items-center sm:gap-36 gap-4'><h1>lessson plan name</h1> <Button prop='Download'/></li>
            <li className='flex flex-cols items-center sm:gap-36 gap-4'><h1>lessson plan name</h1> <Button prop='Download'/></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
