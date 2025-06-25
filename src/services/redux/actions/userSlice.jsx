import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: '',
  userType: '',
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.user = action.payload
    },
    updateUserType: (state, action) => {
      state.userType = action.payload
    },
  },
})

export const { updateUserData, updateUserType } = UserSlice.actions
export default UserSlice.reducer
