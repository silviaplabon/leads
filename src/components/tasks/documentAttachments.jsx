/* eslint-disable react/prop-types */
import { Button, Modal, Typography, Upload } from 'antd'
import {
  DocumentCategoryForResignationProcess,
  FontFamily,
  ThemeData,
  ToastMessage,
} from '../../utils/util.jsx'
import {
  DocumentsIcon,
  FaDeleteOutlineIcon,
  FaFileViewIcon,
  FaPlusIcon,
} from '../../utils/svgIcons'
import { CommonAPI } from '../../services/common.jsx'
import { useContext, useState } from 'react'
import { KeycloackContext } from '../../Keycloak.jsx'
import { ExclamationCircleFilled, InboxOutlined } from '@ant-design/icons'
import Loader from '../UI/Loader.jsx'
import Dragger from 'antd/es/upload/Dragger.js'

import '../../styles/antUpload.css'
import CustomModal from '../UI/customModal.jsx'
import CustomTooltip from '../UI/customTooltip.jsx'
import { useSelector } from 'react-redux'

const DocumentAttachment = ({
  attachments,
  title,
  openFile,
  reqDetails,
  setReqDetails,
  setAttachments,
  setIsFileLoading,
  fileRes,
  setFileRes,
  fileList,
  setFileList,
  isFileLoading,
  handleRefreshData,
  isActionPermitted,
}) => {
  const { getToken, username } = useContext(KeycloackContext)
  const [deleteAttachmentDetail, setDeleteAttachmentDetail] = useState()
  const [isUploadAttachmentModalOpened, setisUploadAttachmentModalOpened] = useState()
  const [isApiExecuting, setIsApiExecuting] = useState(false)
  const userType = useSelector((state) => state.user.userType)

  const handleDeleteFile = async (item) => {
    setIsFileLoading(true)
    setDeleteAttachmentDetail(item)
    const token = await getToken().then((newToken) => newToken)

    const deleteFileRes = await CommonAPI.getPageData(
      token,
      `epm/hr/rg/documents/${item?.documentId}/attachments?attachmentId=${item?.attachmentId}`,
      'DELETE',
    )
    setIsFileLoading(false)
    const updatedUploadFileRes = attachments?.filter(
      (fileData) => fileData?.attachmentId !== item?.attachmentId,
    )

    const updatedDocuments = []
    for (let i = 0; i < reqDetails?.documents?.length; i++) {
      if (reqDetails?.documents[i]) {
        if (item?.documentId === reqDetails?.documents[i]?.documentId) {
          const filteredAttachments = reqDetails?.documents[i]?.attachments?.filter(
            (filItem) => filItem?.attachmentId !== item?.attachmentId,
          )
          if (filteredAttachments?.length > 0) {
            updatedDocuments.push({
              ...reqDetails.documents[i],
              attachments: filteredAttachments || [],
            })
          }
        } else {
          updatedDocuments.push(reqDetails.documents[i])
        }
      }
    }
    setReqDetails({ ...reqDetails, documents: updatedDocuments || [] })

    setAttachments(updatedUploadFileRes)
    setDeleteAttachmentDetail()
    if (!deleteFileRes.isError) {
      ToastMessage('success', 'Attachment Deleted Successfully')
    }
  }
  const openLocalFile = async (fileData) => {
    if (fileData?.name) {
      openFile(fileData, true)
    } else {
      ToastMessage('error', 'Something Went Wrong')
    }
  }

  const UploadAttachments = async () => {
    const token = await getToken().then((newToken) => newToken)
    const documentCategoryRes = reqDetails?.documents?.filter(
      (item) => item.documentCategory == DocumentCategoryForResignationProcess,
    )
    const updatedFileRes = []
    const documentId =
      documentCategoryRes?.length > 0
        ? documentCategoryRes[0]?.attachments?.length > 0
          ? documentCategoryRes[0]?.documentId
          : undefined
        : undefined

    Object.keys(fileRes)?.map((itemKey, index) => {
      const item = fileRes[itemKey]
      updatedFileRes.push({
        key: index,
        mimeType: item?.mimeType,
        originalFileName:
          fileRes[itemKey]?.originalFileName || `${DocumentCategoryForResignationProcess}.pdf`,
        bucketName: item?.bucketName,
        fileName: item?.fileName,
        documentUrl: item?.url,
      })
    })
    const uploadedDocumentReq = {
      requestId: reqDetails?.requestId,
      documentCategory: DocumentCategoryForResignationProcess,
      personId: reqDetails?.personId,
      updatedBy: username,
      attachments: updatedFileRes,
      documentId: documentId,
    }
    const notAddedFileList = []
    const updatedResList = []
    for (let i = 0; i < fileList?.length; i++) {
      if (!fileRes[fileList[i].uid]) {
        updatedResList[fileList[i].uid] = fileRes[fileList[i].uid]
        notAddedFileList.push(fileList[i])
      }
    }

    if (updatedFileRes?.length > 0) {
      setIsApiExecuting(true)
      const docRes = await CommonAPI.getPageData(
        token,
        `epm/hr/rg/requests/${reqDetails?.requestId}/documents`,
        'POST',
        uploadedDocumentReq,
      )
      setIsApiExecuting(false)
      if (!docRes?.isError) {
        setFileRes(updatedResList)
        setFileList(notAddedFileList || [])
        ToastMessage('success', 'Documents Added Successfully')
        handleRefreshData(true)
      } else {
        setFileRes({})
      }
    }
  }

  const uploadResignationLetter = async (fileDetails) => {
    try {
      const token = await getToken().then((newToken) => newToken)

      const uploadRes = await CommonAPI.uploadFile(
        token,
        fileDetails.originFileObj,
        fileDetails?.name,
      )
      return uploadRes
    } catch (e) {
      ToastMessage('error', e.message)
    }
  }

  const hrHodCmiFileProps = {
    name: 'file',
    multiple: true,
    customRequest: () => {},
    onRemove() {},
    action: ' ',
    onChange: async (info) => {
      setIsFileLoading(true)
      const { file, fileList } = info
      const lastIndexFile = fileList[fileList?.length - 1]
      const fileWithoutCurrentFile = fileList?.filter((curFile) => curFile?.uid != file.uid)
      const newFileNotUploadedList = []
      const allFileList = []
      fileList?.map((item) => {
        if (!fileRes[item.uid]) {
          newFileNotUploadedList.push(item)
          allFileList.push({ ...item, status: 'uploading' })
        } else {
          allFileList.push(item)
        }
      })

      if (fileWithoutCurrentFile?.length == fileList?.length) {
        if (fileRes[file?.uid]) {
          delete fileRes[file.uid]
          setFileRes(fileRes)
        }
        const updatedFileList = fileList ? [...fileList] : []
        setFileList(updatedFileList)
        setIsFileLoading(false)
      } else if (newFileNotUploadedList?.length > 0) {
        setFileList(allFileList)

        if (file.uid == lastIndexFile?.uid) {
          const uploadPromises = newFileNotUploadedList.map(async (file) => {
            const uploadRes = await uploadResignationLetter(file)
            return {
              ...uploadRes.data,
              uid: file.uid,
              status: uploadRes.isUploaded ? 'done' : 'error',
            }
          })

          await Promise.all(uploadPromises)
            .then((uploadedFiles) => {
              const updatedFileRes = { ...fileRes }
              uploadedFiles.forEach((file) => {
                updatedFileRes[file.uid] = file
              })
              const newFileList = []
              allFileList?.map((item) => {
                if (item?.status === 'uploading') {
                  newFileList.push({
                    ...item,
                    status: updatedFileRes[item.uid]?.status,
                  })
                } else {
                  newFileList.push(item)
                }
              })
              setFileList(newFileList)

              setFileRes(updatedFileRes)
            })
            .catch((error) => {
              // console.error("Error uploading files:", error);
              ToastMessage('error', error.message)
            })
        }
        setIsFileLoading(false)
      }
    },
    itemRender: (originNode, file) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {file?.status === 'uploading' ? (
            <Loader loaderType={'button'}></Loader>
          ) : (
            <>
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
                  onClick={() => openLocalFile(file)}
                >
                  {FaFileViewIcon({
                    width: '17px',
                    height: '17px',
                    color: '#000',
                  })}
                </div>
              </CustomTooltip>
            </>
          )}
          <div style={{ width: '95%' }}>{originNode}</div>
        </div>
      )
    },
    onDrop() {},
  }

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {DocumentsIcon({ color: ThemeData.primary })}
          <Typography
            style={{
              font: `normal normal 600 16px ${FontFamily}`,
              margin: '0rem 0.5rem',
              color: ThemeData.primary,
            }}
          >
            Documents
          </Typography>
        </div>

        {isActionPermitted && (
          <Button
            onClick={() => {
              setisUploadAttachmentModalOpened(true)
            }}
            style={{
              backgroundColor: '#34457e',
              marginLeft: '0.5rem',
              color: '#fff',
              gap: '10px',
              padding: '5px 10px',
              borderRadius: '5px',
              marginTop: '0px',
              marginRight: '5px',
            }}
            icon={FaPlusIcon({ color: '#fff' })}
            title={''}
          ></Button>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.9rem', paddingRight: '1rem' }}>
        {attachments?.map((attachmentItem, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              padding: '5px 10px',
              borderRadius: '5px',
              marginTop: '5px',
              marginRight: '5px',
              border: `1px dashed ${ThemeData.primary}`,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {/* File Name */}
            <Typography
              style={{
                font: `normal normal 400 12px ${FontFamily}`,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              title={
                title === 'Resignation Document'
                  ? 'Resignation Or Termination Letter.pdf'
                  : attachmentItem?.originalFileName
              }
            >
              {title === 'Resignation Document'
                ? 'Resignation Or Termination Letter.pdf'
                : attachmentItem?.originalFileName?.split(0, 30)}
            </Typography>

            {/* Action Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {isFileLoading &&
              deleteAttachmentDetail?.attachmentId === attachmentItem?.attachmentId ? (
                <Loader loaderType='button'></Loader>
              ) : (
                <>
                  <CustomTooltip title='Document Preview'>
                    <div
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={() => {
                        openFile(attachmentItem)
                      }}
                    >
                      {FaFileViewIcon({
                        width: '17px',
                        height: '17px',
                        color: '#000',
                      })}
                    </div>
                  </CustomTooltip>
                  {!attachmentItem?.isUserDoc &&
                    (attachmentItem?.updatedBy === username || userType === 'HR') && (
                      <CustomTooltip title='Delete Document'>
                        <div
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={() => {
                            Modal.confirm({
                              title: `Are you sure you want to delete this attachment?`,
                              icon: <ExclamationCircleFilled />,
                              okText: 'Yes',
                              cancelText: 'No',
                              onOk() {
                                handleDeleteFile(attachmentItem)
                              },
                              onCancel() {},
                            })
                          }}
                        >
                          {FaDeleteOutlineIcon({
                            width: '16px',
                            height: '16px',
                            color: '#FF0000',
                          })}
                        </div>
                      </CustomTooltip>
                    )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <CustomModal
        isApiExecuting={isFileLoading}
        pageLoader={isApiExecuting}
        typeOfModalExecution={'Add'}
        buttonType='Submit'
        cancelModalFnc={() => {
          setisUploadAttachmentModalOpened(false)
          setFileList([])
          setFileRes({})
        }}
        handleAddOrEdit={() => {
          if (Object.keys(fileRes)?.length > 0) {
            UploadAttachments()
          }
        }}
        isModalOpen={isUploadAttachmentModalOpened}
        title={'Upload Attachment'}
        modalWidth={600}
        okButtonText={'Save'}
        modalHeaderIcon={DocumentsIcon({ color: ThemeData.textColor })}
      >
        <div style={{ padding: '11px 25px', minWidth: '400px' }}>
          <div className='fileUploadTask'>
            <Dragger
              {...hrHodCmiFileProps}
              fileList={fileList}
              beforeUpload={async (file) => {
                const isPdf =
                  file.type === 'application/pdf' ||
                  file.type === 'application/msword' ||
                  file.type === 'application/vnd.oasis.opendocument.text' ||
                  file.type?.includes('text/plain') ||
                  file.type ===
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

                if (!isPdf) {
                  ToastMessage('error', 'File Type is not Supported')
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
          </div>
        </div>
      </CustomModal>
    </div>
  )
}
export default DocumentAttachment
