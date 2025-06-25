/* eslint-disable react/prop-types */
import { Col, Row, Typography } from 'antd'
import { FontFamily, ThemeData } from '../../../utils/util.jsx'
import React from 'react'
const CustomInputFieldContainer = ({
  title,
  isMandatory,
  children,
  isHorizontalInput = false,
  style,
  gridSize,
}) => {
  return (
    <>
      <Col
        xs={24}
        md={gridSize?.inputGridSize}
        style={{
          paddingY: '0px!important',
          marginBottom: '0px!important',
        }}
      >
        <Row>
          {' '}
          <Col xs={gridSize?.titleGridSize}>
            {title && (
              <Typography
                style={{
                  marginRight: '0.5rem',
                  font: isHorizontalInput
                    ? `normal normal 600 13px  ${FontFamily}`
                    : `normal normal 500 13px ${FontFamily}`,
                  color: ThemeData.textColor,

                  marginBottom: isHorizontalInput ? '15px' : '5px',
                  height: '0.8rem',
                  ...style,
                }}
                className='labelText'
              >
                {title}
                {isMandatory && <span style={{ color: 'red' }}> *</span>}
              </Typography>
            )}
          </Col>
          <Col
            xs={
              gridSize?.childrenGridSize ? gridSize?.childrenGridSize : 24 - gridSize?.titleGridSize
            }
          >
            {children}
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default React.memo(CustomInputFieldContainer)
