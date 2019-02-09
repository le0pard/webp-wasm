import {createSelector} from 'reselect'

const getImageData = (state) => state.uploader.imageData
const getEncodedImageData = (state) => state.uploader.encodedImageData

export const isEmptyState = createSelector(
  [getImageData],
  (imageData) => !imageData
)

export const isHaveEncodedImage = createSelector(
  [getEncodedImageData],
  (encodedImageData) => !!encodedImageData
)
