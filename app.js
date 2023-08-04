// Github Nickname Setting
const username = "KKardd";
// Insert your github nickname

const {Client} = require("@notionhq/client");
const axios = require("axios");

// Secret key setting
const notionKey = process.argv[2];
const databaseID = process.argv[3];
const token = process.argv[4];

// Time setting(Using github api)
const now = new Date();
const startPoint = new Date(now);
startPoint.setDate(startPoint.getDate() - 1);
startPoint.setHours(15, 0, 0, 0);
const since = startPoint.toISOString();

const endPoint = new Date(now);
endPoint.setHours(14, 59, 59, 999);
const until = endPoint.toISOString(); // Time setting based on Korean time (used according to ISO time)

const repositoryList = [];
const commitList = [];

// Search for my organization
async function getUserOrganizations() {
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

// Search for my repo in organization
async function getOrganizationToRepositories() {
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

// Search for my repo
async function getRepositories() {
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

// Get all commit message
async function getCommit(repoName) {
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
                if (String(repoName).startsWith("NoGwari")) {
                    const message = `[${String(repoName)}]${String(commits.commit.message)}`; // [KKardd/notionCalendar-commit]feat: add function
                    commitList.push(message);
                }
                // Commit message Type(Can be modified as needed)
                // ex) const message = `[${username}→${String(repoName)}]${String(commits.commit.message)}`; // [KKardd→Nogwari/server]feat: add function
            }
        }
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch commits for repository ${repoName}: ` + error.message);
    }
}

// Insert commit message to notion database
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
    const date = new Date(); // Setting notion time
    const today = date.toISOString().slice(0, 10); // Change the date type(YYYY-MM-DD)

    for (const commitMessage of commitList) {
        await insertCommitMessage(commitMessage, today);
    }
}

main();
