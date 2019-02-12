import {combineReducers} from 'redux'
import {createAction, createReducer} from 'redux-act'
import {
  APP_THEMES_LIGHT,
  APP_THEMES_DARK
} from './constants'

export const webpVersion = createAction('WASM Webp version')
export const settingsToggleTheme = createAction('Toggle app theme')

const libwebpVersion = createReducer({
  [webpVersion]: (state, payload) => payload
}, null)

const theme = createReducer({
  [settingsToggleTheme]: (state) => (
    APP_THEMES_LIGHT === state ? APP_THEMES_DARK : APP_THEMES_LIGHT
  )
}, APP_THEMES_LIGHT)

export const reducer = combineReducers({
  libwebpVersion,
  theme
})
