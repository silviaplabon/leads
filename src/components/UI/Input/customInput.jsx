/* eslint-disable react/prop-types */
import { Checkbox, ConfigProvider, DatePicker, Input, Radio, Typography } from 'antd'
import { Controller } from 'react-hook-form'
import CustomInputFieldContainer from '../Container/customInputFieldContainer.jsx'
import { FontFamily, ThemeData } from '../../../utils/util.jsx'
import React from 'react'

const RenderCustomInput = (props) => {
  const {
    field,
    showTime,
    name,
    isEditable,
    typeOfInput = 'text',
    placeholderText = '',
    handleOnChange,
    addonBefore,
    dateFormat = 'DD-MMM-YYYY',
    inputType,
    labelName = '',
    rows,
    maxLength,
    isFilterItem,
    setValue,
    handleSelection,
    lov,
    codeKey,
    isRangePicker = false,
    isWithController,
    value,
    popoverClassName,
    addonAfter,
    handleOnBlur,
    minRows,
    maxRows,
  } = props
  const { RangePicker } = DatePicker
  return (
    <>
      {/* DATE PICKER */}
      {inputType === 'Date' &&
        (isRangePicker ? (
          <RangePicker
            {...field}
            className='w-full inputText customInputDateField createDateRangePicker'
            size='small'
            showTime={showTime}
            style={{
              height: 25,
              width: '100%',
              color: isFilterItem ? '#2b3a67' : '#222222',
              font: `normal normal normal 11px ${FontFamily}`,
            }}
            placement={'bottomRight'}
            {...(!isWithController && { value: value })}
            placeholder={''}
            format={dateFormat}
            allowClear={isFilterItem}
            dropdownAlign={{ overflow: { adjustX: false, adjustY: false } }}
            onChange={(newValue) => {
              if (typeof handleOnChange === 'function') {
                handleOnChange(newValue, isFilterItem ? isFilterItem : false)
              }
            }}
            onClear={() => {
              if (!isWithController) {
                if (typeof handleOnChange === 'function') {
                  handleOnChange('', isFilterItem)
                }
              }
            }}
            getPopupContainer={(trigger) => {
              const popover = document.querySelector(`.${popoverClassName}`)

              if (popover && getComputedStyle(popover)?.display !== 'none') {
                return popover
              } else {
                return trigger.closest('.ant-popover-content') || document?.body
              }
            }}
          />
        ) : (
          <DatePicker
            {...field}
            className='w-full inputText customInputDateField createDateRangePicker'
            size='small'
            showTime={showTime}
            style={{
              height: 25,
              width: '100%',
              font: `normal normal normal 11px ${FontFamily}`,
              color: isFilterItem ? '#2b3a67' : '#222222',
            }}
            onChange={(newValue) => {
              const formattedValue = newValue ? newValue.format(dateFormat) : null
              if (isWithController) {
                if (formattedValue !== field.value) {
                  setValue(name, newValue)
                }
              }

              if (typeof handleOnChange === 'function') {
                handleOnChange(newValue)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && typeof handleOnChange === 'function' && !isWithController) {
                handleOnChange(
                  e.target.value,
                  isFilterItem ? e.key === 'Enter' && isFilterItem : false,
                )
              }
            }}
            onClear={() => {
              if (!isWithController) {
                if (typeof handleOnChange === 'function') {
                  handleOnChange('', isFilterItem)
                }
              }
            }}
            placeholder={''}
            {...(!isWithController && { value: value })}
            format={dateFormat}
            allowClear={isFilterItem}
            placement='bottomRight'
          />
        ))}
      {/* CHECKBOX */}
      {inputType === 'Checkbox' && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {lov?.map((item, index) => (
            <div
              style={{
                marginTop: '0.5rem',
                display: 'flex',
                justifyContent: 'flex-start',
                marginRight: '1rem',
              }}
              key={index}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '30px',
                }}
              >
                <Checkbox
                  style={{
                    marginTop: '0px',
                    color: isFilterItem ? '#2b3a67' : '#222222',
                  }}
                  {...field}
                  onChange={(e) => {
                    if (e.target.checked && isWithController) {
                      setValue(name, item.label)
                    }
                  }}
                  {...(!isWithController && { value: value })}
                  className='inputText'
                ></Checkbox>
              </div>
              <div>
                <Typography style={{ font: `10px ${FontFamily}` }}>{item.label}</Typography>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* INPUT FIELD */}
      {inputType === 'Text' && (
        <Input
          id={name}
          {...field}
          disabled={!isEditable}
          aria-disabled={!isEditable}
          variant='outlined'
          className='inputText'
          autoComplete='off'
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          {...(!isWithController && { value: value })}
          type={typeOfInput ? typeOfInput : 'text'}
          onChange={(e) => {
            const newValue = addonBefore ? e.target.value.split(addonBefore)?.[1] : e.target.value

            if (isWithController) {
              if (newValue !== field.value) {
                setValue(name, newValue)
              }
            }
            if (typeof handleOnChange === 'function') {
              handleOnChange(newValue, newValue === '' ? isFilterItem : false)
            }
          }}
          onBlur={() => {
            if (typeof handleOnBlur === 'function') {
              handleOnBlur()
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && typeof handleOnChange === 'function' && !isWithController) {
              handleOnChange(
                e.target.value,
                isFilterItem ? e.key === 'Enter' && isFilterItem : false,
              )
            }
          }}
          onClear={() => {
            if (!isWithController) {
              if (typeof handleOnChange === 'function') {
                handleOnChange('', isFilterItem)
              }
            }
          }}
          allowClear={isFilterItem}
          style={{
            height: 25,
            width: '100%',
            font: `normal normal normal 11px ${FontFamily}`,
            backgroundColor: 'white',
            color: isFilterItem ? '#2b3a67' : '#222222',
          }}
          placeholder={placeholderText}
          placement='bottomLeft'
        />
      )}
      {/* RADIO */}
      {inputType === 'Radio' && (
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                colorPrimary: ThemeData.primary,
                colorPrimaryBg: ThemeData.primary,
                buttonPaddingInline: '2px',
              },
            },
          }}
        >
          {' '}
          <Radio.Group
            name={labelName}
            {...field}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              height: '25px',
            }}
            // buttonCheckedBg={themeData.secondary}
            className='inputText'
            onChange={(e) => {
              if (isWithController) {
                setValue(name, e.target.value)
              }
              const filteredCaseEntities = lov?.filter(
                (lovData) => lovData.value === e.target.value,
              )
              if (filteredCaseEntities?.length > 0) {
                if (isWithController) {
                  setValue(codeKey, filteredCaseEntities[0].value)
                }
              }
              if (typeof handleSelection === 'function') {
                handleSelection(e.target.value)
              }
            }}
            {...(!isWithController && { value: value })}
          >
            {lov
              ?.filter((item) => item.label)
              ?.map((item, index) => (
                <Radio
                  value={item?.value}
                  key={`${item?.label}-${index}`}
                  name={item?.label}
                  readonly={item?.readonly}
                  disabled={item?.disabled}
                  style={{
                    font: `normal normal normal 11px ${FontFamily}`,
                    color: isFilterItem ? '#2b3a67' : '#222222',
                  }}
                >
                  {item?.label}
                </Radio>
              ))}
          </Radio.Group>
        </ConfigProvider>
      )}
      {/* TextArea */}
      {inputType === 'TextArea' && (
        <Input.TextArea
          {...field}
          onChange={(e) => {
            if (typeof handleOnChange === 'function') {
              handleOnChange(e.target.value)
            }
            if (isWithController) {
              if (e.target.value?.length < maxLength) {
                setValue(name, e.target.value)
              } else {
                setValue(name, e.target.value)
              }
            } else {
              if (typeof handleOnChange === 'function') {
                handleOnChange(e.target.value)
              }
            }
          }}
          {...(!isWithController && { value: value })}
          autoSize={{ minRows: minRows || 3, maxRows: maxRows || 5 }}
          placeholder={placeholderText}
          rows={rows}
          className='inputText'
          autoComplete='off'
          maxLength={maxLength}
          style={{
            font: `normal normal normal 11px ${FontFamily}`,
            width: '100%',
            color: isFilterItem ? '#2b3a67' : '#222222',
            // backgroundColor: themeData?.inputBgColor,
          }}
        />
      )}
    </>
  )
}

const CustomInput = (props) => {
  const {
    value,
    name,
    inputType,
    labelName = '',
    isRequired = false,
    isHorizontalInput,
    control,
    errors,
    errorText,
    isWithController,
    popoverClassName,
    hideErrorMessageContainer = false,
    gridSize,
  } = props

  return (
    <CustomInputFieldContainer
      title={labelName}
      isMandatory={isRequired}
      gridSize={gridSize}
      isHorizontalInput={isHorizontalInput}
      value={isHorizontalInput ? 'children' : ''}
    >
      <div
        style={{
          width: '100%',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
        }}
        className={
          errors
            ? errors[name]
              ? `errorInputText ${popoverClassName}`
              : `validInputContainer ${popoverClassName}`
            : `validInputContainer ${popoverClassName}`
        }
      >
        {isWithController ? (
          <Controller
            name={name}
            control={isWithController ? control : ''}
            defaultValue={null}
            rules={{
              validate: (value) => value !== `Select ${labelName}`,
              required: {
                value: isRequired,
                message: `${labelName} is required`,
              },
            }}
            render={({ field }) => (
              <RenderCustomInput
                field={field}
                isWithController={true}
                {...props}
              ></RenderCustomInput>
            )}
          />
        ) : (
          <RenderCustomInput
            value={value}
            isWithController={false}
            inputType={inputType}
            {...props}
          ></RenderCustomInput>
        )}
        {!hideErrorMessageContainer &&
          (errors && errors[name] && isWithController ? (
            <Typography
              style={{
                height: '14px',
                font: `normal normal normal 11px ${FontFamily}`,
                marginBottom: '0.5rem',
                color: 'red',
              }}
            >
              {errorText ? errorText : `${labelName} is required`}
            </Typography>
          ) : (
            <Typography
              style={{
                height: '14px',
                font: `normal normal normal 11px ${FontFamily}`,
              }}
            ></Typography>
          ))}
      </div>
    </CustomInputFieldContainer>
  )
}

export default React.memo(CustomInput)
