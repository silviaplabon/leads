import React from 'react'
import { FormatDate } from '../../../utils/util.jsx'

/* eslint-disable react/prop-types */
const TableCellValue = ({ isLink, index, value, onClick, formatType, style, isNavigateLink }) => {
  const formattedValue = value
    ? formatType?.includes('Date')
      ? FormatDate(value, formatType,true)
      : value
    : '-'

  return (
    <div
      className={`ellipsisItemText ${isLink ? 'customTableLink' : 'customTableText'} ${
        isNavigateLink ? 'customTableNavigateLink' : ''
      }`}
      onClick={isLink ? onClick : undefined}
      key={index}
      title={formattedValue}
      
      style={{ ...style, textDecoration: isNavigateLink ? 'underline' : '' }}
    >
      {formattedValue}
    </div>
  )
}

export default React.memo(TableCellValue)
