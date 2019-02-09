const webpApi = {
  version: window.Module.cwrap('version', 'number', []),
  createBuffer: window.Module.cwrap('create_buffer', 'number', ['number', 'number']),
  destroyBuffer: window.Module.cwrap('destroy_buffer', '', ['number']),
  encode: window.Module.cwrap('encode', '', ['number', 'number', 'number', 'number']),
  getResultPointer: window.Module.cwrap('get_result_pointer', 'number', []),
  getResultSize: window.Module.cwrap('get_result_size', 'number', []),
  freeResult: window.Module.cwrap('free_result', '', ['number']),
}

const WasmConverter = {
  encode: (image, quality = 100, onStartEncoding = (() => {})) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = () => {
        onStartEncoding.call(null)

        fetch(reader.result)
          .then((resp) => resp.blob())
          .then((blob) => createImageBitmap(blob))
          .then((img) => {
            // Make canvas same size as image
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            // Draw image onto canvas
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            return ctx.getImageData(0, 0, img.width, img.height)
          }).then((imageData) => {
            const imagePointer = webpApi.createBuffer(imageData.width, imageData.height)
            window.Module.HEAP8.set(imageData.data, imagePointer)
            webpApi.encode(imagePointer, imageData.width, imageData.height, quality)
            const resultPointer = webpApi.getResultPointer()
            const resultSize = webpApi.getResultSize()
            const resultView = new Uint8Array(Module.HEAP8.buffer, resultPointer, resultSize)
            const result = new Uint8Array(resultView)
            webpApi.freeResult(resultPointer)

            const blob = new Blob([result], { type: 'image/webp' })
            const blobURL = URL.createObjectURL(blob)
            webpApi.destroyBuffer(imagePointer)
            return {
              blobURL,
              width: imageData.width, 
              height: imageData.height
            }
          }).then((imageResult) => resolve(imageResult)).catch((err) => reject(err))
      }
      reader.onerror = (err) => {
        reject(err)
      }
      reader.readAsDataURL(image)
    })
  }
}

export default WasmConverter
