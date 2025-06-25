/* eslint-disable react/prop-types */
import { Badge, Button, Modal, Tooltip } from 'antd'
import { ThemeData } from '../../utils/util.jsx'
import { FaFilterCircleXmarkIcon } from '../../utils/svgIcons'
import { ExclamationCircleFilled } from '@ant-design/icons'
import React from 'react'
const ResetFilter = ({ filterCount, handleConfirm, style }) => {
  const handleResetConfirm = () => {
    Modal.confirm({
      title: `Are you sure you want to reset filters?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        handleConfirm()
      },
      onCancel() {},
    })
  }
  return (
    <>
      <Tooltip
        placement='top'
        title='Reset filters'
        color={ThemeData.primary}
        styles={{ body: { fontSize: 12, minHeight: 10, padding: '10' } }}
      >
        <Badge color={ThemeData.primary} size='small' count={filterCount} offset={[-23, 2]}>
          <Button
            className=''
            onClick={handleResetConfirm}
            style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '0.5rem',
              ...style,
            }}
          >
            {FaFilterCircleXmarkIcon()}
          </Button>
        </Badge>
      </Tooltip>
    </>
  )
}
export default React.memo(ResetFilter)
