/* eslint-disable react/prop-types */
import { Spin } from 'antd'
import AntResult from './UI/AntResult.jsx'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import React, { useEffect, useState } from 'react'
import '../styles/antUpload.css'
import { ThemeData } from '../utils/util.jsx'
import { DocumentsIcon } from '../utils/svgIcons.jsx'
import CustomModal from './UI/customModal.jsx'

const MyNoRenderer = ({ document, fileName }) => {
  const fileText = fileName || document?.fileType || ''

  if (fileText) {
    return <div>No Renderer Error! ({fileText})</div>
  }

  return <div>No Renderer Error!</div>
}

const DocumentViewModal = ({
  isFileLoading,
  filePreviewDetails,
  isPdfViewMaximized,
  handleCancelModal,
  isFileModalOpened,
}) => {
  const [filePreviewUrl, setFilePreviewUrl] = useState()
  useEffect(() => {
    if (filePreviewDetails) {
      setFilePreviewUrl(filePreviewDetails?.documentUrl)
    }
  }, [filePreviewDetails])
  return (
    <CustomModal
      isApiExecuting={false}
      pageLoader={false}
      typeOfModalExecution={''}
      buttonType=''
      cancelModalFnc={() => {
        handleCancelModal()
      }}
      isModalOpen={isFileModalOpened}
      title={'Document Preview'}
      modalHeaderIcon={DocumentsIcon({
        color: ThemeData.primary,
        height: '17px',
        width: '17px',
      })}
      hideFooterButton={true}
      className={'maximizedPdfModal'}
    >
      <div
        className='reactPdfContainer'
        style={{
          width: '100%',
          height: isFileLoading
            ? '50vh'
            : !filePreviewUrl
              ? '20vh'
              : isPdfViewMaximized
                ? '85vh'
                : '70vh',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {isFileLoading ? (
            <div
              className='loaderContainer'
              style={{
                height: '50vh',
              }}
            >
              <Spin tip='Loading preview...' size='large' style={{}} />
            </div>
          ) : (
            <>
              {filePreviewUrl ? (
                <DocViewer
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  pluginRenderers={DocViewerRenderers}
                  config={{
                    header: { disableHeader: true },
                    csvDelimiter: ',',
                    pdfZoom: {
                      defaultZoom: 0.85,
                      zoomJump: 0.2,
                    },
                    noRenderer: {
                      overrideComponent: MyNoRenderer,
                    },
                    language: 'en',
                    pdfVerticalScrollByDefault: true,
                  }}
                  documents={[
                    {
                      uri: filePreviewUrl,
                      fileName: filePreviewDetails?.fileName || 'Resignation Or Termination Letter',
                      fileType: filePreviewDetails?.fileType,
                    },
                  ]}
                />
              ) : (
                <AntResult typeOfResult={'datanotexist'} imageHeight={50}></AntResult>
              )}
            </>
          )}
        </div>
      </div>
    </CustomModal>
  )
}

export default React.memo(DocumentViewModal)
