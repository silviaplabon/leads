/* eslint-disable react-hooks/exhaustive-deps */
import '@ant-design/v5-patch-for-react-19'
import { useContext, useEffect, useState, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from 'antd'

import { useDispatch } from 'react-redux'
import DamacLoader from './components/UI/AnimatedLogoLoader.jsx'
import AntResult from './components/UI/AntResult.jsx'
import CustomSidebar from './components/UI/customSidebar.jsx'
import LeadCards from './pages/leadsCard.jsx'

const Home = lazy(() => import('./pages/home.jsx'))

const LoaderFallback = () => <DamacLoader width={150} height={150} active={true} />

const Routers = () => {
  const [loader, setLoader] = useState(false)

  return (
    <>
      <Layout
        style={{
          height: '100vh',
          width: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ display: 'flex', maxWidth: '270px', minWidth: '260px' }}>
          <CustomSidebar></CustomSidebar>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {/* <CustomHeader headerWithContent={!isEmpDetailsLoading ? true : false} /> */}

          {!loader ? (
            <>
              <Suspense fallback={<LoaderFallback />}>
                <div
                  className='bodyContainer'
                  style={{
                    height: '90vh',
                    width: '100%',
                    marginTop: '20px',
                    backgroundColor: '#fff',
                    overflow: 'auto',
                  }}
                >
                  <Routes>
                    <Route exact path='/' element={<Home />} />
                     <Route exact path='/leads' element={<LeadCards />} />
                  </Routes>
                </div>
              </Suspense>
            </>
          ) : loader ? (
            <Routes>
              <Route
                path=''
                element={
                  !loader && (
                    <AntResult
                      typeOfResult='unauthorized'
                      onClick={() => window.location.reload()}
                      redirectTitle='Retry'
                    ></AntResult>
                  )
                }
              />
            </Routes>
          ) : (
            <div style={{ height: '90vh', backgroundColor: '#fff' }}>
              <DamacLoader width={150} height={150} active={true} />
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Routers
