const commitMessage = process.argv[2];
const notionKey = process.argv[3];
const databaseID = process.argv[4];

import {Client} from "@notionhq/client";

const notion = new Client({auth: notionKey});

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
            },
        });
        console.log(response);
        console.log("Success! Entry added.");
    } catch (error) {
        console.error(error.body);
    }
}

addItem(commitMessage);
