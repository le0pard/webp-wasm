import {createSelector} from 'reselect'

const getImageData = (state) => state.uploader.imageData

export const isUploadedImage = createSelector(
  [getImageData],
  (imageData) => !!imageData
)

export const uploadedImageName = createSelector(
  [getImageData],
  (imageData) => imageData ? imageData.name : null
)
