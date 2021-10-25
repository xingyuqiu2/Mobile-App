# Mobile App

## Description
A small mobile application that presents a user’s profile, repository, following, and followers information, gathered
using Github’s API

Profile Screen:
- Profile avatar image view
- Name
- GitHub username
- Bio
- Website
- Email
- Repos count: Clickable: able to navigate to Repositories Screen
- Followers count: Clickable: able to navigate to Followers Screen
- Following count: Clickable: able to navigate to Following Screen
- Profile creation date

Repositories Screen:
- A list/table of all your public repositories
- Each item of the list/table should have:
- Repository name
- Owner’s GitHub username
- Repository description

Following Screen:
- Avatar picture
- Name
- username

Followers Screen:
- Avatar picture
- Name
- username


## Folders and files in Project
- view
    - app.js
- controller
    - constant.js
    - profileController.js
    - repositoriesController.js
    - followController.js
- model
    - profile.js
    - repository.js
    - follow.js
- tests
    - model.test.js
    - view.test.js
    - mock.test.js
    - \_\_snapshots\_\_

## Usage
Install node with npm.\
Install expo by run: npm install -g expo-cli\
Create an app by run: expo init \<app name\>\
Delete App.js and add these folders with files to the app root directory.\
Change the package.json accordingly.\
Run in terminal: expo start