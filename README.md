### RESIGNATION CLIENT ID
REACT_APP_RG_CLIENT_ID=hr-resignation-ui
### RESIGNATION ROLE


## 🔹 A. EMPLOYEE

### 🔸 Base Endpoint
```http
POST epm/hr/rg/requests/q?isFetchDocuments=true
```

**Query Body:**
```json
[
  {
    "attribute": "personNumber",
    "operator": "=",
    "value": ""
  }
]
```

📄 *Files:*  
`pages/employeeResignRequest.jsx`  
`src/components/addResignationRequest.jsx`

---

### ✳️ Features

#### 1. Create Request

📄 *Files:*  
`pages/employeeResignRequest.jsx`  
`src/components/addResignationRequest.jsx`

**Retention Option**, **Resignation Reason**:  
```
rg/resignation-lov?context=${context}
```

**Employee Lookup**:  
```
hr/employee/find/q active=Y, empType=E, personName=''
```

**Create Request API**:
```http
POST rg/requests
```
```json
{
  "initiatedBy": "",
  "empRegReason": "",
  "optionToRetainId": "",
  "personId": "",
  "regReasonId": "",
  "updatedBy": ""
}
```

**Attach Resignation Letter**:
```json
{
  "requestId": "string",
  "documentCategory": "string",
  "personId": "string",
  "updatedBy": "string",
  "hodPersonId": "string",
  "attachments": [
    {
      "mimeType": "string",
      "originalFileName": "string",
      "bucketName": "string",
      "fileName": "string",
      "documentUrl": "string"
    }
  ]
}
```

---

#### 2. Cancel Request

📄 *File:*  
`pages/employeeResignRequest.jsx`

**Cancel API**:
```http
PUT requests/${selectedReq?.requestId}/cancel
```
```json
{
  "updatedBy": "username",
  "remarks": "remarks"
}
```

---

## 🔹 B. HR (All Requests & Tasks) and Approval Dashboard (Assigned Tasks)

### 🔸 Base Endpoints

**Requests Tab:**
```http
POST epm/hr/rg/requests/q
```

**Tasks Tab:**
```http
POST epm/hr/rg/requests/q?isTasks=true
```

📄 *File:*  
`pages/dashboard.jsx`

---

### ✳️ Features

#### 1. Approval Flow

##### ➤ **ALI Approval Flow**
- HOD Approval → HR Approval → CMO (for above 40K) → HR Final Approval

##### ➤ **AMIRA Approval Flow**

**A. Sales Department**  
- FM2 Approval → HOD Approval → HR Approval →  
  For Above 30K → CMO → HR Final Approval

**B. Other Departments**  
- Line Manager Approval → FM2 → HOD → HR →  
  For Above 30K → CMO → HR Final Approval

> ⚠️ *Decision, remarks, and specified last date are mandatory based on retention option.*  
> At the last step, the LWD (Last Working Day) email trigger key becomes visible.

📄 *Tasks redirected to:*  
`pages/task.jsx`

#### 2. Task Component Mapping

📄 *HR Final Approval:* `components/tasks/hrFinalApproval.jsx`  
📄 *Initial Approvals:* `components/tasks/initialApproval.jsx`

```js
{
  task: '0L', Component: InitialApproval,
  task: '0F', Component: InitialApproval,
  task: 1,    Component: InitialApproval,
  task: 2,    Component: InitialApproval,
  task: 3,    Component: InitialApproval,
  task: 4,    Component: HRFinalApproval
}
```
