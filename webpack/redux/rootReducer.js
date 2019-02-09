import {combineReducers} from 'redux'

import {reducer as uploader} from 'reducers/uploader'
import {reducer as settings} from 'reducers/settings'
import {reducer as sw} from 'reducers/sw'

export default combineReducers({
  uploader,
  settings,
  sw
})
