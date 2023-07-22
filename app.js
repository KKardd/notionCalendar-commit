// Github Nickname Setting
const username = "KKardd";

const {Client} = require("@notionhq/client");
const axios = require("axios");

const notionKey = process.argv[2];
const databaseID = process.argv[3];
const token = process.argv[4];

const now = new Date();
const startPoint = new Date(now);
startPoint.setDate(startPoint.getDate() - 1);
startPoint.setHours(15, 0, 0, 0); // 어제 15시 0분 0초 세팅
const since = startPoint.toISOString();

const endPoint = new Date(now);
endPoint.setHours(14, 59, 59, 999); // 오늘 14시 59분 59초 세팅
const until = endPoint.toISOString();

const repositoryList = [];
const commitList = [];

async function getUserOrganizations() {
    // 나의 조직들 찾기
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/orgs`, {
            headers: {
                Authorization: "token " + token,
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
                    Authorization: "token " + token,
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
                Authorization: "token " + token,
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
                    Authorization: "token " + token,
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
    const today = date.toISOString().slice(0, 10); // 날짜 정보만 가져오기

    for (const commitMessage of commitList) {
        await insertCommitMessage(commitMessage, today);
    }
}

main();
