import {
  isUploadedImage
} from '../uploader'

describe('isUploadedImage', () => {
  it('nothing set', () => {
    expect(isUploadedImage({
      uploader: {}
    })).toEqual(false)
  })
  it('set imageData', () => {
    expect(isUploadedImage({
      uploader: {
        imageData: {}
      }
    })).toEqual(true)
  })
})
