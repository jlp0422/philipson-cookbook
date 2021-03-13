const path = require('path')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const DatauriParser = require('datauri/parser')
const nextConnect = require('next-connect')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const parser = new DatauriParser()

const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)

const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg']

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('File type not supported, please use JPEG, JPG, or PNG'), false)
    }
  }
})

const apiRoute = nextConnect({
  // Handle error
  onError(error, req, res) {
    res.status(501).json({ error: error.message })
  },
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
})

apiRoute.use(upload.single('image'))

apiRoute.post(async (req, res) => {
  const file = formatBufferTo64(req.file)
  const uploadResult = await cloudinary.uploader.upload(file.content, {
    folder: 'philipson-cookbook'
  })

  const { secure_url, height, width } = uploadResult

  return res.status(200).json({
    secure_url,
    height,
    width
  })
})

export default apiRoute

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false, // Disallow body parsing, consume as stream
    sizeLimit: '100mb' // max allowed by cloudinary
  }
}
