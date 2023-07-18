const commitMessage = process.argv[2];
const notionKey = process.argv[3];
const databaseID = process.argv[4];

const {Client} = require("@notionhq/client");

const notion = new Client({auth: notionKey});

const date = new Date(); // 현재 시간 설정
date.setHours(date.getHours() + 9); // 한국 시간으로 수정
const today = date.toISOString().slice(0, 10); // 날짜 정보만 가져오기
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
                        start: today,
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

addItem(commitMessage);
