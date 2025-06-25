/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { AutoComplete, Spin, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import CustomInputFieldContainer from "../Container/customInputFieldContainer.jsx";
import AntResult from "../AntResult";
import { FontFamily } from "../../../utils/util.jsx";
import { DownOutlined } from "@ant-design/icons";

const AutoCompleteComponent = (props) => {
  const {
    isCharacterLimitedSearch = false,
    getLovData,
    placeholderText,
    handleSelection,
    handleOnSearch,
    value,
    isWithController,
    setValue,
    codeKey,
    minWidth,
    field,
    fontFamily,
    isFilterItem,
  } = props;

  const [searchText, setSearchText] = useState("");
  const [isLovLoading, setIsLovLoading] = useState(false);
  const [lov, setLov] = useState([]);
  const [filteredLov, setFilteredLov] = useState([]);
  const [isSearching, setIsSearching] = useState("");

  useEffect(() => {
    if (isCharacterLimitedSearch) {
      if (searchText?.length < 3) {
        setFilteredLov([]);
      } else {
        setFilteredLov(lov);
      }
    } else {
      setFilteredLov(lov);
    }
  }, [lov]);

  const handleSelectChange = (val1) => {
    if (isWithController) {
      setValue(`${codeKey}`, val1);
    }
  };

  return (
    <>
      <AutoComplete
        suffixIcon={<DownOutlined />}
        options={
          !filteredLov?.length > 0
            ? !isLovLoading &&
              isCharacterLimitedSearch &&
              (!searchText || searchText?.length < 3)
              ? [
                  {
                    label: `Please enter ${
                      !searchText || searchText?.length < 3
                        ? 3 - (searchText?.length ? searchText.length : 0)
                        : 0
                    } or more characters to search...`,
                    value: "",
                    disabled: true,
                  },
                ]
              : []
            : filteredLov
        }
        dropdownStyle={{
          font: `normal normal normal 11px ${fontFamily}`,
        }}
        {...(!isWithController && { value: value })}
        style={{
          width: "100%",
          minWidth: minWidth ? minWidth : "150px",
          height: 25,
          color: isFilterItem ? "#2b3a67" : "#222222",
        }}
        notFoundContent={
          isLovLoading ? (
            <div className="spinContainer ">
              <Spin size="small" />
            </div>
          ) : (
            <AntResult typeOfResult="datanotexist" />
          )
        }
        autoComplete="off"
        className="w-full  rounded-md text-xs customInputText"
        {...field}
        onSelect={(val1, val2) => {
          setSearchText("");
          setIsSearching(false);
          if (isWithController) {
            field.onChange(val2.label);
          }
          handleSelectChange(val1, val2);
          if (typeof handleSelection === "function") {
            handleSelection(val1, val2);
          }
        }}
        allowClear
        onClear={() => {
          if (isWithController) {
            field.onChange();
            handleSelectChange("", "");
          }
          handleSelection("", "");
        }}
        onBlur={() => {
          setSearchText("");
          if (searchText === value) {
            if (typeof setValue === "function") {
              setValue("");
            }
            if (typeof setLov === "function") {
              setLov([]);
            }
          }
          if (
            typeof handleOnSearch === "function" &&
            searchText === "" &&
            isSearching
          ) {
            handleOnSearch("");
          }
          if (isSearching && isWithController) {
            field.onChange("");
          }
        }}
        onDropdownVisibleChange={async (open) => {
          if (open) {
            if (!isCharacterLimitedSearch) {
              setIsLovLoading(true);
              const data = await getLovData();

              setIsLovLoading(false);
              setLov(data?.lov ? data.lov : []);
              setFilteredLov(data?.lov ? data.lov : []);
            } else if (isCharacterLimitedSearch && value && !searchText) {
              setIsSearching(true);
              setSearchText(value);
              if (value?.length > 2) {
                setIsLovLoading(true);
                const data = await getLovData(value);
                if (!data?.isCancelledApi) {
                  setIsLovLoading(false);
                }
                if (value?.length > 2 && data?.lov) {
                  setLov(data.lov);
                } else {
                  setFilteredLov([]);
                  setLov([]);
                }
              } else {
                setFilteredLov([]);
                setLov([]);
              }
            } else {
              // FOR HANDLING DEFAULT LOV
              const data = await getLovData("", true);
              setIsLovLoading(false);
              setLov(data?.lov ? data.lov : []);
            }
          }
        }}
        onSearch={async (text) => {
          if (typeof setValue === "function") {
            setValue(text);
          }

          setSearchText(text);
          if (typeof handleOnSearch === "function") {
            handleOnSearch(text);
          }
          if (isCharacterLimitedSearch) {
            setIsSearching(true);
            if (text?.length > 2) {
              setIsLovLoading(true);
              const data = await getLovData(text);
              if (!data?.isCancelledApi) {
                setIsLovLoading(false);
              }
              if (text?.length > 2 && data?.lov) {
                setLov(data.lov);
              } else {
                setFilteredLov([]);
                setLov([]);
              }
            } else {
              setFilteredLov([]);
              setLov([]);
            }
          } else {
            setIsSearching(true);
            const temp = lov?.filter((item) =>
              item?.label?.toLowerCase().includes(text?.toLowerCase())
            );
            setFilteredLov(temp);
          }
        }}
        placeholder={placeholderText}
      />
    </>
  );
};

const CustomAutoComplete = (props) => {
  const {
    isWithController,
    labelName,
    name,
    control,
    isRequired,
    errors,

    errorText,
    gridSize,
    hideErrorMessageContainer,
    isHorizontalInput,
  } = props;

  return (
    <>
      <CustomInputFieldContainer
        title={labelName}
        isMandatory={isRequired}
        gridSize={gridSize}
        isHorizontalInput={isHorizontalInput}
        value={isHorizontalInput ? "children" : ""}
      >
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          className={
            errors && errors[name] ? "errorInputText" : "validInputContainer"
          }
        >
          {isWithController ? (
            <Controller
              name={name}
              control={isWithController ? control : ""}
              defaultValue={null}
              rules={{
                validate: (value) => value !== `Select ${labelName}`,
                required: {
                  value: isRequired,
                  message: `${labelName} is required`,
                },
              }}
              render={({ field }) => (
                <AutoCompleteComponent
                  field={field}
                  fontFamily={FontFamily}
                  isWithController={true}
                  {...props}
                ></AutoCompleteComponent>
              )}
            />
          ) : (
            <AutoCompleteComponent {...props}></AutoCompleteComponent>
          )}
          {!hideErrorMessageContainer &&
            (errors && errors[name] && isWithController ? (
              <Typography
                style={{
                  height: "14px",
                  font: `normal normal normal 11px ${FontFamily}`,
                  marginBottom: "0.5rem",
                  color: "red",
                }}
              >
                {errorText ? errorText : `${labelName} is required`}
              </Typography>
            ) : (
              <Typography
                style={{
                  height: "14px",
                  font: `normal normal normal 11px ${FontFamily}`,
                }}
              ></Typography>
            ))}
        </div>
      </CustomInputFieldContainer>
    </>
  );
};
export default React.memo(CustomAutoComplete);
