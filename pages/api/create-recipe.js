// // const sendQuery = require('./utils/sendQuery')

// const CREATE_ENTRY = `
//   mutation(
//     $firstName: String!
//     $lastName: String!
//     $gender: Gender!
//     $weight: String!
//     $date: String!
//   ) {
//     createEntry(
//       data: {
//         firstName: $firstName
//         lastName: $lastName
//         gender: $gender
//         weight: $weight
//         date: $date
//       }
//     ) {
//       _id
//       firstName
//       lastName
//       gender
//       weight
//       date
//     }
//   }
// `

// export default async (req, res) => {
//   const variables = JSON.parse(event.body)
//   const { data, errors } = await sendQuery(CREATE_ENTRY, { ...variables })

//   if (errors) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify(errors)
//     }
//   }

//   return {
//     statusCode: 200,
//     body: JSON.stringify({ newEntry: data.createEntry })
//   }
// }
