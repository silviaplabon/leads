/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { DefaultPageLimit, GetRequestsOrTasksLovData } from "../utils/util.jsx";
import TableCellValue from "../components/UI/Table/tableCellValue.jsx";
import { useSelector } from "react-redux";
import CustomTable from "../components/UI/Table/customTable.jsx";
import HeaderColumn from "../components/UI/Table/headerColumn.jsx";
import Checkbox from "antd/es/checkbox/Checkbox.js";
import { fakeLeadsData } from "../utils/fakeData.jsx";

const Dashboard = ({ isMyTasks }) => {
  const sortObj = {};
  const [pageLoader] = useState(false);
  const [pageDetails, setPageDetails] = useState();
  const [pageData, setpageData] = useState([]);
  const breadcrumbRef = useRef(null);
  const [filterObj, setFilterObj] = useState({});
  const [isFilterItemsVisible, setIsFIlterItemsVisible] = useState(false);
  const userType = useSelector((state) => state.user.userType);

  const activeGroup = "";
  const handleFilter = (typeOfFilter, name, value, isEntered) => {
    setFilterObj((prev) => ({ ...prev, [name]: value }));
    if (isEntered) {
      setPageDetails((prev) => ({ ...prev, pageNumber: 1 }));
      // handleGetRequestsAndTasksData(
      //   mode,
      //   name,
      //   value,
      //   pageDetails?.pageLimit || DefaultPageLimit,
      //   0,
      // )
      // setFilterDetails((prev) => ({ ...prev, isFilterExist: true }))
    }
  };
  const handleGetLeadsData = async (tab, type, txt, limit) => {
    setPageDetails((prev) => ({
      ...prev,
      totallineCount: fakeLeadsData?.length || 0,
      noOfPages: fakeLeadsData?.length / (limit ? limit : DefaultPageLimit),
      pageLimit: limit ? limit : DefaultPageLimit,
    }));
    setpageData(fakeLeadsData);
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
  };

  const changePageFn = (num, limit) => {
    const updatedPageNo = limit !== pageDetails?.pageLimit ? 1 : num;
    setPageDetails((prev) => ({
      ...prev,
      pageNumber: updatedPageNo,
      pageLimit: limit,
    }));
    // handleGetRequestsAndTasksData(mode, '', '', limit, updatedPageNo - 1)
  };
  const handleSorting = () => {
    setPageDetails((prev) => ({
      ...prev,
      pageNumber: 1,
      pageLimit: pageDetails?.pageLimit || DefaultPageLimit,
    }));
    // handleGetRequestsAndTasksData(
    //   mode,
    //   '',
    //   '',
    //   pageDetails?.pageLimit || DefaultPageLimit,
    //   0,
    //   sortType,
    // )
  };
  const getHeaderColumn = (
    title,
    name,
    typeOfFilter,
    handleSorting,
    sortObj,
    updatedActiveGroup,
    userUpdatedType,
    updatedIsMyTasks
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
  );

  const renderTableCell = (
    index,
    value,
    formatType,
    // eslint-disable-next-line no-unused-vars
    showTitleEllipsis = false,
    cellStyle,
    isLink,
    isNavigateLink
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
    );
  };
  const leadDashboardColumns = [
    {
      title: () => "",
      width: 50,
      render: () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Checkbox checked={false} disabled={false}></Checkbox>
        </div>
      ),
    },
    {
      title: () =>
        getHeaderColumn(
          "Name",
          "name",
          "Text",
          "",
          "",
          activeGroup,
          userType,
          isMyTasks
        ),
      width: 110,
      render: (item, index) => renderTableCell(index, item?.name, ""),
    },
    {
      title: () =>
        getHeaderColumn(
          "Status",
          "status",
          "Text",
          handleSorting,
          sortObj,
          activeGroup,
          userType
        ),
      width: 110,
      render: (item, index) => renderTableCell(index, item?.status, ""),
    },
    {
      title: () =>
        getHeaderColumn(
          "Lead Owner",
          "leadOwner",
          "Text",
          handleSorting,
          sortObj
        ),
      width: 100,
      render: (item, index) =>
        renderTableCell(index, item?.leadOwner, "", true, "", true),
    },

    {
      title: () => getHeaderColumn("Mobile", "mobile", ""),
      width: 80,
      hidden: false,
      render: (item, index) => renderTableCell(index, item?.mobile, ""),
    },
    {
      title: () => getHeaderColumn("Email", "email", ""),
      width: 90,
      hidden: false,
      render: (item, index) => renderTableCell(index, item?.email, ""),
    },

    {
      title: () => getHeaderColumn("Recent Activity", "recentActivity", "Text"),
      width: 100,
      hidden: false,
      render: (item, index) => renderTableCell(index, item?.recentActivity, ""),
    },
    {
      title: () => getHeaderColumn("Created On", "createdOn", ""),
      width: 110,
      hidden: false,
      render: (item, index) =>
        renderTableCell(index, item?.createdOn, "", true),
    },
  ];

  useEffect(() => {
    handleGetLeadsData();
  }, []);

  return (
    <>
      <div>
        <CustomTable
          pageNumber={pageDetails?.pageNumber}
          changePageFn={changePageFn}
          noOfPages={pageDetails?.noOfPages}
          pageLimit={pageDetails?.pageLimit}
          tableWidth={"700px"}
          dataSource={pageData}
          ref={breadcrumbRef}
          tableHeight={'65vh'}
          tableIndex={`ReqTasksTable`}
          pageLoader={pageLoader}
          columns={leadDashboardColumns}
          totalCount={pageDetails?.totallineCount}
        ></CustomTable>
      </div>
    </>
  );
};

export default Dashboard;
