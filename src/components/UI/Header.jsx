// /* eslint-disable react/prop-types */
// import { useContext, useEffect } from 'react'
// import { Header } from 'antd/es/layout/layout'
// import { Button, Dropdown, Image, Modal, Typography } from 'antd'
// import {
//   BiTaskIcon,
//   CiLoginIcon,
//   EmployeeIcon,
//   FaHomeIcon,
//   FaRegUser,
//   FaTaskIcon,
// } from '../../utils/svgIcons'
// import '../../styles/header.css'
// import { CONSTANTS, ThemeData } from '../../utils/util.jsx'
// import { ExclamationCircleFilled } from '@ant-design/icons'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateSelectedNavBtn } from '../../services/redux/actions/themeSlice.jsx'
// import { useNavigate } from 'react-router-dom'
// import CustomTooltip from './customTooltip.jsx'
// import { updateUserType } from '../../services/redux/actions/userSlice.jsx'
// import DamacLogo from '../../assets/DamacLogo.svg'
// const { confirm } = Modal

// const buttonStyle = {
//   marginRight: '15px',
//   backgroundColor: 'rgb(52 69 126)',
//   color: 'white',
//   borderWidth: 2,
//   borderColor: 'rgba(255, 255, 255, 0.4)',
// }

// const renderButton = (onClick, icon, selectedButton, buttonName, tooltipTitle) => (
//   <CustomTooltip title={tooltipTitle}>
//     <Button
//       onClick={onClick}
//       className={`customButton customHeaderButton ${
//         selectedButton === buttonName ? 'customSelectedHeaderButton' : ''
//       }`}
//       shape='circle'
//       icon={icon}
//       style={buttonStyle}
//     />
//   </CustomTooltip>
// )

// const CustomHeaderNavigatedContent = ({ username, logout, userType }) => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const selectedButton = useSelector((state) => state.theme.selectedButton)

//   const navigateToDashboard = () => {
//     if (userType === 'employee') {
//       dispatch(updateUserType('HOD'))
//       navigate('/myTasks')
//     } else if (userType === 'HR' || userType === 'CMO') {
//       navigate('/')
//     }
//     dispatch(updateSelectedNavBtn('home'))
//   }
//   const navigateToMyTasks = () => {
//     navigate('/myTasks')
//     dispatch(updateSelectedNavBtn('myTasks'))
//   }

//   const menuItems = [
//     {
//       disabled: true,
//       className: `customMenuClass `,
//       key: '1',
//       icon: (
//         <Button
//           shape='circle'
//           icon={FaRegUser({ height: '13px', width: '13px' })}
//           size='small'
//           className='headerNavItemButton '
//           style={{ border: '2px solid #2b3a67' }}
//         />
//       ),
//       label: (
//         <Typography style={{ fontSize: 13, fontWeight: 800, color: '#2B3A67' }}>
//           {username}
//         </Typography>
//       ),
//     },
//     {
//       key: 'Logout',
//       icon: (
//         <Button
//           type='text'
//           size='small'
//           className='headerNavItemButton'
//           icon={CiLoginIcon({
//             color: ThemeData.primary,
//             height: '20px',
//             width: '20px',
//           })}
//           onClick={navigateToDashboard}
//         />
//       ),
//       className: 'bottomBorderMenu',

//       label: (
//         <>
//           <Typography style={{ fontSize: 13, fontWeight: 800, color: '#2B3A67' }}>
//             Sign Out
//           </Typography>
//         </>
//       ),
//     },
//   ]

//   const handleLogOut = () => {
//     confirm({
//       title: `Are you sure you want to sign out?`,
//       icon: <ExclamationCircleFilled />,
//       okText: 'Yes',
//       cancelText: 'No',
//       onOk() {
//         localStorage.removeItem(CONSTANTS.localStorageRequests)
//         logout()
//       },
//       onCancel() {},
//     })
//   }
//   const menuProps = {
//     items: menuItems,
//     onClick: handleLogOut,
//   }

//   const isEmployeeOrHOD = userType === 'employee' || userType === 'HOD'
//   const employeeButton = renderButton(
//     () => {
//       navigate('/employee')
//       if (userType === 'HOD') {
//         dispatch(updateUserType('employee'))
//       }
//       dispatch(updateSelectedNavBtn('employee'))
//     },
//     EmployeeIcon({ height: '17px', width: '17px', color: '#fff' }),
//     window.location.pathname?.toLowerCase()?.includes('employee') ? 'employee' : selectedButton,
//     'employee',
//     'Employee Dashboard',
//   )

//   const dashboardButton = renderButton(
//     navigateToDashboard,
//     isEmployeeOrHOD
//       ? FaTaskIcon({ height: '15px', width: '15px' })
//       : FaHomeIcon({ height: '15px', width: '15px' }),
//     window.location.pathname?.toLowerCase()?.includes('mytasks')
//       ? userType === 'HR' || userType === 'CMO'
//         ? 'home'
//         : 'myTasks'
//       : window.location.pathname?.toLowerCase()?.includes('employee')
//         ? 'employee'
//         : selectedButton,
//     window.location.pathname?.toLowerCase()?.includes('mytasks') &&
//       (userType === 'HR' || userType === 'CMO')
//       ? 'myTasks'
//       : 'home',
//     isEmployeeOrHOD ? 'Approval Dashboard' : 'Home',
//   )
//   const myTasksButton = renderButton(
//     navigateToMyTasks,
//     BiTaskIcon({ height: '15px', width: '15px' }),
//     window.location.pathname?.toLowerCase()?.includes('mytasks') ? 'myTasks' : selectedButton,
//     'myTasks',
//     'Approval Dashboard',
//   )

//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       {isEmployeeOrHOD ? (
//         <>
//           {employeeButton}
//           {myTasksButton}
//         </>
//       ) : (
//         <>
//           {dashboardButton}
//           {employeeButton}
//         </>
//       )}
//       {userType === 'HR' || userType === 'CMO' ? myTasksButton : ''}

//       <Dropdown trigger={['click']} menu={menuProps} placement='bottomLeft' arrow>
//         <Button
//           className='customButton customHeaderButton'
//           shape='circle'
//           icon={FaRegUser()}
//           style={{
//             marginRight: '15px',
//             backgroundColor: 'rgb(52 69 126)',
//             color: 'white',
//             borderWidth: 2,
//             borderColor: 'rgba(255, 255, 255, 0.4)',
//           }}
//         />
//       </Dropdown>
//     </div>
//   )
// }
// const CustomHeader = ({ headerWithContent }) => {
//   const dispatch = useDispatch()

//   const { logout, username } = useContext(KeycloackContext)
//   const user = useSelector((state) => state.user)

//   const navigateToDashboard = () => {
//     dispatch(updateSelectedNavBtn('home'))
//     window.location.replace('/lead')
//   }
//   useEffect(() => {
//     const isRedirectedFromMyTasks = localStorage.getItem(
//       CONSTANTS.localStorageRedirectedFromMyTasks,
//     )
//       ? localStorage.getItem(CONSTANTS.localStorageRedirectedFromMyTasks) === 'true'
//         ? true
//         : false
//       : false
//     if (window.location.pathname?.includes('/tasks') && isRedirectedFromMyTasks) {
//       dispatch(updateSelectedNavBtn('myTasks'))
//     }
//     if (window.location.pathname?.includes('myTasks')) {
//       dispatch(updateSelectedNavBtn('myTasks'))
//     }
//   }, [dispatch])

//   return (
//     <div className='headerDiv'>
//       <Header>
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             width: '100%',
//             lineHeight: 0,
//           }}
//         >
//           <div className='icon' style={{ cursor: 'pointer' }} onClick={navigateToDashboard}>
//             <Image
//               onClick={() => window.location.replace(`${import.meta.env.REACT_APP_BASE_URL}/hr`)}
//               src={DamacLogo}
//               size={'mini'}
//               preview={false}
//               style={{ fontSize: 10, width: 38, marginRight: '2rem' }}
//             />
//           </div>

//           <div className='divcontent'>
//             <Typography
//               onClick={navigateToDashboard}
//               className='title'
//               style={{
//                 fontSize: 20,
//                 fontWeight: 500,
//                 letterSpacing: 3,
//                 color: 'white',
//                 margin: 0,
//                 cursor: 'pointer',
//               }}
//             >{`Resignation`}</Typography>
//             {headerWithContent && (
//               <CustomHeaderNavigatedContent
//                 username={username}
//                 logout={logout}
//                 userType={user?.userType}
//               ></CustomHeaderNavigatedContent>
//             )}
//           </div>
//         </div>
//       </Header>
//     </div>
//   )
// }

// export default CustomHeader

const CustomHeader=()=>{
  return(
    <></>
  )
}
export default CustomHeader;