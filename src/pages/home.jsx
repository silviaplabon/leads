import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from './dashboard.jsx'

const Home = () => {
  const userType = useSelector((state) => state.user.userType)

  const dispatch = useDispatch()


  return (
    <>
  <Dashboard></Dashboard>
    </>
  )
}

export default Home
