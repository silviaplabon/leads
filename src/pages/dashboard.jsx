/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState, useTransition } from 'react'
import {
  CONSTANTS,
  DefaultPageLimit,
  FakeLeadsData,
  generateSortTextAndCustomQuery,
  GetRequestsOrTasksLovData,
  RequestsAndTasksAdditionalQueries,
  requestsIgnoreColumns,
  taskIgnoreColumns,
} from '../utils/util.jsx'
import { CommonAPI } from '../services/common.jsx'
import TableCellValue from '../components/UI/Table/tableCellValue.jsx'
// import MuiButton from '../components/UI/CustomButton.jsx'
import { useNavigate } from 'react-router-dom'
// import { ExcelIcon, LogsIcon } from '../utils/svgIcons.jsx'
import { useSelector } from 'react-redux'
// import RequestsDetails from '../components/tasks/requestsDetail.jsx'
// import CustomTooltip from '../components/UI/customTooltip.jsx'
// import Logs from '../components/logs'
// import ResetFilter from '../components/UI/resetFilter.jsx'
import '../styles/home.css'
import CustomTable from '../components/UI/Table/customTable.jsx'
import HeaderColumn from '../components/UI/Table/headerColumn.jsx'
// import CustomButton from '../components/UI/CustomButton.jsx'
// import AddResignationRequest from '../components/addResignationRequest.jsx'
import useDeviceWidth from '../hooks/useDeviceWidth.jsx'
import Checkbox from 'antd/es/checkbox/Checkbox.js'
import CustomButton from '../components/UI/CustomButton.jsx'
import CustomTypography from '../components/UI/customTypography.jsx'
import { DashboardSvgIcon, ListSvgIcon } from '../utils/svgIcons.jsx'
import CustomAutoComplete from '../components/UI/Input/customAutoComplete.jsx'
import { fakeLeadsData } from '../utils/fakeData.jsx'

const Dashboard = ({ isMyTasks }) => {
  const [pageLoader, setpageLoader] = useState(false)
  const [pageDetails, setPageDetails] = useState()
  const [pageData, setpageData] = useState([])
  const breadcrumbRef = useRef(null)
  const [mode, setMode] = useState('Tasks')
  const [sortObj, setSortObj] = useState({})
  const [filterObj, setFilterObj] = useState({})
  const [filterDetails, setFilterDetails] = useState()
  const [isFilterItemsVisible, setIsFIlterItemsVisible] = useState(false)
  const userType = useSelector((state) => state.user.userType)

  const employeeDetails = useSelector((state) => state.user)
  const navigate = useNavigate()
  const screenWidth = useDeviceWidth()
  const activeGroup = ''
  const handleFilter = (typeOfFilter, name, value, isEntered) => {
    setFilterObj((prev) => ({ ...prev, [name]: value }))
    if (isEntered) {
      setPageDetails((prev) => ({ ...prev, pageNumber: 1 }))
      handleGetRequestsAndTasksData(
        mode,
        name,
        value,
        pageDetails?.pageLimit || DefaultPageLimit,
        0,
      )
      setFilterDetails((prev) => ({ ...prev, isFilterExist: true }))
    }
  }
  const handleGetLeadsData = async (
    tab,
    type,
    txt,
    limit,
    pageNum,
    sortType,
    responseType,
    ignoreSort,
  ) => {
    setPageDetails((prev) => ({
      ...prev,
      totallineCount: fakeLeadsData?.length || 0,
      noOfPages: fakeLeadsData?.length / (limit ? limit : DefaultPageLimit),
      pageLimit: limit ? limit : DefaultPageLimit,
    }))
    setpageData(fakeLeadsData)
    // const additionalSearchTemp = {}

    // const { additionalQueries, isGroupFilterApplied } = RequestsAndTasksAdditionalQueries(
    //   tab,
    //   userType,
    //   username,
    //   activeGroup,
    //   employeeDetails,
    //   isMyTasks,
    //   type,
    //   txt,
    // )
    // const { data, sortTemp, queryCount } = generateSortTextAndCustomQuery(
    //   isMyTasks ? CONSTANTS.localStorageMyTasks : CONSTANTS.localStorageRequests,
    //   type,
    //   txt,
    //   additionalQueries,
    //   sortType,
    //   ignoreSort ? {} : sortObj,
    //   additionalSearchTemp,
    //   !sortObj || !Object.keys(sortObj)?.lengths > 0
    //     ? tab === 'Tasks'
    //       ? 'updatedOn~D'
    //       : tab === 'Requests'
    //         ? 'updatedOn~D'
    //         : ''
    //     : '',
    //   ['requestId', 'taskId', 'requestStatus', 'taskStatus', 'personNumber', 'taskName'],
    //   [
    //     'lastWorkDate',
    //     'hodSpLastDate',
    //     'eoSpLastDate',
    //     'conLastDate',
    //     'updatedOn',
    //     'assignedOn',
    //     'dueBy',
    //     'hireDate',
    //     'performedOn',
    //   ],
    //   tab === 'Requests' ? taskIgnoreColumns : requestsIgnoreColumns,
    //   limit,
    //   pageNum,
    // )
    // if (!responseType || responseType !== 'blob') {
    //   setFilterDetails((prev) => ({
    //     ...prev,
    //     filterCount: queryCount + (isGroupFilterApplied ? 1 : 0),
    //     isFilterExist: true,
    //   }))
    //   setSortObj(sortTemp)
    // }

    // setpageLoader(true)
    // const token = await getToken().then((newToken) => newToken)

    // const resData = await CommonAPI.getPageData(
    //   token,
    //   responseType === 'blob'
    //     ? 'epm/hr/rg/requests/q?exportExcel=true'
    //     : tab === 'Requests'
    //       ? 'epm/hr/rg/requests/q'
    //       : 'epm/hr/rg/requests/q?isTasks=true',
    //   'POST',
    //   data,
    //   '',
    //   responseType || '',
    // )

    // setpageLoader(false)
    // if (!responseType || responseType !== 'blob') {
    //   setPageDetails((prev) => ({
    //     ...prev,
    //     totallineCount: resData.totalResults || 0,
    //     noOfPages: resData.noOfPages || 0,
    //     pageLimit: limit ? limit : DefaultPageLimit,
    //   }))

    //   setpageData(resData?.data || [])
    //   if (resData?.data?.length < 1) {
    //     setPageDetails((prev) => ({ ...prev, pageNumber: 1 }))
    //   }
    // } else {
    //   return resData
    // }
  }
  const [allStatus, setAllStatus] = useState('')
  const [allSources, setAllSources] = useState('')

  const inputFieldCommonParams = {
    isRequired: false,
    isModalField: false,
    isWithController: false,
    isEditable: false,
  }
  const GridSize = {
    childrenGridSize: 24,
    inputGridSize: 24,
    titleGridSize: 24,
  }

  const changePageFn = (num, limit) => {
    const updatedPageNo = limit !== pageDetails?.pageLimit ? 1 : num
    setPageDetails((prev) => ({
      ...prev,
      pageNumber: updatedPageNo,
      pageLimit: limit,
    }))
    handleGetRequestsAndTasksData(mode, '', '', limit, updatedPageNo - 1)
  }
  const handleSorting = (sortType) => {
    setPageDetails((prev) => ({
      ...prev,
      pageNumber: 1,
      pageLimit: pageDetails?.pageLimit || DefaultPageLimit,
    }))
    handleGetRequestsAndTasksData(
      mode,
      '',
      '',
      pageDetails?.pageLimit || DefaultPageLimit,
      0,
      sortType,
    )
  }
  const getHeaderColumn = (
    title,
    name,
    typeOfFilter,
    handleSorting,
    sortObj,
    updatedActiveGroup,
    userUpdatedType,
    updatedIsMyTasks,
  ) => (
    <HeaderColumn
      title={title}
      name={name}
      key={`${name}-${title}`}
      filterObj={filterObj}
      getLovData={GetRequestsOrTasksLovData}
      handleFilter={handleFilter}
      typeOfFilter={typeOfFilter}
      isFilterItemsVisible={isFilterItemsVisible}
      setIsFIlterItemsVisible={setIsFIlterItemsVisible}
      handleSorting={handleSorting}
      sortObj={sortObj}
      activeGroup={updatedActiveGroup}
      userType={userUpdatedType}
      hideFilterIcon={!typeOfFilter}
      isMyTasks={updatedIsMyTasks}
    />
  )

  const renderTableCell = (
    index,
    value,
    formatType,
    // eslint-disable-next-line no-unused-vars
    showTitleEllipsis = false,
    cellStyle,
    isLink,
    isNavigateLink,
  ) => {
    return (
      <TableCellValue
        index={index}
        key={index}
        value={value}
        style={cellStyle}
        formatType={formatType}
        showTitleEllipsis={true}
        isLink={isLink}
        isNavigateLink={isNavigateLink}
      ></TableCellValue>
    )
  }
  const leadDashboardColumns = [
    {
      title: () => '',
      width: 30,
      render: (item, index) => (
        <>
          {' '}
          <Checkbox checked={false} disabled={false}></Checkbox>
        </>
      ),
    },
    {
      title: () =>
        getHeaderColumn('Name', 'name', 'Text', '', '', activeGroup, userType, isMyTasks),
      width: 120,
      render: (item, index) => renderTableCell(index, item?.name, ''),
    },
    {
      title: () =>
        getHeaderColumn('Status', 'status', 'Text', handleSorting, sortObj, activeGroup, userType),
      width: 130,
      render: (item, index) => renderTableCell(index, item?.status, ''),
    },
    {
      title: () => getHeaderColumn('Lead Owner', 'leadOwner', 'Text', handleSorting, sortObj),
      width: 110,
      render: (item, index) => renderTableCell(index, item?.leadOwner, '', true, '', true),
    },

    {
      title: () => getHeaderColumn('Mobile', 'mobile', ''),
      width: 80,
      hidden: false,
      render: (item, index) => renderTableCell(index, item?.mobile, ''),
    },
    {
      title: () => getHeaderColumn('Email', 'email', ''),
      width: 90,
      hidden: false,
      render: (item, index) => renderTableCell(index, item?.email, ''),
    },

    {
      title: () => getHeaderColumn('Recent Activity', 'recentActivity', 'Text'),
      width: 100,
      hidden: false,
      render: (item, index) => renderTableCell(index, item?.recentActivity, ''),
    },
    {
      title: () => getHeaderColumn('Created On', 'createdOn', ''),
      width: 110,
      hidden: false,
      render: (item, index) => renderTableCell(index, item?.createdOn, '', true),
    },
  ]

  useEffect(() => {
    handleGetLeadsData()
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.2rem 0.34rem',
          marginBottom: '0.5rem',
        }}
      >
        {' '}
        <CustomTypography fontSize='20' fontWeight={'bold'} textVal={'Leads'}></CustomTypography>
        <div style={{ display: 'flex' }}>
          <CustomButton
            title={'Add Lead'}
            showLoader={pageLoader}
            style={{
              backgroundColor: '#fffff',
              color: '#000',
              marginRight: '1rem',
              boxShadow: '0 -1px 5px #ffffffb2,0 1px 5px rgba(94,104,121,.945)',
            }}
            handleButtonClick={() => {
              // downloadReport()
            }}
          ></CustomButton>
          <CustomButton
            title={'Import'}
            showLoader={pageLoader}
            style={{
              backgroundColor: '#fffff',
              color: '#000',
              marginLeft: '',
              boxShadow: '0 -1px 5px #ffffffb2,0 1px 5px rgba(94,104,121,.945)',
            }}
            handleButtonClick={() => {
              // downloadReport()
            }}
          ></CustomButton>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>Show As</span>{' '}
            <span style={{ marginRight: '0.5rem' }}>Board </span> {DashboardSvgIcon()}{' '}
            <span style={{ margin: '0 0.5rem' }}>|</span>{' '}
            <span style={{ marginRight: '0.5rem' }}>List </span>
            {ListSvgIcon()}
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ maxWidth: '140px',minWidth:"120px", margin: '0 0.5rem' }}>
              <CustomAutoComplete
                height={32}
                getLovData={async (searchText) => {}}
                handleOnSearch={() => {
                  // setSelectedEmployeeDetails()
                }}
                handleSelection={(val1, val2) => {
                  // setSelectedEmployeeDetails(val2?.data)
                  // clearErrors('selectedEmployeeName')
                }}
                value='All Status'
                codeKey='status'
                name={'status'}
                isWithController={false}
                errorText={``}
                setValue={setAllStatus}
                gridSize={{ ...GridSize, inputGridSize: 24 }}
                {...inputFieldCommonParams}
              ></CustomAutoComplete>
            </div>
            <div style={{ maxWidth: '140px', minWidth:"120px", margin: '0 0.5rem' }}>
              <CustomAutoComplete
                height={32}
                getLovData={async (searchText) => {}}
                handleOnSearch={() => {
                  // setSelectedEmployeeDetails()
                }}
                handleSelection={(val1, val2) => {
                  // setSelectedEmployeeDetails(val2?.data)
                  // clearErrors('selectedEmployeeName')
                }}
                value='All Sources'
                codeKey='sources'
                name={'sources'}
                isWithController={false}
                errorText={``}
                setValue={setAllStatus}
                gridSize={{ ...GridSize, inputGridSize: 24 }}
                {...inputFieldCommonParams}
              ></CustomAutoComplete>
            </div>
          </div>
        </div>
        <div style={{display:'flex'}}>
           <div style={{ maxWidth: '200px', minWidth:'150px',margin: '0 0.5rem' }}>
              <CustomAutoComplete
                height={32}
                getLovData={async (searchText) => {}}
                handleOnSearch={() => {
                  // setSelectedEmployeeDetails()
                }}
                handleSelection={(val1, val2) => {
                  // setSelectedEmployeeDetails(val2?.data)
                  // clearErrors('selectedEmployeeName')
                }}
                value='Recently Updated'
                codeKey='sources'
                name={'sources'}
                isWithController={false}
                errorText={``}
                setValue={setAllStatus}
                gridSize={{ ...GridSize, inputGridSize: 24 }}
                {...inputFieldCommonParams}
              ></CustomAutoComplete>
            </div>

        </div>
      </div>
      <div >

      <CustomTable
        pageNumber={pageDetails?.pageNumber}
        changePageFn={changePageFn}
        noOfPages={pageDetails?.noOfPages}
        pageLimit={pageDetails?.pageLimit}
        tableWidth={'700px'}
        dataSource={pageData}
        ref={breadcrumbRef}
        tableIndex={`ReqTasksTable${mode}`}
        pageLoader={pageLoader}
        columns={leadDashboardColumns}
        totalCount={pageDetails?.totallineCount}
      ></CustomTable>
      </div>
    </>
  )
}

export default Dashboard
