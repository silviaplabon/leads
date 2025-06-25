/* eslint-disable react/prop-types */
import { Modal, Spin, Typography } from 'antd'
import { RxCross2Icon } from '../../utils/svgIcons'
import MuiButton from './CustomButton.jsx'
import { FontFamily, ThemeData } from '../../utils/util.jsx'

const CustomModal = ({
  isApiExecuting,
  pageLoader,
  typeOfModalExecution,
  cancelModalFnc,
  customHeaderButtons,
  handleAddOrEdit,
  isModalOpen,
  title,
  children,
  okButtonText,
  cancelButtonText,
  hideFooterButton,
  zIndex,
  containerStyle,
  contentStyle,
  modalWidth,
  disabled,
  className,
  modalHeaderIcon,
  modalHeight,
}) => {
  return (
    <Modal
      title=''
      open={isModalOpen}
      onOk={() => {
        if (typeof handleAddOrEdit === 'function') {
          handleAddOrEdit()
        }
      }}
      onCancel={cancelModalFnc}
      okText={typeOfModalExecution === 'Edit' ? 'Save' : okButtonText ? okButtonText : 'Add'}
      footer={null}
      // loading={pageLoader}
      zIndex={zIndex}
      okButtonProps={{
        style: {
          background: ThemeData?.secondary,
          color: 'white',
          marginRight: '1.4rem',
        },

        disabled: isApiExecuting,
        loading: isApiExecuting,
      }}
      cancelButtonProps={{
        style: {
          borderColor: '',
          color: 'white',
          marginBottom: '1rem',
        },
      }}
      width={modalWidth}
      className={className}
      style={{ maxHeight: '90vh', ...containerStyle }}
    >
      <>
        <div
          className='dashboardModal'
          style={{
            padding: '0px',
          }}
        >
          <div
            className='header'
            style={{
              color: '#fff',
              padding: '6px 2px',
              paddingRight: '5px',
              borderRadius: '9px',
              borderBottomLeftRadius: '0',
              borderBottomRightRadius: '0',
              height: '1.8rem',
              display: 'flex',
              backgroundColor: '#eff1f3',
              margin: '4px',
              alignItems: 'center',
            }}
          >
            {/* Title */}
            {modalHeaderIcon && <div style={{ marginRight: '0.5rem' }}>{modalHeaderIcon}</div>}
            <Typography
              style={{
                font: `normal normal 600 17px  ${FontFamily}`,
                color: '#003366',
              }}
            >
              {title}
            </Typography>

            <div
              style={{
                flexGrow: 1,
                margin: '0 0.5rem',
                color: ThemeData.primary,
                borderBottom: `1.5px solid ${ThemeData.primary}`,
              }}
            ></div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              {customHeaderButtons}
              <div
                onClick={() => cancelModalFnc()}
                className='crossIconContainer'
                style={{ cursor: 'pointer', marginRight: '1rem' }}
              >
                {RxCross2Icon({
                  height: '16px',
                  width: '16px',
                  color: 'currentColor',
                })}
              </div>
            </div>
          </div>

          {pageLoader ? (
            <div
              className='loaderContainer'
              style={{
                width: modalWidth,
                height: '50vh',
              }}
            >
              <Spin></Spin>
            </div>
          ) : (
            <div
              style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: '85vh',
                minHeight: modalHeight || '35vh',
                ...contentStyle,
              }}
            >
              <div
                style={{
                  padding: !hideFooterButton ? '0px' : '0px',
                  color: 'black',
                }}
              >
                {children}
              </div>
              <div
                style={{
                  padding: '20px',
                  display: hideFooterButton ? 'none' : 'flex',
                  justifyContent: 'flex-end',
                  overflow: 'auto',
                }}
              >
                <MuiButton
                  buttonType='submit'
                  handleButtonClick={() => {
                    if (typeof cancelModalFnc === 'function') {
                      cancelModalFnc()
                    }
                  }}
                  title={cancelButtonText ? cancelButtonText : 'Cancel'}
                  style={{
                    borderRadius: '6px',
                  }}
                ></MuiButton>

                <MuiButton
                  buttonType='submit'
                  handleButtonClick={() => {
                    if (typeof handleAddOrEdit === 'function') {
                      handleAddOrEdit()
                    }
                  }}
                  disabled={disabled}
                  showLoader={isApiExecuting}
                  style={{
                    backgroundColor: '#34457e',
                    marginLeft: '0.5rem',
                    borderRadius: '6px',
                    color: '#fff',
                    boxShadow: '0 -1px 5px #ffffffb2,0 1px 5px rgba(94,104,121,.945)',
                  }}
                  title={
                    typeOfModalExecution === 'Edit' ? 'Save' : okButtonText ? okButtonText : 'Add'
                  }
                ></MuiButton>
              </div>
            </div>
          )}
        </div>
      </>
    </Modal>
  )
}
export default CustomModal
