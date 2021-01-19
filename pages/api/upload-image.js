// import formidable from 'formidable'

// export default async (req, res) => {
//   const form = new formidable.IncomingForm()

//   form.parse(req, (err, fields, files) => {
//     fetch('https://api.Cloudinary.com/v1_1/jlp0422/image/upload', {
//       method: 'POST',
//       body: {
//         ...fields,
//         ...files
//       }
//     })
//       .then(data => data.json())
//       .then(data => res.json(data))
//       .catch(err => console.log(err))
//   })

//   // res.statusCode = 200
//   // res.setHeader('Content-Type', 'application/json')
//   // res.end(JSON.stringify({ name: 'John Doe' }))
// }

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }
