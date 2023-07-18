// import { Client } from "@notionhq/client"

// const notion = new Client({ auth: process.env.NOTION_KEY })

// const databaseId = process.env.NOTION_DATABASE_ID

// async function addItem(text) {
//   try {
//     const response = await notion.pages.create({
//       parent: { database_id: databaseId },
//       properties: {
//         title: {
//           title:[
//             {
//               "text": {
//                 "content": text
//               }
//             }
//           ]
//         }
//       },
//     })
//     console.log(response)
//     console.log("Success! Entry added.")
//   } catch (error) {
//     console.error(error.body)
//   }
// }

// addItem("Yurts in Big Sur, California")

const commitMessage = process.argv[2];
const notionKey = process.argv[3];
const databaseID = process.argv[4];
console.log("commitMessage", commitMessage);
console.log("notionKey", notionKey);
console.log("databaseID", databaseID);
