const notionKey = process.argv[2];
const databaseID = process.argv[3];

const {Client} = require("@notionhq/client");
const axios = require("axios");

const now = new Date();
const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(15, 0, 0, 0); // 어제 15시 0분 0초 세팅
const since = yesterday.toISOString();

const yesterdayEnd = new Date(now);
// yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
yesterdayEnd.setHours(14, 59, 59, 999); // 어제 14시 59분 59초 세팅
const until = yesterdayEnd.toISOString();

console.log("since:" + since + "until:" + until);

const username = "KKardd";
const token = "token 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";

const repositoryList = [];
const commitList = [];

async function getUserOrganizations() {
    // 나의 조직들 찾기
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/orgs`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch organizations for user "${username}": ` + error.message);
    }
}

async function getOrganizationToRepositories() {
    // 찾은 내 조직들의 Repo 찾기
    try {
        const organizations = await getUserOrganizations();
        for (const org of organizations) {
            const orgName = org.login;
            const response = await axios.get(`https://api.github.com/orgs/${orgName}/repos`, {
                headers: {
                    Authorization: token,
                },
            });
            const repositories = response.data;
            repositories.forEach((repo) => {
                repositoryList.push(String(repo.full_name));
            });
            return repositories;
        }
    } catch (error) {
        throw new Error(`Failed to fetch organizations for user "${username}": ` + error.message);
    }
}

async function getRepositories() {
    // 개인 레포지토리 찾기
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: token,
            },
        });
        const repositories = response.data;
        repositories.forEach((repo) => {
            repositoryList.push(String(repo.full_name));
        });
        return repositories;
    } catch (error) {
        throw new Error("Failed to fetch repositories: " + error.message);
    }
}

async function getCommit(repoName) {
    // 찾은 조직들에서 Repo의 내가 한 커밋 찾기.
    try {
        const response = await axios.get(
            `https://api.github.com/repos/${repoName}/commits?since=${since}&until=${until}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        const commit = response.data;
        for (const commits of commit) {
            if (commits.author.login === username) {
                commitList.push("[" + String(repoName) + "]" + String(commits.commit.message));
            }
        }
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch commits for repository ${repoName}: ` + error.message);
    }
}

async function insertCommitMessage(text, today) {
    const notion = new Client({auth: notionKey});
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
        console.log("Success! Entry added.");
    } catch (error) {
        console.error(error.body);
    }
}

async function main() {
    await getRepositories();
    await getOrganizationToRepositories();
    for (const repo of repositoryList) {
        await getCommit(repo);
    }
    const date = new Date(); // 현재 시간 설정
    date.setHours(date.getHours() - 24); // 한국 시간으로 수정
    const today = date.toISOString().slice(0, 10); // 날짜 정보만 가져오기

    for (const commitMessage of commitList) {
        await insertCommitMessage(commitMessage, today);
    }
}

main();
setTimeout(() => {
    console.log(commitList);
}, 5000);
