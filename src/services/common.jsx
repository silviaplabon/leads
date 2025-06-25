/* eslint-disable no-unused-vars */
import axios from 'axios'
import { ToastMessage } from '../utils/util'
export const CommonAPI = {
  getPageData: async function (
    token,
    url,
    method,
    data,
    cancel = false,
    responseType,
    ignoreToastMessage = false,
  ) {
    const axiosReq = {
      url: `${import.meta.env.REACT_APP_BASE_URL}/gateway/${url}`,
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
      data: method === 'POST' || method === 'PUT' || method === 'DELETE' ? data : undefined,
    }
    if (responseType) {
      axiosReq.responseType = 'blob'
    }

    return await axios
      .request(axiosReq)
      .then((response) => {
        const res = {
          data: response?.data?.lines
            ? response?.data?.lines
            : response?.data?.data
              ? response.data.data
              : response?.data
                ? response.data
                : [],
          errorMessage: response?.status === 204 ? response?.statusText : '',
          isError: false,
          totalResults: response?.data?.totalResults
            ? response.data.totalResults
            : response?.totalResults
              ? response?.totalResults
              : 0,
          noOfPages: response?.data?.noOfPages || 0,
        }
        return res
      })
      .catch((e) => {
        let errorMessage = ''
        if (e?.response?.data?.violations) {
          e?.response?.data?.violations?.map((item) => {
            errorMessage = errorMessage ? `${errorMessage}, ${item?.message}` : `${item?.message}`
          })
        } else if (e?.response?.data?.errorLines) {
          e?.response?.data?.errorLines?.map((item) => {
            errorMessage = errorMessage ? `${errorMessage}, ${item?.message}` : `${item?.message}`
          })
        }
        if (!errorMessage) {
          errorMessage = e?.response?.data
            ? typeof e?.response?.data === 'string' && e?.response?.data?.trim() !== ''
              ? e?.response?.data
              : ''
            : ''
        }
        const updatedErrorMessage = errorMessage
          ? errorMessage
          : e?.response?.data?.message
            ? e?.response?.data?.message
            : e?.message
              ? e.message
              : 'Something Went Wrong'
        if (!ignoreToastMessage) {
          ToastMessage('error', updatedErrorMessage)
        }
        return {
          data: [],
          errorMessage: updatedErrorMessage,
          isError: true,
        }
      })
  },
  searchEmployee: async (token, val, cancelToken) => {
    let output = { options: [], isRequestCancelled: false }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.REACT_APP_BASE_URL}/gateway/epm/hr/employee/find/q`,
      data: {
        pageNumber: 0,
        limit: 50,
        sortText: 'empType~D',
        query: [
          {
            attribute: 'active',
            operator: '=',
            value: 'Y',
          },
          {
            attribute: 'empType',
            operator: '=',
            value: 'E',
          },
          {
            attribute: 'personName',
            operator: 'CONTAINS',
            value: val ? val?.toLowerCase() : '',
          },
        ],
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cancelToken: cancelToken?.token,
    }
    return await axios
      .request(config)
      .then((res) => {
        if (res?.data?.data?.length > 0) {
          output.options = res.data?.data?.map((item) => {
            const obj = {
              value: item.personId,
              label: item.personName,
              key: `${item?.personId}-${item?.personNumber}`,
              data: item,
            }
            return obj
          })
          return output
        } else {
          return output
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          output.isRequestCancelled = true
          return output
        } else {
          return output
        }
      })
  },
  uploadFile: async (token, resignBlob, pdfFileName) => {
    const formData = new FormData()
    formData.append('file', resignBlob, pdfFileName)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.REACT_APP_BASE_URL}/gateway/epm/storage/upload/file/epm`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    }

    return await axios
      .request(config)
      .then((res) => {
        if (res?.data?.status === 200) {
          return { data: res?.data?.data, isUploaded: true }
        } else {
          return { data: res?.data?.data, isUploaded: false }
        }
      })
      .catch((err) => {
        return { data: {}, isUploaded: false, errorMessage: err?.message }
      })
  },
  downloadFile: async function (token, fileData) {
    if (fileData?.bucketName && fileData?.fileName) {
      try {
        const preSignRes = await CommonAPI.getPageData(
          token,
          `epm/storage/getPreSignedUrl/${fileData.bucketName}?objectKey=${fileData.fileName}&durationSec=80000`,
          'GET',
        )

        if (preSignRes.data) {
          if (!preSignRes.data?.url) {
            ToastMessage('error', 'No URL Found')
            return { data: null, isError: true }
          } else {
            return {
              data: {
                documentUrl: preSignRes?.data?.url,

                fileType:
                  preSignRes.data?.fileName?.split('.')[
                    preSignRes.data?.fileName?.split('.')?.length - 1
                  ],
                ...preSignRes?.data,
                fileName: fileData?.originalFileName
                  ? fileData?.originalFileName
                  : preSignRes?.data?.fileName,
              },
              isError: false,
            }
          }
        } else {
          return { data: null, isError: true }
        }
      } catch (error) {
        ToastMessage('error', error.message || 'Failed to load file')
        return { data: null, isError: true }
      }
    } else {
      ToastMessage('error', 'Incorrect file data')
      return { data: null, isError: true }
    }
  },
}
