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

### 2. Git fork & clone to localspace
(1) [https://github.com/KKardd/notionCalendar-commit] Follow the image below, click on star and repository git fork

<img width="1248" alt="11 08 14" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/37233397-27e1-442a-a330-33bfff32df53">

(2) Create repository

<img width="728" alt="11 16 21" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/f2832d93-3856-41d3-8eb0-85661d2292a2">

(3) Git clone

<img width="907" alt="11 31 55" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/97a7af22-ddbb-4fad-b800-d8b2d1a93f5a">

<img width="516" alt="11 39 47" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/dcdc5811-58ae-4c45-9636-64997d30d072">
(Your repository paste)

(4) Init username in app.js
```
// Github Nickname Setting
const username = "YOUR_USERNAME"; 
// Insert your github nickname
```

### 3. Github action setting
(1) Enter the Actions tab at the top of the repository and activate the github action under the name "Insert Commit Message To Notion Database" by pressing the enable button.

<img width="1437" alt="1 19 21" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/672b5ed4-869d-40cc-b19f-b77a3d89f157">
(2) Actions secrets and variables setting

<img width="1170" alt="스크린샷 2023-07-26 오후 1 34 49" src="https://github.com/KKardd/notionCalendar-commit/assets/108740187/20e047f5-ee16-4edc-906c-66d0e845cf6c">

