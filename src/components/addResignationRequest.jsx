/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import CustomModal from './UI/customModal'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Row, Typography, Upload } from 'antd'
import {
  DocumentCategoryForResignationRequest,
  FontFamily,
  ThemeData,
  ToastMessage,
} from '../utils/util.jsx'
import { KeycloackContext } from '../Keycloak.jsx'
import { CommonAPI } from '../services/common.jsx'
import { LovAPI } from '../services/lov.jsx'
import { InboxOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { CreateOrEditIcon, FaFileViewIcon } from '../utils/svgIcons.jsx'
import Dragger from 'antd/es/upload/Dragger.js'
import CustomAutoComplete from './UI/Input/customAutoComplete.jsx'
import CustomLabelAndValueContainer from './UI/Container/customLabelAndValueContainer.jsx'
import CustomInput from './UI/Input/customInput.jsx'
import '../styles/antUpload.css'
import DocumentViewModal from './documentViewModal.jsx'
import axios from 'axios'
import CustomTooltip from './UI/customTooltip.jsx'
import Loader from './UI/Loader.jsx'

const AddResignationRequest = ({
  isModalOpen,
  handleCancelModal,
  isPending,
  startTransition,
  handleRefreshData,
  isForEmployee,
}) => {
  const employeeDetails = useSelector((data) => data.user.user)
  const userType = useSelector((state) => state.user.userType)
  const { getToken, username } = useContext(KeycloackContext)
  const [uploadFileRes, setUploadedFileRes] = useState()
  const [isFileUploading, setIsFIleLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const [isFileModalOpened, setIsFileModalOpened] = useState(false)

  const [filePreviewDetails, setFilePreviewDetails] = useState()
  const [isPdfViewMaximized, setIsPdfViewMaximized] = useState(false)
  const [isFileLoading, setIsFileLoading] = useState(false)
  const cancelTokenRef = useRef(null)
  const [, setIsSubmitBtnClicked] = useState(false)

  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState()
  useEffect(() => {
    if (!isForEmployee) {
      setSelectedEmployeeDetails(employeeDetails)

      setValue('selectedEmployeeId', employeeDetails?.personId)
      setValue('selectedEmployeeName', employeeDetails?.personName || employeeDetails?.employeeName)
    }
  }, [employeeDetails, isForEmployee])

  const openFile = async (fileData) => {
    if (fileData?.name) {
      setIsFileModalOpened(true)
      setIsFileLoading(true)
      const data = {
        documentUrl: URL.createObjectURL(fileData.originFileObj),
        fileName: fileData?.name,
        fileType: fileData?.name?.split('.')[fileData?.name?.split('.')?.length - 1],
      }
      setFilePreviewDetails(data)
      setIsFileLoading(false)
    } else {
      ToastMessage('error', 'Something Went Wrong')
    }
  }

  const {
    formState: { errors },
    handleSubmit,
    control,
    clearErrors,
    setValue,
    trigger,
    getValues,
    reset,
  } = useForm({
    defaultValues: {},
  })

  const onSubmit = async () => {
    try {
      startTransition(async () => {
        if (selectedEmployeeDetails?.hodPersonId) {
          if (uploadFileRes) {
            const token = await getToken().then((newToken) => newToken)

            const { empRegReason, optionToRetainId, regReasonId } = getValues()
            const reqData = {
              initiatedBy: username,
              empRegReason: empRegReason,
              optionToRetainId: optionToRetainId,
              personId: selectedEmployeeDetails?.personId,
              regReasonId: regReasonId,
              updatedBy: username,
            }

            const resData = await CommonAPI.getPageData(
              token,
              `epm/hr/rg/requests`,
              'POST',
              reqData,
            )

            if (!resData?.isError) {
              const uploadedDocumentReq = {
                requestId: resData?.data?.requestId,
                documentCategory: DocumentCategoryForResignationRequest,
                personId: selectedEmployeeDetails?.personId,
                updatedBy: username,
                hodPersonId: selectedEmployeeDetails?.hodPersonId,
                attachments: [
                  {
                    mimeType: uploadFileRes?.mimeType,
                    originalFileName: fileList[0]?.name || 'Resignation or Termination Letter',
                    bucketName: uploadFileRes?.bucketName,
                    fileName: uploadFileRes?.fileName,
                    documentUrl: uploadFileRes?.url,
                  },
                ],
              }
              const docRes = await CommonAPI.getPageData(
                token,
                `epm/hr/rg/requests/${resData?.data?.requestId}/documents`,
                'POST',
                uploadedDocumentReq,
              )
              if (!docRes?.isError) ToastMessage('success', 'Request Created Successfully')

              handleRefreshData()
              handleCancelModalExecution()
              setFileList([])
            }
          }
        } else {
          ToastMessage('error', 'No HOD assigned for this employee.')
        }
      })
    } catch (e) {
      ToastMessage('error', e?.messsage)
    }
  }

  const handleErrorValidation = async () => {
    const isValid = await trigger()
    if (!isValid) {
      ToastMessage('error', 'Please Add Mandatory Fields')
    } else if (!uploadFileRes) {
      ToastMessage('error', 'Please Upload Resignation Letter')
    } else {
      setIsSubmitBtnClicked(true)
      clearErrors()
      onSubmit()
    }
  }

  const handleCancelModalExecution = () => {
    clearErrors()
    reset()
    handleCancelModal()
  }

  const inputFieldCommonParams = {
    isRequired: true,
    isModalField: true,
    isWithController: true,
    isEditable: true,
  }

  const handleLov = async (context) => {
    const token = await getToken().then((newToken) => newToken)
    const resData = await LovAPI.getLov(
      token,
      `epm/hr/rg/resignation-lov?context=${context}`,
      'lookupCode',
      'lookupId',
    )
    return { lov: resData.data }
  }
  const uploadResignationLetter = async (fileDetails) => {
    try {
      if (fileDetails?.originFileObj) {
        const token = await getToken().then((newToken) => newToken)

        const uploadRes = await CommonAPI.uploadFile(
          token,
          fileDetails.originFileObj,
          fileDetails?.name,
        )
        setUploadedFileRes(uploadRes.data)
        return uploadRes
      } else {
        ToastMessage('error', 'No Valid File Found')
      }
    } catch (e) {
      ToastMessage('error', e.message)
    }
  }

  const props = {
    name: 'file',
    multiple: false,
    onChange: async (info) => {
      info.fileList = info.fileList.slice(-1)
      info.fileList.forEach((x) => (x.status = 'uploading'))
      setFileList([...info.fileList])
      try {
        setIsFIleLoading(true)
        if (info.fileList?.length > 0) {
          const uploadRes = await uploadResignationLetter(info.fileList[0])
          if (info.fileList?.length > 0) {
            if (uploadRes?.isUploaded) {
              info.fileList[0].status = 'done'
            } else {
              info.fileList[0].status = 'error'
              setUploadedFileRes()
            }
          }
        } else {
          setUploadedFileRes()
        }
        setIsFIleLoading(false)
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsFIleLoading(false)
        if (info.fileList?.length > 0) {
          info.fileList[0].status = 'error'
          setUploadedFileRes()
        }
      }
      setFileList([...info.fileList])
    },
    // eslint-disable-next-line no-unused-vars
    itemRender: (originNode, file, currFileList) => {
      return (
        <div
          style={{ display: 'flex', alignItems: 'center', width: '100%' }}
          className='antUploadItem'
        >
          {file?.status === 'uploading' ? (
            <Loader loaderType={'button'}></Loader>
          ) : (
            <CustomTooltip title='Document Preview'>
              {' '}
              <div
                style={{
                  cursor: 'pointer',
                  width: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => openFile(file)}
              >
                {FaFileViewIcon({
                  width: '17px',
                  height: '17px',
                  color: '#000',
                })}
              </div>
            </CustomTooltip>
          )}

          <div style={{ width: '95%' }}>{originNode}</div>
        </div>
      )
    },
    onDrop() {},
  }

  const employeeInfo = [
    {
      title: 'Employee',
      keyName: 'employeeName',
      duplicateKey: 'personName',
      hideForHr: true,
      // value: employeeDetails?.employeeName || employeeDetails?.personName,
    },
    { title: 'D.O.J', keyName: 'hireDate' },
    { title: 'HOD', keyName: 'hodName' },
    {
      title: 'Line Manager',
      keyName: 'lineManagerName',
    },
  ]
  const GridSize = {
    childrenGridSize: 24,
    inputGridSize: 24,
    titleGridSize: 24,
  }
  const handleSearchEmployee = async (val) => {
    if (cancelTokenRef?.current) {
      cancelTokenRef?.current?.cancel('Operation canceled due to new request.')
    }
    cancelTokenRef.current = axios.CancelToken.source()
    const token = await getToken().then((tok) => tok)
    let data = await CommonAPI.searchEmployee(token, val, cancelTokenRef?.current)
    return {
      lov: data.options,
      isCancelledApi: data.isRequestCancelled || false,
    }
  }
  return (
    <>
      {/* ADD OR EDIT ATTRIBUTE MODAL */}
      <CustomModal
        isApiExecuting={isFileUploading || isPending}
        pageLoader={false}
        typeOfModalExecution={'Add'}
        buttonType='Submit'
        cancelModalFnc={() => handleCancelModalExecution()}
        handleAddOrEdit={() => handleErrorValidation()}
        isModalOpen={isModalOpen}
        title={'Create Request'}
        modalWidth={500}
        modalHeaderIcon={CreateOrEditIcon({ color: ThemeData.primary })}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '11px 25px' }}>
          {userType === 'HR' && isForEmployee && (
            <CustomAutoComplete
              height={25}
              getLovData={async (searchText) => {
                if (searchText?.length > 2) {
                  return handleSearchEmployee(searchText?.toLowerCase())
                } else {
                  return {
                    lov: [],
                  }
                }
              }}
              handleOnSearch={() => {
                setSelectedEmployeeDetails()
              }}
              handleSelection={(val1, val2) => {
                setSelectedEmployeeDetails(val2?.data)
                clearErrors('selectedEmployeeName')
              }}
              labelName={'Employee'}
              codeKey='selectedEmployeeId'
              isCharacterLimitedSearch={true}
              name={'selectedEmployeeName'}
              errorText={``}
              control={control}
              errors={errors}
              setValue={setValue}
              gridSize={{ ...GridSize, inputGridSize: 24 }}
              {...inputFieldCommonParams}
            ></CustomAutoComplete>
          )}

          {selectedEmployeeDetails && (
            <Row
              gutter={[10, 2]}
              style={{
                marginTop: '0rem',
                padding: '10px',
                border: '1px solid #dde7ee',
                borderRadius: '13px',
                boxShadow: '0 .1875rem .1875rem 0 #0e223812',
              }}
            >
              {employeeInfo.map((item, index) => {
                const shouldHide =
                  item?.hideForHr && userType?.toLowerCase() === 'hr' && isForEmployee

                if (shouldHide) {
                  return null
                }
                return (
                  <CustomLabelAndValueContainer
                    identifier={`${index}-${item?.title}`}
                    key={`${index}-${item?.title}-${item?.value}`}
                    title={item?.title}
                    value={
                      selectedEmployeeDetails[item?.keyName]
                        ? selectedEmployeeDetails[item?.keyName]
                        : item?.duplicateKey
                          ? selectedEmployeeDetails[item?.duplicateKey]
                          : '-'
                    }
                    titleGridSize={3}
                    gridSize={12}
                    isDetailsItem={true}
                  />
                )
              })}
            </Row>
          )}
          <Row gutter={[10, 2]} style={{ marginTop: '0.5rem' }}>
            <CustomInput
              labelName='Employee Resignation Remarks'
              name='empRegReason'
              inputType='TextArea'
              minRows={3}
              maxRows={5}
              errorText={'Employee Resignaiton Remarks must have some values'}
              control={control}
              errors={errors}
              setValue={setValue}
              {...inputFieldCommonParams}
              handleOnChange={(value) => {
                if (value?.length > 0) {
                  clearErrors('empRegReason')
                }
              }}
              gridSize={GridSize}
            />
            <CustomAutoComplete
              height={25}
              getLovData={async () => {
                return await handleLov('RETENTION_OPTION')
              }}
              handleOnSearch={() => {}}
              handleSelection={() => {
                clearErrors('optionToRetainIdDesc')
              }}
              labelName={'Retention Option'}
              codeKey='optionToRetainId'
              isCharacterLimitedSearch={false}
              name={'optionToRetainIdDesc'}
              control={control}
              errors={errors}
              errorText={`Retain must have some values.`}
              setValue={setValue}
              gridSize={{ ...GridSize, inputGridSize: 12 }}
              {...inputFieldCommonParams}
            ></CustomAutoComplete>
            <CustomAutoComplete
              height={25}
              getLovData={async () => {
                return await handleLov('RESIGNATION_REASON')
              }}
              handleOnSearch={() => {}}
              handleSelection={() => {
                clearErrors('regReasonDesc')
              }}
              labelName={'Resignation Reason'}
              codeKey='regReasonId'
              name={'regReasonDesc'}
              control={control}
              errors={errors}
              errorText={`Resignation Reason must have some values.`}
              setValue={setValue}
              gridSize={{ ...GridSize, inputGridSize: 12 }}
              {...inputFieldCommonParams}
            ></CustomAutoComplete>
            <Col xs={24}>
              <Typography
                style={{
                  font: `normal normal 600 13px ${FontFamily}`,
                  marginBottom: '5px',
                  color: ThemeData.textColor,
                }}
              >
                {' '}
                Scanned Copy of Physically Signed Letter With Date
                <span style={{ color: 'red' }}> *</span>
              </Typography>
              <Dragger
                {...props}
                fileList={fileList}
                className='antUploadFromAddResReq'
                beforeUpload={async (file) => {
                  const isPdf =
                    file.type === 'application/pdf' ||
                    file.type === 'application/msword' ||
                    file.type === 'application/vnd.oasis.opendocument.text' ||
                    file.type?.includes('text/plain') ||
                    file.type ===
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                  if (!isPdf) {
                    ToastMessage('error', 'File Type is not supported!')
                  } else {
                    return false
                  }
                  return isPdf || Upload.LIST_IGNORE
                }}
              >
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>Click or drag file to this area to upload</p>
              </Dragger>
            </Col>
          </Row>
        </form>
      </CustomModal>
      {isFileModalOpened && (
        <div className={`pdfContainer `}>
          <DocumentViewModal
            isFileModalOpened={isFileModalOpened}
            handleCancelModal={() => {
              setIsFileModalOpened(false)
              setFilePreviewDetails()
              setIsFileLoading(false)
              setIsPdfViewMaximized(false)
            }}
            isFileLoading={isFileLoading}
            previewFileName={'Resignation Or Termination Letter'}
            isPdfViewMaximized={isPdfViewMaximized}
            filePreviewDetails={filePreviewDetails}
          ></DocumentViewModal>
        </div>
      )}
    </>
  )
}
export default React.memo(AddResignationRequest)
