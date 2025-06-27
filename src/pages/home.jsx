/* eslint-disable react/prop-types */
import Dashboard from "./dashboard";
import LeadCards from "./leadsCard";
import CustomTypography from "../components/UI/customTypography";
import CustomButton from "../components/UI/CustomButton";
import { useRef, useState } from "react";
import {
  DashboardSvgIcon,
  GlobeSvgIcon,
  ListSvgIcon,
  MailSvgIcon,
  PhoneSvgIcon,
} from "../utils/svgIcons";
import CustomAutoComplete from "../components/UI/Input/customAutoComplete";
import {
  FontFamily,
  GetInitialsAvatar,
  getRandomTextAvatarColor,
  getRecentActivityColor,
  ParseDate,
  ThemeData,
} from "../utils/util";
import TableCellValue from "../components/UI/Table/tableCellValue";
import HeaderColumn from "../components/UI/Table/headerColumn";
import { Avatar } from "antd";
import CustomTable from "../components/UI/Table/customTable";
import { fakeLeadsData } from "../utils/fakeData";

const Home = ({ selectedButton }) => {
  const [allStatus, setAllStatus] = useState("All Status");
  const [allSources, setAllSources] = useState("All Sources");
  const [sortText, setSortText] = useState("Recently Updated");
  const [typeOfLeadsView, setTypeOfLeadsView] = useState("");
  const [pageLoader] = useState(false);
  const [pageDetails, setPageDetails] = useState();
  const [pageData] = useState(fakeLeadsData);
  const breadcrumbRef = useRef(null);

  const changePageFn = (num, limit) => {
    const updatedPageNo = limit !== pageDetails?.pageLimit ? 1 : num;
    setPageDetails((prev) => ({
      ...prev,
      pageNumber: updatedPageNo,
      pageLimit: limit,
    }));
  };

  const inputFieldCommonParams = {
    isRequired: false,
    isModalField: false,
    isWithController: false,
    isEditable: false,
  };
  const GridSize = {
    childrenGridSize: 24,
    inputGridSize: 24,
    titleGridSize: 24,
  };
  const descriptionItems = [
    { icon: PhoneSvgIcon({ color: "gray" }), keyName: "mobile" },
    { icon: MailSvgIcon({ color: "gray" }), keyName: "email" },
  ];

  const leadDashboardColumns = [
    {
      title: () => "",
      width: 35,
      render: (leadItem) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar.Group
            max={{
              count: 2,
              style: { color: "#f56a00" },
            }}
          >
            <Avatar
              style={{
                backgroundColor: getRandomTextAvatarColor(),
              }}
            >
              {GetInitialsAvatar(leadItem?.name)}
            </Avatar>
          </Avatar.Group>{" "}
        </div>
      ),
    },
    {
      title: () => getHeaderColumn("Name", "name", "Text", "", ""),
      width: 110,
      render: (item) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CustomTypography
            textVal={item?.name}
            fontWeight={700}
            fontSize={12}
            style={{ marginTop: "0.3rem" }}
          ></CustomTypography>
          <CustomTypography
            fontSize={11}
            fontWeight={400}
            style={{ color: "gray" }}
            textVal={ParseDate(item?.createdOn)}
          ></CustomTypography>
        </div>
      ),
    },
    {
      title: () => getHeaderColumn("Contacts", "contacts", "Text"),
      width: 110,
      render: (item, index) => (
        <>
          {descriptionItems?.map?.((descriptionItem, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "0.2rem",
              }}
              key={index}
            >
              {descriptionItem.icon}
              <CustomTypography
                fontWeight={400}
                style={{ marginLeft: "1rem", marginTop: "0rem", color: "#000" }}
                textVal={item[`${descriptionItem?.keyName}`] || "-"}
                fontSize={11}
              ></CustomTypography>
            </div>
          ))}
        </>
      ),
    },
    {
      title: () => getHeaderColumn("Stage", "stage", "Text"),
      width: 100,
      render: (item) => (
        <>
          <div
            style={{
              padding: "0rem 0.5rem",
              borderRadius: "0.2rem",
              display: "flex",
              alignItems: "center",
              width: "fit-content",

              color: getRecentActivityColor(item?.stage),
              border: `1.3px solid  ${getRecentActivityColor(item?.stage)}`,
            }}
          >{`${item?.stage}`}</div>
        </>
      ),
    },

    {
      title: () => getHeaderColumn("Lead Status", "mobile", ""),
      width: 100,
      hidden: false,
      render: (item) => (
        <div
          style={{
            padding: "0rem 0.5rem",
            borderRadius: "0.2rem",
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            backgroundColor: getRecentActivityColor(item?.leadStatus, true)
          }}
        >{`${item?.stage}`}</div>
      ),
    },
    {
      title: () => getHeaderColumn("Lead Source", "email", ""),
      width: 90,
      hidden: false,
      render: (item, index) => renderTableCell(index, item?.purchaseCompanyName, ""),
    },
  ];
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
      typeOfFilter={typeOfFilter}
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

  return (
    <>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "0.2rem 3rem 0 1.2rem",
          height: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          {" "}
          <CustomTypography
            fontSize={20}
            fontWeight={"bold"}
            style={{ font: "normal normal 600 20px StereoGothic" }}
            textVal="Leads"
          ></CustomTypography>
          <div style={{ display: "flex" }}>
            <CustomButton
              title={"Add Lead"}
              showLoader={pageLoader}
              style={{
                backgroundColor:ThemeData.primary,
                color: "#000",
                marginRight: "1rem",
                boxShadow:
                  "0 -1px 5px #ffffffb2,0 1px 5px rgba(94,104,121,.945)",
              }}
              handleButtonClick={() => {
                // downloadReport()
              }}
            ></CustomButton>
            <CustomButton
              title={"Import"}
              showLoader={pageLoader}
              style={{
                backgroundColor:ThemeData.primary,
                color: "#000",
                marginLeft: "",
                boxShadow:
                  "0 -1px 5px #ffffffb2,0 1px 5px rgba(94,104,121,.945)",
              }}
              handleButtonClick={() => {
                // downloadReport()
              }}
            ></CustomButton>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                height: "30px",
                backgroundColor: "#fff",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <CustomTypography
                style={{
                  marginRight: "0.5rem",
                  font: `normal normal 700 11px ${FontFamily}`,
                }}
                textVal={"Show As"}
              >
                Show As
              </CustomTypography>{" "}
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  setTypeOfLeadsView("Board");
                }}
              >
                <CustomTypography
                  style={{
                    marginRight: "0.2rem",
                    color:typeOfLeadsView==='Board'?ThemeData.primary:'',
                    font: `normal normal 700 11px ${FontFamily}`,
                  }}
                  textVal="Board"
                ></CustomTypography>{" "}
                {DashboardSvgIcon()}{" "}
                <span style={{ margin: "0 0.2rem" }}>|</span>{" "}
              </div>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  setTypeOfLeadsView("List");
                }}
              >
                <CustomTypography
                  style={{
                    marginRight: "0.2rem",
                    color:typeOfLeadsView==='List'?ThemeData.primary:'',
                    font: `normal normal 700 11px ${FontFamily}`,
                  }}
                  textVal={"List"}
                ></CustomTypography>

                {ListSvgIcon()}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  maxWidth: "140px",
                  minWidth: "120px",
                  margin: "0 0.5rem",
                }}
              >
                <CustomAutoComplete
                  height={28}
                  getLovData={async () => {
                    return {
                      lov: [
                        { label: "All Status", value: "All Status", data: {} },
                      ],
                    };
                  }}
                  handleOnSearch={() => {}}
                  handleSelection={() => {
                    // setSelectedEmployeeDetails(val2?.data)
                    // clearErrors('selectedEmployeeName')
                  }}
                  value={allStatus}
                  codeKey="status"
                  name={"status"}
                  isWithController={false}
                  errorText={``}
                  setValue={setAllStatus}
                  gridSize={{ ...GridSize, inputGridSize: 24 }}
                  {...inputFieldCommonParams}
                ></CustomAutoComplete>
              </div>
              <div
                style={{
                  maxWidth: "140px",
                  minWidth: "120px",
                  margin: "0 0.5rem",
                }}
              >
                <CustomAutoComplete
                  height={30}
                  getLovData={async () => {
                    return {
                      lov: [
                        {
                          label: "All Sources",
                          value: "All Sources",
                          data: {},
                        },
                      ],
                    };
                  }}
                  handleOnSearch={() => {
                    // setSelectedEmployeeDetails()
                  }}
                  handleSelection={() => {
                    // setSelectedEmployeeDetails(val2?.data)
                    // clearErrors('selectedEmployeeName')
                  }}
                  value={allSources}
                  codeKey="sources"
                  name={"sources"}
                  isWithController={false}
                  setValue={setAllSources}
                  gridSize={{ ...GridSize, inputGridSize: 24 }}
                  {...inputFieldCommonParams}
                ></CustomAutoComplete>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                maxWidth: "200px",
                minWidth: "150px",
                margin: "0 ",
              }}
            >
              <CustomAutoComplete
                height={30}
                getLovData={async () => {}}
                handleOnSearch={() => {
                  // setSelectedEmployeeDetails()
                }}
                handleSelection={() => {
                  // setSelectedEmployeeDetails(val2?.data)
                  // clearErrors('selectedEmployeeName')
                }}
                codeKey="sources"
                name={"sources"}
                value={sortText}
                isWithController={false}
                errorText={``}
                setValue={setSortText}
                gridSize={{ ...GridSize, inputGridSize: 24 }}
                {...inputFieldCommonParams}
              ></CustomAutoComplete>
            </div>
          </div>
        </div>
        {selectedButton === "Dashboard" ? (
          <Dashboard></Dashboard>
        ) : typeOfLeadsView === "Board" ? (
          <LeadCards></LeadCards>
        ) : (
          <div>
            <CustomTable
              pageNumber={pageDetails?.pageNumber}
              changePageFn={changePageFn}
              noOfPages={pageDetails?.noOfPages}
              pageLimit={pageDetails?.pageLimit}
              tableWidth={"700px"}
              dataSource={pageData}
              ref={breadcrumbRef}
              tableHeight={"65vh"}
              tableIndex={`ReqTasksTable`}
              pageLoader={pageLoader}
              columns={leadDashboardColumns}
              totalCount={pageDetails?.totallineCount}
            ></CustomTable>
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
