import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateSelectedNavBtn: (state, action) => {
      state.selectedButton = action.payload
    },
  },
})

export const { updateSelectedNavBtn } = ThemeSlice.actions
export default ThemeSlice.reducer
