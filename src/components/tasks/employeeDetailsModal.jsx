/* eslint-disable react/prop-types */
import { Row } from 'antd'
import CustomModal from '../UI/customModal'
import CustomLabelAndValueContainer from '../UI/Container/customLabelAndValueContainer'
import { employeeNonEditableReqFields, RowGutter } from '../../utils/util'

const EmployeeDetailsModal = ({
  isLoading,
  handleCancelModal,
  empDetails,
  isModalOpen,
  typeOfEmpDetailsModal,
}) => {
  const GridSize = {
    childrenGridSize: 14,
    inputGridSize: 24,
    titleGridSize: 10,
  }
  return (
    <CustomModal
      pageLoader={isLoading}
      isApiExecuting={isLoading}
      buttonType='Submit'
      cancelModalFnc={handleCancelModal}
      isModalOpen={isModalOpen}
      title={`Employee Details`}
      modalWidth={500}
      hideFooterButton
    >
      <div
        style={{
          padding: '11px 25px',
          overflow: 'auto',
          marginBottom: '0.5rem',
        }}
      >
        <Row gutter={RowGutter}>
          {employeeNonEditableReqFields?.map((item, index) =>
            typeOfEmpDetailsModal === 'Employee' ||
            (typeOfEmpDetailsModal === 'LineManager' && !item?.isHidden) ? (
              <CustomLabelAndValueContainer
                identifier={`${index}-${item?.name}-${item?.key}`}
                key={`${index}-${item?.name}-${item?.key}`}
                title={item?.name}
                isWithEllipsis={true}
                gridSize={GridSize}
                value={(empDetails && empDetails[item?.key]) || '-'}
              />
            ) : null,
          )}
        </Row>
      </div>
    </CustomModal>
  )
}
export default EmployeeDetailsModal
