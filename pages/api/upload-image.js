const cloudinary = require('cloudinary').v2
const multer = require('multer')
const path = require('path')
const DatauriParser = require('datauri/parser')
const parser = new DatauriParser()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)

// const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg']

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Not supported file type!'), false)
    }
  }
})

const singleUpload = upload.single('image')
const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, error => {
    if (error) {
      return res.status(422).send({ message: 'Image upload fail!' })
    }

    next()
  })
}

function streamToBase64String(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => {
      console.log({ chunk })
      chunks.push(chunk)
    })
    stream.on('error', err => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

const apiRoute = async (req, res) => {
  const buffer = await streamToBase64String(req)
  const file = formatBufferTo64(buffer)
  // const data = await cloudinary.uploader.upload(file)

  console.log('** file', file)

  return res.json({
    statusCode: 200,
    body: 'no body'
  })
}

apiRoute.use(singleUpload)

export default apiRoute

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
    // sizeLimit: '500kb'
  }
}
