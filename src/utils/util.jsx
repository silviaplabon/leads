/* eslint-disable react-refresh/only-export-components */
import { toast } from "react-toastify";
import { FaHomeIcon, FaWarn, TiIcon } from "./svgIcons";
import dayjs from "dayjs";

export const DefaultPageLimit = 15;
export const FontFamily = ``;

export const CONSTANTS = {
  localStorageRequests: "hrResignationRequests",
  localStorageTasks: "hrResignationTasks",
  localStorageUserRequests: "hrResignationUserRequests",
  localStorageMyTasks: "hrResignationMyTasks",
  localStorageRedirectedFromMyTasks: "hrResignationRedirectedFromMyTasks",
};
export const AmiraSalaryMaxRange = 30000;
export const OtherSalaryMaxRange = 40000;

export const checkSalaryRange = (reqDetails) => {
  if (reqDetails?.amiraPersonId == reqDetails?.hodPersonId) {
    return AmiraSalaryMaxRange;
  } else {
    return OtherSalaryMaxRange;
  }
};

export const GetTabStyle = (currentMode, modeKey) => ({
  color: modeKey === "MyTasks" ? "#fff" : currentMode === modeKey ? "#fff" : "",

  fontFamily: FontFamily,
  fontSize: 13,
  textAlign: "center",
  backgroundColor:
    modeKey === "MyTasks"
      ? ThemeData.primary
      : currentMode === modeKey
        ? ThemeData.primary
        : "",
  border: "1px solid #394981",
  borderTopLeftRadius: modeKey === "MyTasks" ? "10px" : "",
  borderBottomLeftRadius: modeKey === "MyTasks" ? "10px" : "",
  minWidth: "90px",
});

export const TaskNameLov = [
  {
    value: "Line Manager Approval",
    label: "Line Manager Approval",
  },
  {
    value: "FM2 Approval",
    label: "Fm2 Approval",
  },
  {
    value: "HOD Approval",
    label: "HOD Approval",
  },
  {
    value: "HR Approval",
    label: "HR Approval",
  },
  {
    value: "CMO Approval",
    label: "CMO Approval",
  },
  {
    value: "HR Final Approval",
    label: "HR Final Approval",
  },
];
export const HRTaskNameLov = [
  {
    value: "HR Approval",
    label: "HR Approval",
  },
  {
    value: "HR Final Approval",
    label: "HR Final Approval",
  },
];
export const TaskNumber = {
  "HOD Approval": 1,
  "HR Approval": 2,
  "CMO Approval": 3,
  "HR Final Approval": 4,
  "Line Manager Approval": "0L",
  "FM2 Approval": "0F",
};

export const TaskNameShortcut = {
  "HOD Approval": "HOD",
  "HR Approval": "HR",
  "CMO Approval": "CMO",
  "HR Final Approval": "HR",
  "Line Manager Approval": "LM",
  "FM2 Approval": "FM2",
};

export const DocumentCategoryForResignationRequest = "Resignation_Letter";
export const DocumentCategoryForResignationProcess =
  "Resignation_Process_Documents";

export const DocumentCategoryForOpenFileModal = {
  "Resignation Letter": "Resignation Or Termination Letter",
  HOD_Resignation_Documents: "HOD Uploaded Preview Document",
  HR_Resignation_Documents: "HR Uploaded Preview Document",
  CMO_Resignation_Documents: "CMO Uploaded Preview Document",
};
export const RequestsStatus = {
  Open: { name: "Open", color: "green" },
  Closed: { name: "Closed", color: "red" },
  Withdrawn: { name: "Withdrawn", color: "red" },
};
export const TasksStatus = {
  O: { name: "Open", color: "green" },
  C: { name: "Closed", color: "red" },
};

export const TaskNameByNumber = {
  "0L": "Line Manager Approval",
  "0F": "FM2 Approval",
  1: "HOD Approval",
  2: "HR Approval",
  3: "CMO Approval",
  4: "HR Final Approval",
};
export const FormatDate = (date, includeHM) => {
  return date
    ? includeHM === "Date"
      ? dayjs(date, "DD-MM-YYYY")?.format("DD-MMM-YYYY")
      : dayjs(date, "DD-MM-YYYY hh:mm")?.format("DD-MMM-YYYY hh:mm A")
    : "-";
};
export const getLocalStorageData = (keyName) => {
  try {
    return JSON.parse(localStorage.getItem(keyName)) || {};
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return {};
  }
};
export const TaskActionButtonStyle = {
  backgroundColor: "#34457e",
  marginLeft: "0.5rem",
  borderRadius: "6px",
  color: "#fff",
  boxShadow: "0 -1px 5px #ffffffb2,0 1px 5px rgba(94,104,121,.945)",
};

export const requestsIgnoreColumns = [
  "requestStatus",
  "fm1Name",
  "fm2Name",
  "empRegReason",
  "regReasonDesc",
  "optionToRetainIdDesc",
  "lastWorkDate",
  "hrDecision",
  "hodSpLastDate",
  "hodDecision",
  "eoSpLastDate",
  "eoDecision",
  "hireDate",
  "conLastDate",
  "updatedBy",
  "updatedOn",
  "legalEntity",
  "groupCode",
];
export const taskIgnoreColumns = [
  "taskId",
  "taskName",
  "taskStatus",
  "assignedTo",
  "assignedOn",
  "dueBy",
  "groupCode",
  "performedOn",
];

export const ThemeData = {
  secondary: "#e394551",
  primary: "#000229",
  ternary: "#D2Dee8",
  relaxedBlue: "#d2dee8",
  warmSilk: "#F4F0Eb",
  greenMindset: "#4c3f1c",
  approved: "#4eaa71",
  approvedBg: "#dafae4",
  rejectedBg: "#fde0e0",
  rejected: "#d81212",
  pending: "#48525f",
  pendingBg: "#dde1e1",
  fontColor: "#2b3a67",
  link: "blue",
  textColor: "#003366",
};
export const RowGutter = [45, 7];
export const employeeNonEditableReqFields = [
  { name: "Employee", key: "employeeName" },
  { name: "Emp. Number", key: "personNumber" },
  { name: "Group", key: "groupCode" },
  { name: "Designation", key: "designation" },
  { name: "Department", key: "departmentName" },
  { name: "Reporting To", key: "lineManagerName" },
  { name: "Legal Entity", key: "legalEntity" },
  { name: "Type Of Contract", key: "contractType" },
  { name: "HOD", key: "hodName" },
  { name: "Functional Manager 1", key: "fm1Name" },
  { name: "Functional Manager 2", key: "fm2Name" },
  { name: "DOJ", key: "hireDate", isHidden: true, formatType: "Date" },
];

export const nonEditableReqFields = [
  { name: "Employee", key: "employeeName" },
  { name: "Emp. Number", key: "personNumber" },
  { name: "Designation", key: "designation" },
  { name: "Department", key: "departmentName" },
  { name: "Reporting To", key: "lineManagerName" },
  { name: "Legal Entity", key: "legalEntity" },
  { name: "Type Of Contract", key: "contractType" },
  { name: "HOD", key: "hodName" },
  { name: "Functional Manager 1", key: "fm1Name" },
  { name: "Functional Manager 2", key: "fm2Name" },
  { name: "Gross Salary", key: "", isNotForUser: true },
  { name: "Reason For Resignation", key: "regReasonDesc", isForReq: true },
  { name: "Retention Option", key: "optionToRetainIdDesc", isForReq: true },
  { name: "Employee Remarks", key: "empRegReason", isForReq: true },
  { name: "DOJ", key: "hireDate", formatType: "Date" },
  {
    name: "Performance Justification",
    key: "performanceJustification",
    isNotForUser: true,
  },
  {
    name: "Notice Period (Days)",
    key: "noticePeriod",
    isForReq: true,
    isNotForUser: true,
  },
  {
    name: "Contractual LWD",
    key: "conLastDate",
    formatType: "Date",
    isForReq: true,
    isNotForUser: true,
  },
  {
    name: "Last Working Date",
    key: "lastWorkDate",
    isForReq: true,
    formatType: "Date",
  },
];
export const LineManagerReqFields = [
  { name: "LM Decision", key: "lmDecision" },
  {
    name: "LM Sp. Last Working Date",
    key: "lmSpLastDate",
    formatType: "Date",
  },
  { name: "LM Feedback", key: "lmFeedback" },
];
export const Fm2ReqFields = [
  { name: "FM2 Decision", key: "fm2Decision" },
  {
    name: "FM2 Sp. Last Working Date",
    key: "fm2SpLastDate",
    formatType: "Date",
  },
  { name: "FM2 Feedback", key: "fm2Feedback" },
];
export const userReqFields = [
  { name: "Reason For Resignation", key: "regReasonDesc", isForReq: true },
  { name: "Retention Option", key: "optionToRetainIdDesc", isForReq: true },
  { name: "Employee Remarks", key: "empRegReason", isForReq: true },
  {
    name: "Contractual LWD",
    key: "conLastDate",
    formatType: "Date",
    isForReq: true,
    isNotForUser: true,
  },
  {
    name: "Last Working Date",
    key: "lastWorkDate",
    isForReq: true,
    formatType: "Date",
  },
  // { name: "Initiated On", key: "initiatedOn", formatType: "DateTime" },
];
export const hodNonEditableReqFields = [
  { name: "HOD Decision", key: "hodDecision" },
  {
    name: "HOD Sp. Last Working Date",
    key: "hodSpLastDate",
    formatType: "Date",
  },
  { name: "HOD Feedback", key: "hodFeedback" },
];

export const hrNonEditabelReqFields = [
  { name: "HR Decision", key: "hrDecision" },
  { name: "HR Feedback", key: "hrFeedback" },
];
export const cmoNonEditableReqFields = [
  { name: "CMO Decision", key: "eoDecision" },
  { name: "CMO Feedback", key: "eoFeedback" },
  {
    name: "Last Work Date",
    key: "lastWorkDate",
    hideForHRFinal: true,
    formatType: "Date",
  },
];

export const TaskFields = [
  { name: "Assigned To", key: "assignedTo" },
  { name: "Assigned On", key: "assignedOn", formatType: "Date" },
  { name: "Performed By", key: "performedBy" },
  { name: "Performed On", key: "performedOn", formatType: "Date" },
  {
    name: "Decision",
    key: "actorDecision",
  },
  {
    name: "Remarks",
    key: "actorRemarks",
  },
];

export const hrFinalNonEditableReqFields = [];
export const ActiveYNLOV = [
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" },
];
export const NavItems = [
  {
    elementName: "Dashboard",
    key: "Dashboard",
    icon: FaHomeIcon({
      color: "#fff",
      height: "14px",
      width: "14px",
    }),
  },
];

export const ToastMessage = (
  typeOfMessage,
  toastMessage,
  fontFamily = `Urbanist`
) => {
  const commonProps = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "dark",
    progressStyle: {
      transform: "scaleX(-1)",
      transformOrigin: "right",
    },
    style: {
      backgroundColor:
        typeOfMessage === "warn"
          ? "#fff"
          : typeOfMessage === "success"
            ? "#e6f4e7"
            : typeOfMessage === "error"
              ? "#ffe6df"
              : "#e0eefb",
      color: typeOfMessage === "warn" ? "#E9D502" : "#000",
      font: `normal normal normal 12px  ${fontFamily}`,
    },
  };
  if (typeOfMessage === "success") {
    toast.success(toastMessage, {
      ...commonProps,
      progressStyle: {
        background: "#84c28c",
        transform: "scaleX(-1)",
        transformOrigin: "right",
      },
      icon: (
        <div
          style={{
            borderRadius: "50%",
            height: "20px",
            width: "20px",
            backgroundColor: "#84c28c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {TiIcon({ color: "#fff" })}
        </div>
      ),
    });
  } else if (typeOfMessage === "error") {
    toast.error(toastMessage, {
      ...commonProps,
    });
  } else if (typeOfMessage === "info") {
    toast.info(toastMessage, {
      ...commonProps,
    });
  } else if (typeOfMessage === "warn") {
    toast.warn(toastMessage, {
      ...commonProps,
      // progressStyle: { background: "#E9D502" },
      icon: (
        <div
          style={{
            borderRadius: "50%",
            height: "20px",
            width: "20px",
            backgroundColor: "#E9D502",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {FaWarn({ color: "#fff" })}
        </div>
      ),
    });
  }
};
export const GetRequestsOrTasksLovData = (
  item,
  activeGroup,
  userType,
  isMyTasks = false
) => {
  let HRRoles = "";
  const updatedGroupCodeLov = [];
  if (userType == "HR" && item == "groupCode") {
    for (let i = 0; i < activeGroup?.length; i++) {
      if (activeGroup[i]?.includes("HR")) {
        HRRoles =
          HRRoles?.length > 0 ? `${HRRoles},${activeGroup[i]}` : activeGroup[i];
        if (activeGroup[i]?.includes("UAE")) {
          updatedGroupCodeLov.push({ value: "UAE", label: "UAE" });
        } else if (activeGroup[i]?.includes("HOSP")) {
          updatedGroupCodeLov.push({ value: "HOSP", label: "HOSP" });
        } else if (activeGroup[i]?.includes("INT")) {
          updatedGroupCodeLov.push({ value: "INT", label: "INT" });
        } else if (activeGroup[i]?.includes("DC")) {
          updatedGroupCodeLov.push({ value: "DC", label: "DC" });
        }
      }
    }
  }

  if (item === "taskStatus" || item === "requestStatus") {
    return item === "requestStatus"
      ? {
          lov: [
            { value: "O", label: "Open" },
            { value: "C", label: "Closed" },
            { value: "W", label: "Withdrawn" },
          ],
        }
      : {
          lov: [
            { value: "O", label: "Open" },
            { value: "C", label: "Closed" },
          ],
        };
  } else if (item === "taskName") {
    return {
      lov: TaskNameLov,
    };
  } else if (item === "lwdEmailTrig") {
    return {
      lov: [
        { label: "Yes", value: "Y" },
        { label: "No", value: "N" },
      ],
    };
  } else if (item === "groupCode") {
    return {
      lov:
        userType === "HR" && !isMyTasks
          ? updatedGroupCodeLov
          : [
              { value: "UAE", label: "UAE" },
              { value: "HOSP", label: "HOSP" },
              { value: "INT", label: "INT" },
              { value: "DC", label: "DC" },
            ],
    };
  }
  return { lov: "" };
};
const isGroupCodeExist = (activeGroup, localData, searchObjKey) => {
  const filteredData = activeGroup?.filter((item) =>
    item?.includes(localData?.groupCode?.label)
  );
  if (filteredData?.length > 0) {
    return localData?.groupCode?.label;
  } else {
    const updatedLocalData = { ...localData };
    delete updatedLocalData.groupCode;
    localStorage.setItem(searchObjKey, JSON.stringify(updatedLocalData));
    return "";
  }
};
export const RequestsAndTasksAdditionalQueries = (
  tab,
  userType,
  username,
  activeGroup,
  empDetails,
  isMyTasks,
  type,
  txt
) => {
  let additionalQueries = [];
  let HRRoles = "";
  let updatedGroupCode = "";
  let isGroupFilterApplied = false;
  const localData =
    type === "groupCode"
      ? ""
      : localStorage.getItem(
            isMyTasks
              ? CONSTANTS.localStorageMyTasks
              : CONSTANTS.localStorageRequests
          )
        ? JSON.parse(
            localStorage.getItem(
              isMyTasks
                ? CONSTANTS.localStorageMyTasks
                : CONSTANTS.localStorageRequests
            )
          )
        : {};

  for (let i = 0; i < activeGroup?.length; i++) {
    if (activeGroup[i]?.includes("HR")) {
      HRRoles =
        HRRoles?.length > 0 ? `${HRRoles},${activeGroup[i]}` : activeGroup[i];
    }
    if (activeGroup[i]?.includes("UAE:HR")) {
      updatedGroupCode = updatedGroupCode ? `${updatedGroupCode},UAE` : "UAE";
    }
    if (activeGroup[i]?.includes("INT:HR")) {
      updatedGroupCode = updatedGroupCode ? `${updatedGroupCode},INT` : "INT";
    }
    if (activeGroup[i]?.includes("HOSP:HR")) {
      updatedGroupCode = updatedGroupCode ? `${updatedGroupCode},HOSP` : "HOSP";
    }
    if (activeGroup[i]?.includes("DC:HR")) {
      updatedGroupCode = updatedGroupCode ? `${updatedGroupCode},DC` : "DC";
    }
  }

  const groupFilterValue =
    type === "groupCode"
      ? txt?.value
        ? txt.value
        : ""
      : localData?.groupCode?.label
        ? userType == "HR"
          ? isGroupCodeExist(
              activeGroup,
              localData,
              isMyTasks
                ? CONSTANTS.localStorageMyTasks
                : CONSTANTS.localStorageRequests
            )
          : localData?.groupCode?.label
        : "";

  if (groupFilterValue !== "") {
    additionalQueries.push({
      attribute: "groupCode",
      value: groupFilterValue,
      operator: "IN",
    });
    isGroupFilterApplied = true;
  } else if (userType === "HR" && !isMyTasks) {
    additionalQueries.push({
      attribute: "groupCode",
      value: updatedGroupCode,
      operator: "IN",
    });
  }
  if (tab?.includes("Tasks")) {
    additionalQueries.push({
      attribute: "assignedTo",
      value: "SYSTEM",
      operator: "!=",
    });

    if (!userType?.includes("HR") || (userType?.includes("HR") && isMyTasks)) {
      additionalQueries.push({
        attribute: "assignedTo",
        value: isMyTasks ? username : userType == "CMO" ? `CMO,RG:CMO` : "",
        operator: "IN",
      });
    }
    if (!isMyTasks && (userType?.includes("HR") || userType?.includes("CMO"))) {
      additionalQueries.push({
        attribute: "workMail",
        value: username,
        operator: "!=",
      });
    }
  } else if (tab === "Requests") {
    if (empDetails?.user?.personNumber) {
      additionalQueries.push({
        attribute: "personNumber",
        value: empDetails?.user?.personNumber,
        operator: "!=",
      });
    }
    if (userType?.includes("HR")) {
      // additionalQueries.push({
      //   attribute: "hrAssignedTo",
      //   value: HRRoles,
      //   operator: "IN",
      // });
    } else {
      additionalQueries.push({
        attribute: "assignedTo",
        value: userType === "CMO" ? "RG:CMO" : username,
        operator: "CONTAINS",
      });
      additionalQueries.push({
        attribute: "requestStatus",
        value: "W",
        operator: "!=",
      });
    }
  }
  return {
    additionalQueries: additionalQueries,
    isGroupFilterApplied: isGroupFilterApplied,
  };
};

export const generateSortTextAndCustomQuery = (
  searchObjKey,
  type,
  txt,
  additionalQueries = [],
  sortType,
  sortObj = {},
  additionalSearchTemp,
  defaultSortText,
  equalOperatorsArray,
  betweenOperatorsArray,
  needToIgnoreSearchKeys,
  limit,
  pageNum
) => {
  try {
    const localData = localStorage.getItem(searchObjKey)
      ? JSON.parse(localStorage.getItem(searchObjKey))
      : {};
    let searchTemp = { ...localData };
    if (additionalSearchTemp) {
      searchTemp = { ...searchTemp, ...additionalSearchTemp };
    }
    let customQuery = additionalQueries;
    if (type) {
      searchTemp[type] = txt ? txt : "";
    }
    let queryCount = 0;
    Object.keys(searchTemp)?.forEach((record) => {
      let isQueryIncreased = false;
      if (searchTemp[record] && !needToIgnoreSearchKeys?.includes(record)) {
        if (betweenOperatorsArray?.includes(record)) {
          if (searchTemp[record][0] && searchTemp[record][1]) {
            customQuery.push({
              attribute: record,
              operator: "BETWEEN",
              value: dayjs(searchTemp[record][0])?.format("DD-MM-YYYY"),
              toValue: dayjs(searchTemp[record][1])?.format("DD-MM-YYYY"),
            });
            isQueryIncreased = true;
          }
        } else if (equalOperatorsArray?.includes(record)) {
          if (
            typeof searchTemp[record] === "object"
              ? searchTemp[record]["value"]
                ? searchTemp[record]["value"]?.trim()
                : ""
              : searchTemp[record]
                ? searchTemp[record]?.trim()
                : searchTemp[record]
          ) {
            isQueryIncreased = true;
            customQuery.push({
              attribute: record,
              operator: "=",
              value:
                typeof searchTemp[record] === "object"
                  ? searchTemp[record]["value"]
                    ? searchTemp[record]["value"]?.trim()
                    : ""
                  : searchTemp[record]
                    ? searchTemp[record]?.trim()
                    : searchTemp[record],
            });
          }
        } else {
          if (
            typeof searchTemp[record] === "object"
              ? searchTemp[record]["value"]
                ? searchTemp[record]["value"]?.trim()
                : ""
              : searchTemp[record]
                ? searchTemp[record]?.trim()
                : searchTemp[record]
          ) {
            isQueryIncreased = true;
            customQuery.push({
              attribute: record,
              operator: "CONTAINS",
              value:
                typeof searchTemp[record] === "object"
                  ? searchTemp[record]["value"]
                    ? searchTemp[record]["value"]?.trim()
                    : ""
                  : searchTemp[record]
                    ? searchTemp[record]?.trim()
                    : searchTemp[record],
            });
          }
        }
        if (isQueryIncreased) {
          queryCount += 1;
        }
      }
    });

    localStorage.setItem(searchObjKey, JSON.stringify(searchTemp));
    let sortTemp = {};
    if (sortType) {
      let updatedSortType =
        sortObj[sortType] === "D" ? "A" : sortObj[sortType] === "A" ? "" : "D";
      if (sortTemp[sortType]) {
        delete sortTemp[sortType];
      }
      sortTemp[sortType] = updatedSortType;
    } else {
      sortTemp = sortObj;
    }

    let sortText = "";
    Object.keys(sortTemp)?.forEach((record) => {
      if (sortTemp[record]) {
        sortText = sortText
          ? `${sortText},${record}~${sortTemp[record]}`
          : `${record}~${sortTemp[record]}`;
      }
    });
    if (!sortText) {
      sortText = defaultSortText;
    }

    sortText = sortText?.endsWith(",") ? sortText?.slice(0, -1) : sortText;
    let data = JSON.stringify({
      limit: limit ? limit : 20,
      query: customQuery,

      sortText: sortText,
      pageNumber: pageNum ? pageNum : 0,
    });
    const filterDetails = { isFilterExist: false, filterCount: 0 };
    if (queryCount > 0) {
      filterDetails.isFilterExist = true;
      filterDetails.filterCount = queryCount > 0 ? queryCount - 1 : queryCount;
    }

    return {
      modifiedSortText: sortText,
      modifiedQueries: customQuery,
      queryCount: queryCount,
      data: data,
      filterDetails: filterDetails,
      sortTemp: sortTemp,
    };
  } catch (e) {
    ToastMessage("error", e.message);
  }
};

export const FakeLeadsData = [
  {
    name: "Shuja ibn Wahb",
    status: "New Lead",
    leadOwner: "Sasanka",
    mobile: "533333333",
    email: "abc@gmail.com",
    recentActivity: "Called on 13-Jun",
    createdOn: "10-Jun-25",
    score: "green",
  },
  {
    name: "Ammar ibn Yasir",
    status: "Condominium",
    leadOwner: "8 Sep, 2023",
    mobile: "8 Oct, 2023",
    email: "Viewing",
    recentActivity: "",
    createdOn: "",
    score: "Annette Black",
  },
  {
    name: "Abu Talha al-Ansari",
    status: "Multi Family",
    leadOwner: "9 Sep, 2023",
    mobile: "22 Oct, 2023",
    email: "New",
    recentActivity: "",
    createdOn: "",
    score: "Kristin Watson",
  },
  {
    name: "Zayd ibn Harithah",
    status: "Townhouse",
    leadOwner: "11 Sep, 2023",
    mobile: "21 Oct, 2023",
    email: "Viewing",
    recentActivity: "",
    createdOn: "",
    score: "Arlene McCoy",
  },
  {
    name: "Ubadah ibn al-Samit",
    status: "Condominium",
    leadOwner: "30 Aug, 2023",
    mobile: "17 Oct, 2023",
    email: "New",
    recentActivity: "",
    createdOn: "",
    score: "Jenny Wilson",
  },
  {
    name: "Al-Arqam ibn Abi al-Arqam",
    status: "Multi Family",
    leadOwner: "24 Aug, 2023",
    mobile: "2 Oct, 2023",
    email: "Closed Won",
    recentActivity: "",
    createdOn: "",
    score: "Marvin McKinney",
  },
  {
    name: "Miqdad ibn Aswad",
    status: "Multi Family",
    leadOwner: "21 Aug, 2023",
    mobile: "22 Oct, 2023",
    email: "Assigned",
    recentActivity: "",
    createdOn: "",
    score: "Courtney Henry",
  },
  {
    name: "Abu Bakr",
    status: "Apartment",
    leadOwner: "14 Aug, 2023",
    mobile: "17 Oct, 2023",
    email: "Closed Won",
    recentActivity: "",
    createdOn: "",
    score: "Darrell Steward",
  },
  {
    name: "Uthman ibn Hunaif",
    status: "Townhouse",
    leadOwner: "11 Aug, 2023",
    mobile: "24 Oct, 2023",
    email: "Assigned",
    recentActivity: "",
    createdOn: "",
    score: "Jerome Bell",
  },
  {
    name: "Amir ibn Fuhayra",
    status: "Apartment",
    leadOwner: "10 Aug, 2023",
    mobile: "12 Nov, 2023",
    email: "New",
    recentActivity: "",
    createdOn: "",
    score: "Theresa Webb",
  },
  {
    name: "Amr ibn al-Jamuh",
    status: "Townhouse",
    leadOwner: "7 Aug, 2023",
    mobile: "17 Nov, 2023",
    email: "Viewing",
    recentActivity: "",
    createdOn: "",
    score: "Guy Hawkins",
  },
];

export const ParseDate = (inputDate) => {
  const input = new Date(inputDate);
  if (!input || !inputDate) return "-";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inputMidnight = new Date(input);
  inputMidnight.setHours(0, 0, 0, 0);

  const diffInDays = (inputMidnight - today) / (1000 * 60 * 60 * 24);

  const timePart = input.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (diffInDays === 0) return `Today ${timePart}`;
  if (diffInDays === 1) return `Tomorrow ${timePart}`;
  if (diffInDays === -1) return `Yesterday ${timePart}`;

  const datePart = input
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .replace(/ /g, "-");

  return datePart && timePart ? `${datePart} ${timePart}` : "-";
};

export const BackgroundColorObj = {
  primary: ["#428667", "#dbf1e5"],
  success: ["#2479be", "#dbebfb"],
  error: ["#e23636", "#fdf3f3"],
  warning: ["#874b1f", "#f3eadd"],
};
export const GetInitialsAvatar = (name) => {
  if (!name) {
    return ""; // Return empty string for empty name
  }

  const nameParts = name.trim().split(" ");
  let initials = "";

  for (const part of nameParts) {
    if (part.length > 0) {
      initials += part[0].toUpperCase();
    }
  }

  return initials.slice(0, 2);
};

export const LeadDetailsInfo = [
  {
    title: "Lead Status",
    keyName: "leadStatus",
  },
  { title: "Lead Source", keyName: "leadSource" },
  { title: "Campaign", keyName: "campaign" },
  {
    title: "Source",
    keyName: "source",
  },
  {
    title: "Lead Owner",
    keyName: "leadOwner",
  },
  {
    title: "Duplicate?",
    keyName: "isDuplicate",
  },
  {
    title: "Created On",
    keyName: "createdOn",
  },
  {
    title: "Created By",
    keyName: "createdBy",
  },
  {
    title: "Property Of Interest",
    keyName: "propertyOfInterest",
  },
  {
    title: "Recent Activity",
    keyName: "recentActivity",
  },
];

export const LeadDetailSummaryInfo = [
  {
    title: "Title",
    keyName: "title",
  },
  {
    title: "Nationality",
    keyName: "nationality",
  },
  {
    title: "Organization",
    keyName: "organization",
  },
  {
    title: "Job Title",
    keyName: "jobTitle",
  },

  {
    title: "Annual Revenue",
    keyName: "annualRevenue",
  },
  {
    title: "Budget Estimate",
    keyName: "budgetEstimate",
  },
];
export const getRandomTextAvatarColor = () => {
  const colors = [
    "#FF6B6B",
    "#6BCB77",
    "#4D96FF",
    "#FFC75F",
    "#F9F871",
    "#A66DD4",
    "#FF9671",
    "#00C9A7",
    "#C34A36",
    "#845EC2",
    "#008F7A",
    "#B39CD0",
    "#F66D44",
    "#E3B505",
    "#5CDB95",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
export const colorCodeBasedOnStatus = {
  "Need Contact Details": ["#f1ecde", "#884d2b"],
  "Tour Scheduled": ["#f1ecde", "#884d2b"],
  "Fast Response": ["#d9f1e6", "#19613d"],
  "Going Cold": ["#e5e5e5", "#666666"],
  "Lead": ["#e5e5e5", "#666666"],
  "Need Follow Up": ["#dbecf6", "#3878bc"],
  "Application Received": ["#dbecf6", "#3878bc"],
};

export const getRecentActivityColor = (item, isBg) => {
  const updatedColor = colorCodeBasedOnStatus[item]
    ? isBg
      ? colorCodeBasedOnStatus[item][0]
      : colorCodeBasedOnStatus[item][1]
    : "-";

  return updatedColor;
};
