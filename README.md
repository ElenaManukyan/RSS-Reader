# RSS Reader

## Tests and code analysis:
[![Actions Status](https://github.com/ElenaManukyan/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ElenaManukyan/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d575f795153d8c37a66f/maintainability)](https://codeclimate.com/github/ElenaManukyan/frontend-project-11/maintainability)
## Demonstration:
[https://frontend-project-11-chi-snowy.vercel.app/](https://frontend-project-11-delta-brown.vercel.app/)

## Project Description  
RSS Reader is a web application for aggregating RSS feeds. It allows users to add RSS feeds, automatically update them, and read new entries in a convenient format.  

This project demonstrates:  
- working with the DOM API;  
- asynchronous JavaScript (including Promises and error handling);  
- using AJAX for HTTP requests;  
- form validation with the Yup library;  
- implementing MVC architecture for maintainable code;  
- configuring builds and deployment with Webpack;  
- localization of the interface with i18next;  
- integration of popular libraries like Axios and Lodash.  

## Features  
- Add RSS feeds with URL validation.  
- Automatically update feeds and display new entries.  
- User-friendly interface built with Bootstrap.  
- Multilingual interface support.  
- Error messages for invalid feeds or update failures.  

## Tech Stack  
- **Language**: JavaScript (ES6+).  
- **Build Tool**: Webpack.  
- **CSS**: Bootstrap and SASS.  
- **AJAX**: Axios for HTTP requests.  
- **Validation**: Yup.  
- **Localization**: i18next.  
- **Other Libraries**: Lodash, on-change, uuid, rss-parser.  

## Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/ElenaManukyan/frontend-project-11.git
   cd rss-reader

2. Install dependencies:  
   ```bash
   npm install

## Scripts
* **Development Build:**
  ```bash
  npm run build:dev

* **Production Build:**
  ```bash
  npm run build:prod

* **Run Development Server:**
  ```bash
  npm run start

* **Watch for File Changes:**
  ```bash
  npm run watch

## Usage
1. Start the application:
   ```bash
   npm run start
2. Open ```http://localhost:8080``` in your browser.
3. Enter an RSS feed URL and click "Добавить"
4. Read new entries from the added feeds.
