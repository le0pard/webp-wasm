const WasmWebp = {
  memoizedModuleAPI: {},
  api: () => {
    if (!Object.keys(WasmWebp.memoizedModuleAPI).length) {
      WasmWebp.memoizedModuleAPI = {
        version: window.Module.cwrap('version', 'number', []),
        createBuffer: window.Module.cwrap('create_buffer', 'number', ['number', 'number']),
        destroyBuffer: window.Module.cwrap('destroy_buffer', '', ['number']),
        encode: window.Module.cwrap('encode', '', ['number', 'number', 'number', 'number']),
        getResultPointer: window.Module.cwrap('get_result_pointer', 'number', []),
        getResultSize: window.Module.cwrap('get_result_size', 'number', []),
        freeResult: window.Module.cwrap('free_result', '', ['number'])
      }
    }
    return WasmWebp.memoizedModuleAPI
  },

  getVersion: () => {
    const v = WasmWebp.api().version()
    return `${(v >> 16) & 0xff}.${(v >> 8) & 0xff}.${v & 0xff}`
  },

  encode: (image, quality = 100, onStartEncoding = (() => {})) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      let imagePointer = null
      let resultPointer = null

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
            const imageData = ctx.getImageData(0, 0, img.width, img.height)
            // allocate memory for image
            imagePointer = WasmWebp.api().createBuffer(imageData.width, imageData.height)
            window.Module.HEAP8.set(imageData.data, imagePointer)
            WasmWebp.api().encode(imagePointer, imageData.width, imageData.height, quality)
            resultPointer = WasmWebp.api().getResultPointer()
            const resultSize = WasmWebp.api().getResultSize()
            const resultView = new Uint8Array(window.Module.HEAP8.buffer, resultPointer, resultSize)
            const result = new Uint8Array(resultView)
            WasmWebp.api().freeResult(resultPointer)
            WasmWebp.api().destroyBuffer(imagePointer)

            const blob = new Blob([result], {type: 'image/webp'})
            const blobURL = window.URL.createObjectURL(blob)

            return resolve({
              blobURL,
              width: imageData.width,
              height: imageData.height
            })
          }).catch((err) => {
            if (resultPointer) {
              WasmWebp.api().freeResult(resultPointer)
            }
            if (imagePointer) {
              WasmWebp.api().destroyBuffer(imagePointer)
            }
            reject(err)
          })
      }
      reader.onerror = (err) => {
        reject(err)
      }
      reader.readAsDataURL(image)
    })
  }
}

export default WasmWebp
