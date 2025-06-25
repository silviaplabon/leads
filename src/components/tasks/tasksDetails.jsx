/* eslint-disable react/prop-types */
import { Col, Row, Steps, Typography } from 'antd'
import { FormatDate, TaskFields, TaskNameShortcut, ThemeData } from '../../utils/util'
import '../../styles/requestDetails.css'
import '../../styles/antSteps.css'
import CustomLabelAndValueContainer from '../UI/Container/customLabelAndValueContainer'
import { useEffect, useRef, useState } from 'react'
import CustomTooltip from '../UI/customTooltip'

const TasksDetails = ({ tasks }) => {
  const gridSize = {
    childrenGridSize: 14,
    inputGridSize: 12,
    titleGridSize: 7,
    lgTitleGridSize: 4,
    lgInputGridSize: 12,
  }
  const [taskItemHeight, setTaskItemHeight] = useState('')
  const taskItemRef = useRef()
  const updateHeight = () => {
    if (taskItemRef.current) {
      const height = taskItemRef.current.offsetHeight
      setTaskItemHeight(height)
    }
  }

  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [tasks])

  return (
    <Col
      xs={24}
      className='task-list-container'
      style={{
        marginBottom: '0.4rem',
        marginTop: '1rem',
        paddingRight: '1.5rem',
      }}
    >
      <div style={{ position: 'relative' }}>
        {taskItemHeight && (
          <div
            className='custom-vertical-line'
            style={{
              height:
                tasks?.length == 2
                  ? taskItemHeight * tasks.length - 70
                  : tasks?.length < 2
                    ? 0
                    : taskItemHeight * tasks.length - 50,
              zIndex: 2,
            }}
          ></div>
        )}
        {tasks && (
          <Steps
            labelPlacement='horizontal'
            current={100}
            items={tasks?.map((task, index) => ({
              title: <Typography></Typography>,
              description: (
                <div
                  key={index}
                  style={{ marginBottom: '0.5rem' }}
                  className='task-item'
                  ref={index === 0 ? taskItemRef : null}
                >
                  <Row gutter={[15, 2]}>
                    {TaskFields?.map((item, index) => (
                      <CustomLabelAndValueContainer
                        title={item?.name}
                        key={index}
                        gridSize={gridSize}
                        isWithEllipsis={true}
                        value={
                          task
                            ? item?.key
                              ? item?.formatType === 'Date'
                                ? FormatDate(task[item?.key], 'DateTime')
                                : task[item?.key]
                                  ? task[item?.key]
                                  : '-'
                              : '-'
                            : '-'
                        }
                      />
                    ))}
                  </Row>
                </div>
              ),
              icon: (
                <CustomTooltip title={task?.taskName}>
                  <div
                    style={{
                      marginBlockStart: taskItemHeight ? taskItemHeight / 2 - 15 : 10,
                      backgroundColor: ThemeData.textColor,
                      borderRadius: '20px',
                      width: '25px',
                      height: '25px',
                      padding: '2px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: '10px',
                        color: '#ffffff',
                        height: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        zIndex: 5,
                      }}
                    >
                      {TaskNameShortcut[task?.taskName]}
                    </Typography>
                  </div>
                </CustomTooltip>
              ),
            }))}
            direction='vertical'
          />
        )}
      </div>
    </Col>
  )
}
export default TasksDetails
