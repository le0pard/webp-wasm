import {
  isEmptyState,
  isHaveEncodedImage
} from '../uploader'

describe('isEmptyState', () => {
  it('nothing set', () => {
    expect(isEmptyState({
      uploader: {}
    })).toEqual(true)
  })
  it('set imageData', () => {
    expect(isEmptyState({
      uploader: {
        imageData: {}
      }
    })).toEqual(false)
  })
})

describe('isHaveEncodedImage', () => {
  it('nothing set', () => {
    expect(isHaveEncodedImage({
      uploader: {}
    })).toEqual(false)
  })
  it('set encodedImageData', () => {
    expect(isHaveEncodedImage({
      uploader: {
        encodedImageData: {}
      }
    })).toEqual(true)
  })
})
