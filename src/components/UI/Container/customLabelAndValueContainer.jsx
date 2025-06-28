/* eslint-disable react/prop-types */
import { Col, Row, Typography } from 'antd'
import { FontFamily, ThemeData } from '../../../utils/util.jsx'
import React from 'react'

const CustomLabelAndValueContainer = ({
  title,
  value,
  gridSize = {
    childrenGridSize: 14,
    inputGridSize: 12,
    titleGridSize: 10,
    lgTitleGridSize: 4,
    lgInputGridSize: 12,
  },
  isVerticalItem,
  isFirstItem,
  style,
  identifier,
  isWithEllipsis,

  valueStyle,
  handleOnClick,
}) => {
  return (
    <Col
      xs={24}
      md={gridSize?.inputGridSize}
      style={{
        marginTop: isVerticalItem && isFirstItem ? '11px' : '0px!important',
        paddingTop: isVerticalItem ? '0rem' : '0.2rem',
        ...style,
      }}
      key={identifier || title}
    >
      <Row gutter={[10, 5]}>
        <Col
          xs={isVerticalItem ? 24 : gridSize?.titleGridSize ? gridSize?.titleGridSize : 10}
          md={isVerticalItem ? 24 : gridSize?.titleGridSize ? gridSize?.titleGridSize : 8}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            addingTop: isVerticalItem ? '0px!important' : 1,
          }}
        >
          <Typography
            style={{
              font: `normal normal 700 11px ${FontFamily}`,
              fontWeight: '700!important',
              color:'#000',
              marginTop: '0px',
              paddingTop: isVerticalItem ? '0px!important' : '',
            }}
          >
            {title}
          </Typography>
        </Col>
        <Col
          xs={isVerticalItem ? 24 : gridSize?.titleGridSize ? 24 - gridSize?.titleGridSize : 14}
          md={isVerticalItem ? 24 : gridSize?.titleGridSize ? 24 - gridSize?.titleGridSize : 16}
          style={{ marginTop: '1px' }}
        >
          <Typography
            style={{
              font: `normal normal normal 11px ${FontFamily}`,
              color: '#000',
              marginTop: '0px',
              fontWeight:400,
              cursor: typeof handleOnClick === 'function' ? 'pointer' : '',
              ...valueStyle,
            }}
            className={isWithEllipsis ? 'ellipsisItemText' : ''}
            onClick={() => {
              if (typeof handleOnClick === 'function') {
                handleOnClick()
              }
            }}
            title={typeof value != 'object' ? value : '-'}
          >
            {value}
          </Typography>
        </Col>
      </Row>
    </Col>
  )
}
export default React.memo(CustomLabelAndValueContainer)
