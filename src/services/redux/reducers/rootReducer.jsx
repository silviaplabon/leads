import { combineReducers } from 'redux'
import userSlice from '../actions/userSlice'
import LovSlice from '../actions/lovSlice'
import ThemeSlice from '../actions/themeSlice'
export const rootReducer = combineReducers({
  user: userSlice,
  theme: ThemeSlice,
  lov: LovSlice,
})
