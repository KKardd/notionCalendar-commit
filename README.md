# 🗓️ notionCalendar-commit

This repository used the notion-calendar functionality. You can personally record your own studies, and furthermore, the team project unit makes it easy for you to check your team members' commit messages and project progress.

⚠️CAUTION
- This is based on an public repository.
- This set ISO time as a Korean standard. If it is not running in Korea, you should follow the document below and press [here](https://kkardd.notion.site/Notion-ISO-time-Setting-2011a658388a46268559ef3476b2c582?pvs=4) to set up additional settings.
---

## 📄 Guide Document 

### 1. Notion Setting
(1) [https://www.notion.so/my-integrations] After connecting, log in

(2) click on **New API Integration** button

<img width="964" alt="9 49 46" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/50014243-67eb-4212-92dd-27c28fdfb2f5">

(3) Select linked workspace → Name setting, Logo (optional) → Submit

<img width="501" alt="9 52 55" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/a5c55ed1-d334-479c-b5bd-9df599dabaf3">

(4) **Save the secret key**

<img width="466" alt="9 56 52" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/8c4d9295-b950-455a-8265-acc8358c8e9b">

(5) Create new calendar database in notion & **Save Dateabse ID**
(From the URL part of the calendar, after the part called www.notion.so/ , until the question mark character comes out)

<img width="1368" alt="10 01 11" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/1efa8eb1-53ae-4f24-8342-a508e9854318">

(6) Connection of the notation api ID to the database(In the input box, search for the name you set in the API integration.)

<img width="481" alt="10 07 02" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/9029f4d4-634f-4dfd-a0e7-596753cefeb3">

(7) Rename date type(It must be set the name **Date**)

![스크린샷 2023-07-27 오후 10 06 11](https://github.com/KKardd/notionCalendar-commit/assets/108740187/4b9f6e90-ac80-4209-8b78-f3ad6e10b927)

![IMG_1293](https://github.com/KKardd/notionCalendar-commit/assets/108740187/6538ba89-27da-4c30-bd52-f09168a7ee29)



### 2. Git fork & clone to localspace
(1) [https://github.com/KKardd/notionCalendar-commit] Follow the image below, click on star and repository git fork

<img width="1248" alt="11 08 14" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/37233397-27e1-442a-a330-33bfff32df53">

(2) Create repository

<img width="728" alt="11 16 21" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/f2832d93-3856-41d3-8eb0-85661d2292a2">

(3) Git clone

<img width="907" alt="11 31 55" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/97a7af22-ddbb-4fad-b800-d8b2d1a93f5a">

<img width="516" alt="11 39 47" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/dcdc5811-58ae-4c45-9636-64997d30d072">
(Your repository paste)

(4) Init your github username in app.js(If you don't live in Korea, you should click [here](https://kkardd.notion.site/Notion-ISO-time-Setting-2011a658388a46268559ef3476b2c582?pvs=4) to set the time.)
```
// Github Nickname Setting
const username = "YOUR_GITHUB_USERNAME"; 
// Insert your github nickname
```

### 3. Github action setting
(1) Enter the Actions tab at the top of the repository and activate the github action under the name "Insert Commit Message To Notion Database" by pressing the enable button.

<img width="1437" alt="1 19 21" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/672b5ed4-869d-40cc-b19f-b77a3d89f157">


(2) Issuance github api token

![IMG_92C7B15F6F9E-1](https://github.com/KKardd/notionCalendar-commit/assets/108740187/a14ba98f-82dd-47dc-a2bb-a19036b6f826)

![스크린샷 2023-07-27 오후 10 22 10](https://github.com/KKardd/notionCalendar-commit/assets/108740187/0d3c7127-dc1b-46fc-aa66-b82ad9f21571)

![스크린샷 2023-07-27 오후 10 23 50](https://github.com/KKardd/notionCalendar-commit/assets/108740187/e6d1366d-abaf-438d-8d4b-188123f4eaa6)

![스크린샷 2023-07-27 오후 10 23 59](https://github.com/KKardd/notionCalendar-commit/assets/108740187/a7f25108-ccfe-4cd2-a945-15ae63866fce)

(3) Save your token

![스크린샷 2023-07-27 오후 10 25 40](https://github.com/KKardd/notionCalendar-commit/assets/108740187/2bae2ede-d990-415b-ac81-94f5424f840c)

(4) Actions secrets and variables setting(Your repository)

<img width="1170" alt="스크린샷 2023-07-26 오후 1 34 49" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/20e047f5-ee16-4edc-906c-66d0e845cf6c">

![image](https://github.com/KKardd/notionCalendar-commit/assets/108740187/4a5b0006-4764-442f-914a-d53b481431d7)
Insert your secret key(github api token, notion database id, notion api key)

**🧷Note: These names must be set to API_TOKEN, NOTION_DATABASE_ID, NOTION_KEY, respectively.**

![image](https://github.com/KKardd/notionCalendar-commit/assets/108740187/069cc9ee-f6fa-49c1-8026-7ffce55472ff)

### The End👏

