/* eslint-disable react/prop-types */
import CustomInput from '../Input/customInput.jsx'
import dayjs from 'dayjs'
import CustomAutoComplete from '../Input/customAutoComplete.jsx'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

const HeaderColumn = ({
  title,
  name,
  getLovData,
  filterObj,
  handleFilter,
  handleSorting,
  sortObj,
  typeOfFilter = 'Text',
  minWidth,
  isFilterItemsVisible,
  hideFilterIcon = false,
  maxWidth,
  activeGroup = [],
  userType = '',
  isMyTasks,
}) => {
  const GridSize = {
    childrenGridSize: 24,
    inputGridSize: 24,
    titleGridSize: 24,
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      id={name ? name : ''}
      key={name ? `${name}headerColumn` : ''}
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
        className='dashboardHeaders'
      >
        <span
          className='customTableText customTableHeader'
          title={title}
          style={{
            cursor: 'pointer',
            color: '#000',
            paddingLeft: 2,
            display: 'flex',
          }}
        >
          {title}
        </span>{' '}
        <div style={{ display: 'flex' }}>
          {typeof handleSorting === 'function' && (
            <Button
              title={
                sortObj[name] === 'D' ? 'Descending' : sortObj[name] === 'A' ? 'Ascending' : 'Sort'
              }
              type='text'
              onClick={() => handleSorting(name)}
            >
              <FontAwesomeIcon
                icon={
                  sortObj[name] === 'D' ? faSortDown : sortObj[name] === 'A' ? faSortUp : faSort
                }
                fontSize={14}
              />
            </Button>
          )}
          {/* {!hideFilterIcon && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "0.1rem",
                height: "20px",
              }}
              onClick={() => {
                setIsFIlterItemsVisible(!isFilterItemsVisible);
              }}
            >
              {IOFilterIcon({
                height: 14,
                width: 12,
                color: "#ffffff",
              })}
            </span>
          )} */}
        </div>
      </div>
      {isFilterItemsVisible && !hideFilterIcon && (
        <div
          style={{
            width: '100%',
            maxWidth: maxWidth ? maxWidth : '200px',
            marginTop: '0',
          }}
        >
          {typeOfFilter === 'Text' || typeOfFilter === 'Number' ? (
            <CustomInput
              inputType={'Text'}
              isWithController={false}
              typeOfInput={typeOfFilter === 'Number' ? 'number' : 'text'}
              labelName=''
              name='value'
              isRequired={false}
              isFilterItem={true}
              isEditable={true}
              value={filterObj ? (filterObj[`${name}`] ? filterObj[`${name}`] : '') : ''}
              placeholderText=''
              gridSize={GridSize}
              handleOnChange={(value, isEntered) => {
                if (typeof handleFilter === 'function') {
                  handleFilter(typeOfFilter, name, value, isEntered)
                }
              }}
              hideErrorMessageContainer={true}
            ></CustomInput>
          ) : typeOfFilter === 'Date' ? (
            <CustomInput
              labelName=''
              name='value'
              errorText={'Policy Start Date must have some values'}
              dateFormat='DD-MM-YYYY'
              isRequired={false}
              isRangePicker={true}
              gridSize={GridSize}
              inputType={'Date'}
              value={
                filterObj
                  ? filterObj[`${name}`]
                    ? filterObj[`${name}`]?.length > 1
                      ? [dayjs(filterObj[`${name}`][0]), dayjs(filterObj[`${name}`][1])]
                      : null
                    : null
                  : null
              }
              hideErrorMessageContainer={true}
              handleOnChange={(value, isEntered) => {
                if (typeof handleFilter === 'function') {
                  handleFilter(typeOfFilter, name, value, isEntered)
                }
              }}
              isFilterItem={true}
            ></CustomInput>
          ) : (
            typeOfFilter === 'SelectDropdown' && (
              <CustomAutoComplete
                isCharacterLimitedSearch={false}
                getLovData={() => {
                  if (typeof getLovData === 'function') {
                    return getLovData(name, activeGroup, userType, isMyTasks)
                  } else {
                    return []
                  }
                }}
                minWidth={minWidth}
                placeholderText=''
                handleSelection={(value, val2) => {
                  if (typeof handleFilter === 'function') {
                    handleFilter(typeOfFilter, name, val2, true)
                  }
                }}
                isWithController={false}
                handleOnSearch=''
                value={filterObj ? (filterObj[`${name}`] ? filterObj[`${name}`]['label'] : '') : ''}
                hideErrorMessageContainer={true}
                gridSize={GridSize}
                isFilterItem={true}
              ></CustomAutoComplete>
            )
          )}
        </div>
      )}
      {isFilterItemsVisible && hideFilterIcon && (
        <div style={{ height: '25px', marginTop: '0.2rem' }}></div>
      )}
    </div>
  )
}

export default React.memo(HeaderColumn)
