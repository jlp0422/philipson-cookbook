export default function handler(req, res) {
  console.log({ req })
  const route = 'https://api.Cloudinary.com/v1_1/jlp0422/upload'
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ name: 'John Doe' }))
}
