/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/prop-types */
import { Col, Row, Spin, Typography } from 'antd'
import {
  checkSalaryRange,
  CONSTANTS,
  DocumentCategoryForResignationProcess,
  DocumentCategoryForResignationRequest,
  FormatDate,
  nonEditableReqFields,
  RowGutter,
  TaskActionButtonStyle,
  TaskNameByNumber,
  ThemeData,
  ToastMessage,
} from '../utils/util.jsx'
import { CommonAPI } from '../services/common.jsx'
import { lazy, useCallback, useContext, useEffect, useState, useTransition } from 'react'
import { KeycloackContext } from '../Keycloak'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LovAPI } from '../services/lov.jsx'
import dayjs from 'dayjs'
import { PrevIcon } from '../utils/svgIcons.jsx'
import {
  updateCMODecision,
  updateHODDecision,
  updateHRDecision,
} from '../services/redux/actions/lovSlice.jsx'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../components/UI/CustomButton.jsx'
import CustomLabelAndValueContainer from '../components/UI/Container/customLabelAndValueContainer'
import DocumentViewModal from '../components/documentViewModal.jsx'
import DocumentAttachment from '../components/tasks/documentAttachments.jsx'

const InitialApproval = lazy(() => import('../components/tasks/initialApproval.jsx'))
// const HrApproval = lazy(() => import("../components/tasks/hrApproval.jsx"));
// const CMOApproval = lazy(() => import("../components/tasks/cmoApproval.jsx"));
const HRFinalApproval = lazy(() => import('../components/tasks/hrFinalApproval.jsx'))
import '../styles/tasks.css'
import Loader from '../components/UI/Loader.jsx'
import TasksDetails from '../components/tasks/tasksDetails.jsx'
import SkeletonContainer from '../components/skeletonContainer.jsx'
import useDeviceWidth from '../hooks/useDeviceWidth.jsx'

const Tasks = (props) => {
  const { getToken, username, activeGroup } = useContext(KeycloackContext)
  const [reqDetails, setReqDetails] = useState({})
  const [isFileModalOpened, setIsFileModalOpened] = useState(false)

  const [isPdfViewMaximized, setIsPdfViewMaximized] = useState(false)
  const [isPending, startTransition] = useTransition()
  const params = useParams()

  const reqId = parseInt(props.reqId) || params.reqId
  const taskId = atob(props?.taskId || '') || atob(params?.taskId || '')
  const taskNumber = atob(props?.taskNumber || '') || atob(params?.taskNumber || '')
  const userType = useSelector((state) => state.user.userType)
  const lovSavedData = useSelector((state) => state.lov)
  const [isSalaryLoading, setIsSalaryLoading] = useState(false)

  const [filePreviewDetails, setFilePreviewDetails] = useState()
  const {
    formState: { errors },
    handleSubmit,
    control,
    clearErrors,
    setValue,
    trigger,
    getValues,
  } = useForm({
    defaultValues: {},
  })

  const navigate = useNavigate()
  const [salaryData, setSalaryData] = useState()
  const [isHovered, setIsHovered] = useState(false)
  const [salaryResError, setSalaryResError] = useState()
  const [isDocModalOpened, setIsDocModalOpened] = useState()
  const [attachments, setAttachments] = useState([])
  // const [resignationApp, setResignationApp] = useState("");
  const [fileRes, setFileRes] = useState({})
  const [fileList, setFileList] = useState([])
  const [isFileLoading, setIsFileLoading] = useState(false)
  const [maxHeight, setMaxHeight] = useState('75vh')
  const [taskDecision, setTaskDecision] = useState('')
  const [isActionPermitted, setIsActionPermitted] = useState(false)
  const [tasks, setTasks] = useState(false)
  const [isTasksLoading, setIsTasksLoading] = useState(false)
  const [isKpiLoading, setIsKpiLoading] = useState(false)
  const [kpiData, setKpiData] = useState()

  const dispatch = useDispatch()
  const screenWidth = useDeviceWidth()

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 992) {
        setMaxHeight('60vh')
      } else {
        setMaxHeight('75vh')
      }
    }

    updateHeight() // Set on mount
    window.addEventListener('resize', updateHeight)

    return () => window.removeEventListener('resize', updateHeight)
  }, [])
  const handleTasks = async (isReverseOrder) => {
    setIsTasksLoading(true)
    const reqQueries = [
      {
        attribute: 'requestId',
        value: reqId,
        operator: '=',
      },
      {
        attribute: 'assignedTo',
        value: 'SYSTEM',
        operator: '!=',
      },
    ]
    if (taskNumber) {
      reqQueries.push({
        attribute: 'taskName',
        value: TaskNameByNumber[taskNumber],
        operator: '!=',
      })
    }
    if (userType === 'CMO') {
      reqQueries.push({
        attribute: 'taskName',
        value: 'HR Final Approval',
        operator: '!=',
      })
    }
    const token = await getToken().then((newToken) => newToken)
    const data = JSON.stringify({
      limit: 100,
      query: reqQueries,
      sortText: isReverseOrder ? 'performedOn~D' : 'performedOn~A',
      pageNumber: 0,
    })
    const resData = await CommonAPI.getPageData(
      token,
      'epm/hr/rg/requests/q?isTasks=true',
      'POST',
      data,
    )
    setIsTasksLoading(false)
    setTasks(resData.data || [])
  }

  const getTaskDocuments = (details) => {
    const updatedAttachments = []

    const addAttachments = (docs, isUserDoc) => {
      if (docs?.length > 0 && docs[0]?.attachments?.length > 0) {
        docs[0].attachments.forEach((item, index) => {
          updatedAttachments.push({
            ...item,
            isUserDoc,
            key: index,
            documentId: isUserDoc ? undefined : docs[0]?.documentId || '',
          })
        })
      }
    }

    addAttachments(
      details?.documents?.filter(
        (item) => item.documentCategory === DocumentCategoryForResignationRequest,
      ),
      true,
    )

    addAttachments(
      details?.documents?.filter(
        (item) => item.documentCategory === DocumentCategoryForResignationProcess,
      ),
      false,
    )

    setAttachments(updatedAttachments)
  }

  const fetchEmployeeSalary = useCallback(
    async (updatedDetails) => {
      if (taskNumber == 2 && userType === 'HR') {
        const token = await getToken().then((newToken) => newToken)
        setIsSalaryLoading(true)
        const salaryDetails = await CommonAPI.getPageData(
          token,
          `epm/hr/rg/salary/${updatedDetails?.personId}?requestedBy=${username}`,
          'GET',
          '',
          '',
          '',
          true,
        )
        setIsSalaryLoading(false)
        setSalaryData(salaryDetails?.data)
        const updatedErrorMessage = salaryDetails?.errorMessage
          ?.toLowerCase()
          ?.includes('no salary')
          ? `No Salary Information Available for ${updatedDetails?.employeeName}`
          : salaryDetails.errorMessage
            ? salaryDetails.errorMessage
            : ''
        if (taskNumber == 2 && updatedErrorMessage) {
          ToastMessage('error', updatedErrorMessage)
        }
        setSalaryResError(updatedErrorMessage)
      }
    },
    [getToken],
  )
  useEffect(() => {
    if (
      taskDecision &&
      taskDecision?.toLowerCase()?.includes('accept') &&
      salaryData?.grossSalary < checkSalaryRange(reqDetails) &&
      !reqDetails?.hodSpLastDate
    ) {
      setValue(
        'lastWorkDate',
        reqDetails?.lastWorkDate
          ? dayjs(reqDetails.lastWorkDate, 'DD-MM-YYYY')
          : reqDetails?.conLastDate
            ? dayjs(reqDetails.conLastDate, 'DD-MM-YYYY')
            : '',
      )
    }
  }, [salaryData, reqDetails, taskDecision])

  const handleTaskDecision = (lovData, selectedLovId) => {
    const filteredLov = lovData?.filter((item) => item?.value == selectedLovId)

    setTaskDecision(filteredLov?.length > 0 ? filteredLov[0]?.data?.meaning : '')
    return filteredLov?.length > 0 ? filteredLov[0]?.data?.meaning : ''
  }

  const fetchLov = async () => {
    if (taskNumber == 1 || taskNumber == '0L' || taskNumber == '0F') {
      const data = await handleLov('HOD_DECISION')
      dispatch(updateHODDecision(data))
      return data
    } else if (taskNumber == 2) {
      const data = await handleLov('HR_DECISION')
      dispatch(updateHRDecision(data))
      return data
    } else if (taskNumber == 3 || taskNumber == 4) {
      const data = await handleLov('FINAL_DECISION')
      dispatch(updateCMODecision(data))
      return data
    }
  }
  const getLovDataFromStore = () => {
    if (taskNumber == 1) {
      return lovSavedData?.hodLov
    } else if (taskNumber == 2 || taskNumber == 4) {
      return lovSavedData?.hrLov
    } else if (taskNumber == 3) {
      return lovSavedData?.cmoLov
    }
  }

  const fetchRequestDetails = async (isNeedToFetchLov, isOnlyDocs = false, isNeedToCheckAction) => {
    startTransition(async () => {
      let lovData = {}
      const token = await getToken().then((newToken) => newToken)

      if (isNeedToFetchLov) {
        lovData = await fetchLov()
      } else {
        lovData = getLovDataFromStore()
      }

      const resData = await CommonAPI.getPageData(
        token,
        `epm/hr/rg/requests/q?isFetchDocuments=true`,
        'POST',
        {
          limit: 1,
          query: [
            {
              attribute: 'requestId',
              value: parseInt(reqId),
              operator: '=',
            },
          ],

          sortText: '',
          pageNumber: 0,
        },
      )
      let updatedDetails = { ...resData.data[0] }

      if (resData.data?.length > 0 && resData.data[0]) {
        updatedDetails = { ...resData.data[0], ...resData.data[0].person }
      }
      if (updatedDetails?.person) {
        delete updatedDetails.person
      }
      getTaskDocuments(updatedDetails)
      setReqDetails(updatedDetails)
      const isCmo = activeGroup?.filter((item) => item?.includes('CMO'))?.length > 0 ? true : false

      if (!isOnlyDocs) {
        if (lovData?.lov?.length > 0 && updatedDetails?.currentTask?.actorDecisionId) {
          handleTaskDecision(lovData?.lov, updatedDetails?.currentTask?.actorDecisionId)
        }
        setValue('actorDecisionId', updatedDetails?.currentTask?.actorDecisionId)

        setValue('actorDecision', updatedDetails?.currentTask?.actorDecision)
        setValue(
          'lastWorkDate',
          updatedDetails?.lastWorkDate ? dayjs(updatedDetails?.lastWorkDate, 'DD-MM-YYYY') : '',
        )
        setValue('actorRemarks', updatedDetails?.currentTask?.actorRemarks)
        setValue('lwdEmailTrig', updatedDetails?.lwdEmailTrig)
        setValue(
          'lwdEmailTrigLabel',
          updatedDetails?.lwdEmailTrig === 'Y'
            ? 'Yes'
            : updatedDetails?.lwdEmailTrig === 'N'
              ? 'No'
              : '',
        )

        if (isNeedToCheckAction) {
          let isActionPermit = false
          if (
            (taskNumber == 1 || taskNumber == '0L' || taskNumber == '0F') &&
            updatedDetails?.assignedTo?.includes(username)
          ) {
            isActionPermit = true
          } else if (taskNumber == 2 && userType === 'HR') {
            isActionPermit = true
          } else if (taskNumber == 3 && (userType === 'CMO' || isCmo)) {
            isActionPermit = true
          } else if (taskNumber == 4 && userType === 'HR') {
            isActionPermit = true
          }
          setIsActionPermitted(isActionPermit)
        }
      }
      return updatedDetails
    })
  }

  const handleRefreshData = async (isDocs) => {
    fetchRequestDetails('', isDocs)
  }

  const fetchDetails = async () => {
    await fetchRequestDetails(true, '', true)
    await handleTasks(true)
  }
  useEffect(() => {
    if (taskNumber) {
      fetchDetails()
    }
  }, [taskNumber])

  const fetchKpiData = useCallback(
    // eslint-disable-next-line no-unused-vars
    async (updatedDetails) => {
      const token = await getToken().then((newToken) => newToken)
      setIsKpiLoading(true)
      const kpiDetails = await CommonAPI.getPageData(
        token,
        `epm/hr/rg/rating/${updatedDetails?.personId}`,
        'GET',
        '',
        '',
        '',
        true,
      )
      setIsKpiLoading(false)
      setKpiData(kpiDetails?.data)
    },
    [getToken],
  )
  console.log(kpiData, 'kpiData-----line393')
  useEffect(() => {
    if (
      (!salaryData || salaryData?.assignmentId === reqDetails?.personId) &&
      reqDetails?.personId
    ) {
      fetchEmployeeSalary(reqDetails)
    }
    if (reqDetails?.personId) {
      fetchKpiData(reqDetails)
    }
  }, [fetchEmployeeSalary, reqDetails, salaryData])
  console.log(kpiData, 'kpi Data----line403')
  const handleLov = async (context) => {
    const token = await getToken().then((newToken) => newToken)
    const resData = await LovAPI.getLov(
      token,
      `epm/hr/rg/resignation-lov?context=${context}`,
      'lookupCode',
      'lookupId',
      '',
      '',
      true,
    )
    return { lov: resData.data }
  }
  const GridSize = {
    childrenGridSize: 14,
    inputGridSize: 12,
    titleGridSize: 10,
  }
  const inputFieldCommonParams = {
    isRequired: true,
    isModalField: true,
    inputGridSize: 12,
    isWithController: true,
    isEditable: true,
  }

  const openFile = async (fileData, isLocal) => {
    setIsFileModalOpened(true)
    setIsFileLoading(true)
    const token = await getToken().then((newToken) => newToken)
    if (!isLocal) {
      const resData = await CommonAPI.downloadFile(token, fileData)
      setFilePreviewDetails(resData.data)
    } else {
      const data = {
        documentUrl: URL.createObjectURL(fileData?.originFileObj),
        fileName: fileData?.name,
        fileType: fileData?.name?.split('.')[fileData?.name?.split('.')?.length - 1],
      }
      setFilePreviewDetails(data)
    }
    setIsFileLoading(false)
  }

  const onSubmit = async (taskStatus) => {
    startTransition(async () => {
      try {
        if (taskNumber == 2 && taskStatus === 'C' && (!salaryData || salaryResError)) {
          ToastMessage(
            'error',
            salaryResError
              ? `Cannot proceed with this request as ${salaryResError}`
              : 'You are not authorized to perform this action. Viewing salary details is restricted.',
          )
        } else {
          const token = await getToken().then((newToken) => newToken)

          const { lastWorkDate, actorDecisionId, actorRemarks, lwdEmailTrig } = getValues()
          const salaryBasedTaskOutcome =
            salaryData?.grossSalary >= checkSalaryRange(reqDetails)
              ? 'salaryHigh'
              : !taskDecision?.toLowerCase()?.includes('retain')
                ? 'salaryLowAccept'
                : 'salaryLowRetain'

          let reqData = {
            taskId: taskId,
            taskStatus: taskStatus,
            taskName: TaskNameByNumber[taskNumber],
            performedBy: username,
            updatedBy: username,
            actorDecisionId:
              taskNumber == 4 ? reqDetails?.currentTask?.actorDecisionId : actorDecisionId,
            actorRemarks: actorRemarks,
            lastWorkDate: lastWorkDate ? lastWorkDate?.format('DD-MM-YYYY') : '',
            taskOutcome:
              taskNumber == 2
                ? salaryBasedTaskOutcome
                : !taskDecision?.toLowerCase()?.includes('retain')
                  ? 'Accept'
                  : 'Retain',

            lwdEmailTrig:
              taskNumber == 2 &&
              salaryData?.grossSalary &&
              salaryData?.grossSalary < checkSalaryRange(reqDetails) &&
              taskDecision &&
              taskDecision?.toLowerCase()?.includes('accept')
                ? lwdEmailTrig
                  ? lwdEmailTrig
                  : 'Y'
                : taskNumber == 4
                  ? lastWorkDate
                    ? lwdEmailTrig
                    : 'N'
                  : undefined,
          }

          const resData = await CommonAPI.getPageData(
            token,
            `epm/hr/rg/tasks/${taskId}`,
            'PUT',
            reqData,
          )
          if (taskStatus === 'C' && !resData?.isError) {
            ToastMessage('success', `Task Completed Successfully`)
            const isRedirectedFromMyTasks = localStorage.getItem(
              CONSTANTS.localStorageRedirectedFromMyTasks,
            )
              ? localStorage.getItem(CONSTANTS.localStorageRedirectedFromMyTasks) === 'true'
                ? true
                : false
              : false
            if (isRedirectedFromMyTasks) {
              navigate('/myTasks')
            } else {
              navigate('/')
            }
          } else if (!resData?.isError) {
            ToastMessage('success', `Data Saved Successfully`)
            fetchRequestDetails()
          }
        }
      } catch (e) {
        ToastMessage('error', e?.messsage)
      }
    })
  }

  const handleErrorValidation = async (taskStatus) => {
    const isValid = await trigger()
    if (isValid || taskStatus === 'O') {
      clearErrors()
      onSubmit(taskStatus)
    } else {
      ToastMessage('error', 'Please Add Mandatory Fields')
    }
  }

  return (
    <div className='contentContainerCardDiv'>
      <div className='taskCardHeaderContainer'>
        <div
          className='taskCardPrevIcon'
          onClick={() => {
            const isRedirectedFromMyTasks = localStorage.getItem(
              CONSTANTS.localStorageRedirectedFromMyTasks,
            )
              ? localStorage.getItem(CONSTANTS.localStorageRedirectedFromMyTasks) === 'true'
                ? true
                : false
              : false

            if (isRedirectedFromMyTasks) {
              navigate('/myTasks')
            } else {
              navigate('/')
            }
          }}
        >
          {PrevIcon({ color: '#fff', height: '25px', width: '25px' })}
        </div>
        <Typography className='taskCardTitle'>
          Approve Resignation ({taskNumber ? TaskNameByNumber[taskNumber] : ''}) - Request ID{' '}
          {reqId}
        </Typography>
      </div>
      <div
        style={{
          maxHeight: maxHeight,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0 0.5rem 0 2rem',
          marginBottom: '0.8rem',
        }}
      >
        {isPending ? (
          <div
            className='loaderContainer'
            style={{
              height: '60vh',
            }}
          >
            <Spin></Spin>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={[40, 5]}>
                <Col xs={24} lg={18} xl={19}>
                  <Row gutter={RowGutter} style={{ marginTop: '0.5rem' }}>
                    {nonEditableReqFields?.map((item, index) => {
                      const isGrossSalary = item?.name === 'Gross Salary'
                      const showGrossSalary = isGrossSalary && taskNumber == 2 && userType === 'HR'
                      if (isGrossSalary && !showGrossSalary) return null

                      const isPerformanceJustification = item?.name == 'Performance Justification'
                      const showPerformanceJustification = true
                      if (isPerformanceJustification && !showPerformanceJustification) return null

                      if (
                        item?.key === 'lastWorkDate' &&
                        taskNumber == 2 &&
                        taskDecision?.toLowerCase()?.includes('retain')
                      )
                        return null
                      if (
                        (item?.key === 'lastWorkDate' &&
                          taskNumber == 2 &&
                          salaryData?.grossSalary &&
                          salaryData?.grossSalary < checkSalaryRange(reqDetails) &&
                          !reqDetails?.lastWorkDate &&
                          taskDecision &&
                          taskDecision?.toLowerCase()?.includes('accept')) ||
                        (item?.key === 'lastWorkDate' && taskNumber != 2)
                      ) {
                        return null
                      }

                      return (
                        <CustomLabelAndValueContainer
                          key={index}
                          title={item?.name}
                          isWithEllipsis={true}
                          valueInHtml={item?.name === 'Gross Salary'}
                          value={
                            item?.name === 'Gross Salary' ? (
                              isSalaryLoading ? (
                                <Loader loaderType={'button'}></Loader>
                              ) : (
                                <div
                                  key={'grossSalary'}
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}
                                  style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {isActionPermitted
                                    ? salaryData?.grossSalary
                                      ? isHovered
                                        ? salaryData?.grossSalary
                                        : '*'.repeat(String(salaryData?.grossSalary)?.length)
                                      : '-'
                                    : '-'}
                                  {isActionPermitted
                                    ? salaryData?.currencyCode
                                      ? salaryData?.currencyCode
                                      : ''
                                    : ''}
                                </div>
                              )
                            ) : item?.name === 'Performance Justification' ? (
                              isKpiLoading ? (
                                <Loader loaderType={'button'}></Loader>
                              ) : (
                                <div key={'performanceJustification'}>
                                  {kpiData?.performanceJustification || '-'}
                                </div>
                              )
                            ) : item?.formatType === 'Date' ? (
                              FormatDate(reqDetails[item?.key], item?.formatType)
                            ) : (
                              reqDetails[item?.key] || '-'
                            )
                          }
                        />
                      )
                    })}

                    {isActionPermitted &&
                      [
                        { task: '0L', Component: InitialApproval },
                        { task: '0F', Component: InitialApproval },
                        { task: 1, Component: InitialApproval },
                        { task: 2, Component: InitialApproval },
                        { task: 3, Component: InitialApproval },
                        { task: 4, Component: HRFinalApproval },
                      ]
                        .filter(({ task }) => taskNumber == task)
                        .map(
                          ({ Component }) => (
                            handleLov,
                            clearErrors,
                            control,
                            errors,
                            setValue,
                            inputFieldCommonParams,
                            GridSize,
                            (
                              <Component
                                key={taskNumber}
                                handleLov={handleLov}
                                clearErrors={clearErrors}
                                control={control}
                                errors={errors}
                                setValue={setValue}
                                inputFieldCommonParams={inputFieldCommonParams}
                                GridSize={GridSize}
                                taskDecision={taskDecision}
                                setTaskDecision={setTaskDecision}
                                getValues={getValues}
                                reqDetails={reqDetails}
                                salaryData={salaryData}
                                taskNumber={taskNumber}
                              />
                            )
                          ),
                        )}
                  </Row>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '0.9rem',
                      marginBottom: '0.9rem',
                    }}
                  >
                    {isActionPermitted && (
                      <>
                        <CustomButton
                          buttonType='submit'
                          handleButtonClick={() => {
                            handleErrorValidation('O')
                          }}
                          showLoader={isPending || isFileLoading}
                          style={{
                            ...TaskActionButtonStyle,
                          }}
                          title={'Save as Draft'}
                        ></CustomButton>

                        <CustomButton
                          buttonType='submit'
                          handleButtonClick={() => {
                            handleErrorValidation('C')
                          }}
                          showLoader={
                            isPending || isFileLoading || (taskNumber == 2 && isSalaryLoading)
                          }
                          style={{
                            ...TaskActionButtonStyle,
                          }}
                          title={'Save & Proceed'}
                        ></CustomButton>
                      </>
                    )}
                  </div>
                </Col>
                <Col
                  xs={24}
                  lg={6}
                  xl={5}
                  style={{
                    boxShadow:
                      screenWidth > 991 ? `inset 6px 0 6px -6px  ${ThemeData.textColor}` : '',
                  }}
                >
                  <DocumentAttachment
                    title={'PREVIEW'}
                    openFile={openFile}
                    reqDetails={reqDetails}
                    setReqDetails={setReqDetails}
                    setIsLoading={setIsFileLoading}
                    isModalOpen={isDocModalOpened}
                    handleCancelModal={() => {
                      setIsDocModalOpened(false)
                    }}
                    handleRefreshData={handleRefreshData}
                    taskNumber={taskNumber}
                    attachments={attachments}
                    setAttachments={setAttachments}
                    fileRes={fileRes}
                    fileList={fileList}
                    setFileRes={setFileRes}
                    setFileList={setFileList}
                    isFileLoading={isFileLoading}
                    setIsFileLoading={setIsFileLoading}
                    isActionPermitted={isActionPermitted}
                  />
                </Col>
              </Row>

              {!isTasksLoading ? (
                <TasksDetails tasks={tasks}></TasksDetails>
              ) : (
                <SkeletonContainer count={4}></SkeletonContainer>
              )}
            </form>
          </>
        )}
      </div>

      {isFileModalOpened && (
        <div className={`pdfContainer `}>
          <DocumentViewModal
            isFileLoading={isFileLoading}
            isFileModalOpened={isFileModalOpened}
            handleCancelModal={() => {
              setIsFileModalOpened(false)
              setFilePreviewDetails()
              setIsFileLoading(false)
              setIsPdfViewMaximized(false)
            }}
            previewFileName={'Resignation Or Termination Letter'}
            isPdfViewMaximized={isPdfViewMaximized}
            filePreviewDetails={filePreviewDetails}
          ></DocumentViewModal>
          {/* </CustomModal> */}
        </div>
      )}
    </div>
  )
}
export default Tasks
