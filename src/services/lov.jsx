/* eslint-disable no-unused-vars */
import axios from 'axios'

export const LovAPI = {
  getLov: async function (
    token,
    url,
    labelKey,
    valueKey,
    cancel = false,
    labelOptionKey,
    sortByMeaning,
  ) {
    const axiosReq = {
      url: `${import.meta.env.REACT_APP_BASE_URL}/gateway/${url}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
    }

    return await axios
      .request(axiosReq)
      .then((response) => {
        const data = Array?.isArray(response?.data?.data) ? response.data.data : response.data

        const final = data?.map((item, index) => {
          return {
            label: item[labelKey] ? item[labelKey] : labelOptionKey ? item[labelOptionKey] : '',
            value: item[valueKey],
            key: `${item[valueKey]}-${index}`,
            data: item,
          }
        })
        return {
          data:
            final?.length > 0
              ? sortByMeaning
                ? final.sort((a, b) => a?.data?.meaning?.localeCompare(b?.data?.meaning))
                : final
              : [],
          isError: false,
          errorMessage: '',
        }
      })
      .catch((e) => {
        return {
          data: [],
          isError: true,
          errorMessage: e?.response?.data || e?.message,
        }
      })
  },
}
