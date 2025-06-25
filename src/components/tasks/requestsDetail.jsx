import { Row } from 'antd'
import CustomModal from '../UI/customModal'
import {
  employeeNonEditableReqFields,
  FormatDate,
  RowGutter,
  userReqFields,
} from '../../utils/util'
import CustomLabelAndValueContainer from '../UI/Container/customLabelAndValueContainer'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../styles/requestDetails.css'
import TasksDetails from './tasksDetails'
import SkeletonContainer from '../skeletonContainer'

/* eslint-disable react/prop-types */
const RequestsDetails = ({
  isLoading,
  handleCancelModal,
  isModalOpen,
  reqDetails,
  logs,
  isTasksLoading,
}) => {
  // const userType = useSelector((state) => state.user.userType);
  const GridSize = {
    childrenGridSize: 12,
    inputGridSize: 12,
    titleGridSize: 12,
  }

  return (
    <CustomModal
      pageLoader={isLoading}
      isApiExecuting={isLoading}
      buttonType='Submit'
      cancelModalFnc={handleCancelModal}
      isModalOpen={isModalOpen}
      title={`Request Details ${reqDetails?.requestId ? `#${reqDetails?.requestId}` : ''}`}
      modalWidth={1000}
      hideFooterButton
      modalHeaderIcon={<FontAwesomeIcon icon={faNoteSticky} fontSize={14} color='#2b3a67' />}
    >
      <div
        style={{
          padding: '11px 25px',
          overflow: 'auto',
          marginBottom: '0.5rem',
          maxWidth:'900px'
        }}
      >
        <Row gutter={RowGutter}>
          {!isLoading &&
            [
              ...employeeNonEditableReqFields,

              {
                name: 'Notice Period (Days)',
                key: 'noticePeriod',
                isForReq: true,
                isNotForUser: true,
              },
              ...userReqFields,
            ]?.map((item, index) => (
              <CustomLabelAndValueContainer
                identifier={`${index}-${item?.name}-${item?.key}`}
                key={`${index}-${item?.name}-${item?.key}`}
                title={item?.name}
                gridSize={GridSize}
                isWithEllipsis={true}
                value={
                  item?.key && reqDetails
                    ? reqDetails[item?.key]
                      ? item?.formatType === 'Date'
                        ? FormatDate(reqDetails[item?.key], item?.formatType)
                        : item?.key === 'lwdEmailTrig'
                          ? reqDetails[item?.key] === 'Y'
                            ? 'Yes'
                            : 'No'
                          : reqDetails[item?.key]
                      : '-'
                    : '-'
                }
              />
            ))}
          {isTasksLoading ? (
            <SkeletonContainer count={2} skeletonType={'tasks'}></SkeletonContainer>
          ) : !logs ? (
            <></>
          ) : (
            <TasksDetails tasks={logs}></TasksDetails>
          )}
        </Row>
      </div>
    </CustomModal>
  )
}
export default RequestsDetails
