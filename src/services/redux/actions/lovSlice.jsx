import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  hodLov: [],
  hrLov: [],
  cmoLov: [],
}

const LovSlice = createSlice({
  name: 'lov',
  initialState,
  reducers: {
    updateHODDecision: (state, action) => {
      state.hodLov = action.payload
    },
    updateHRDecision: (state, action) => {
      state.hrLov = action.payload
    },
    updateCMODecision: (state, action) => {
      state.cmoLov = action.payload
    },
  },
})

export const { updateHODDecision, updateHRDecision, updateCMODecision } = LovSlice.actions
export default LovSlice.reducer
