# RSS Reader

[![Actions Status](https://github.com/ElenaManukyan/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ElenaManukyan/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d575f795153d8c37a66f/maintainability)](https://codeclimate.com/github/ElenaManukyan/frontend-project-11/maintainability)

🔗 **Live Demo**: [https://frontend-project-11-chi-snowy.vercel.app/](https://frontend-project-11-delta-brown.vercel.app/)

## Description
RSS Reader is a web application for aggregating RSS feeds. It allows users to:
- Add and manage multiple RSS feeds
- Automatically update feeds in real-time
- Read content in a clean, user-friendly interface

**Key Technical Highlights**:
- DOM API manipulation
- Asynchronous JavaScript (Promises, error handling)
- AJAX requests via Axios
- MVC architecture for code organization
- Form validation with Yup
- Webpack configuration for builds
- i18next for localization
- Integration with popular libraries

## Features
✅ URL validation for RSS feeds  
✅ Real-time feed updates  
✅ Bootstrap-powered responsive UI  
✅ Multilingual support  
✅ Detailed error handling  
✅ Optimized production builds  

## Tech Stack
| Category       | Technologies |
|----------------|--------------|
| Core           | JavaScript (ES6+) |
| Build          | Webpack |
| Styling        | Bootstrap, SASS |
| HTTP Client    | Axios |
| Validation     | Yup |
| Localization   | i18next |
| Utilities      | Lodash, on-change, uuid, rss-parser |

## Installation
1. Clone the repository:
```bash
git clone https://github.com/ElenaManukyan/frontend-project-11.git
cd frontend-project-11
```
2. Install dependencies:
 ```bash
   npm install
```
## Available Scripts

| Command               | Description                          |
|-----------------------|--------------------------------------|
| `npm run build:dev`   | Development build                    |
| `npm run build:prod`  | Production-optimized build           |
| `npm run start`       | Start development server             |
| `npm run watch`       | Watch mode for development           |

## Usage

1. Start the app:
   ```bash
   npm run start
   ```
2. Open http://localhost:8080 in your browser;
3. Enter a valid RSS URL and click "Add"("Добавить");
## Contributing

We welcome all contributions! Here's how you can help:

- 🐛 Found a bug? [Open an issue](https://github.com/your/repo/issues)
- 💡 Have a feature request? Let us know
- ✏️ Want to contribute code? Submit a pull request

For major changes, please open an issue first to discuss your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
