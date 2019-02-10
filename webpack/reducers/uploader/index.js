import {combineReducers} from 'redux'
import {createAction, createReducer} from 'redux-act'

export const uploadImageData = createAction('Upload image data')
export const startEncoding = createAction('Start encoding image')
export const encodeSuccess = createAction('Finish encoding image')
export const encodeError = createAction('Finish encoding image')
export const resetImage = createAction('Reset uploaded image')

const imageData = createReducer({
  [uploadImageData]: (state, payload) => payload,
  [resetImage]: () => null
}, null)

const isEncodingImage = createReducer({
  [startEncoding]: () => true,
  [encodeSuccess]: () => false,
  [encodeError]: () => false,
  [resetImage]: () => false
}, false)

const encodedImageData = createReducer({
  [startEncoding]: () => null,
  [encodeSuccess]: (state, payload) => payload,
  [encodeError]: () => null,
  [resetImage]: () => null
}, null)

const encodedResultError = createReducer({
  [startEncoding]: () => null,
  [encodeSuccess]: () => null,
  [encodeError]: (state, payload) => payload,
  [resetImage]: () => null
}, null)

export const reducer = combineReducers({
  imageData,
  isEncodingImage,
  encodedImageData,
  encodedResultError
})
