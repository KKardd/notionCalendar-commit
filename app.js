const commitMessage = process.argv[2];
const notionKey = process.argv[3];
const databaseID = process.argv[4];

const {Client} = require("@notionhq/client");

const notion = new Client({auth: notionKey});

const date = new Date();
date.setHours(date.getHours() + 9);

async function addItem(text) {
    try {
        const response = await notion.pages.create({
            parent: {database_id: databaseID},
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: text,
                            },
                        },
                    ],
                },
                Date: {
                    date: {
                        start: date.toISOString(),
                        time_zone: "Asia/Seoul",
                    },
                },
            },
        });
        console.log(response);
        console.log("Success! Entry added.");
    } catch (error) {
        console.error(error.body);
    }
}
//
addItem(commitMessage);
