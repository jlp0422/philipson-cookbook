export default function handler(req, res) {
  console.log({ body: req.body, method: req.method })
  // fetch('https://api.Cloudinary.com/v1_1/jlp0422/image/upload', {
  //   method: 'POST',
  //   body: formData
  // })
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ name: 'John Doe' }))
}
