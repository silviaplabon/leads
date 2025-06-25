import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routers from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../src/styles/antStyle.css'
import '../src/styles/antInputStyle.css'
import '../src/styles/customInputStyle.css'
import '../src/styles/customAntPicker.css'

import { Slide } from 'react-toastify'
import DamacLoader from './components/UI/AnimatedLogoLoader.jsx'


import '@ant-design/v5-patch-for-react-19'
import { Layout } from 'antd'

import './App.css'
import '../src/styles/customModal.css'
import CustomTopNavbar from './components/UI/customTopNavbar.jsx'

function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!window.location.pathname.includes('/lead'))
      window.location.replace('/lead')
  }, [])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return loading ? (
    <Layout
      style={{
        height: '100vh',
        width: '100%',
        marginRight: '5px',
        backgroundColor: '#fff',
      }}
    >
      <CustomTopNavbar></CustomTopNavbar>
      <DamacLoader width={150} height={150} active={loading} />
    </Layout>
  ) : (
    <div className='flex flex-row container-style'>
      <BrowserRouter basename='/lead'>
        <ToastContainer
          transition={Slide}
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <Routers />
      </BrowserRouter>
    </div>
  )
}

export default App
