<h1 align="center">Kudos Software</h1>

<p align="center">This API serves a React application with Vite, enabling secure access for authenticated users, particularly administrators. It facilitates actions like uploading CSV files to create records in a PostgreSQL database, ensuring data validation and proper authorization.
    <br> 
</p>

Url Software: https://kudos-software-cavero.netlify.app/

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Structure](#structure)
- [Features](#features)
- [Built Using](#built_using)
- [Deploy Using](#deploy_using)

## 🧐 About <a name = "about"></a>
- This backend API serves as the backbone for a React application built with Vite and Vitest. It empowers authenticated users, particularly administrators, to securely upload CSV files for creating records in a PostgreSQL database.
- It ensures data validation, proper authorization, and administrative functionalities such as uploading CSV files and managing records.
- Developed using Node.js and Express, the API follows a three-layer architecture and incorporates Test-Driven Development (TDD) practices to ensure reliability and efficiency.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You will need to have the following installed on your machine:
- [React.js](https://nodejs.org/en/)
- [Vitest](https://vitest.dev/)

### Installing
With the prerequisites installed, and with docker running, you can run the following commands to get the project up and running:

1. Clone the repository or download the zip file and extract it:
```bash
git clone https://github.com/iska1234/kudos_software_front.git
```

2. Install the dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the project with the following content:
```env
VITE_BASE_URL=

VITE_TOKENKEY=

VITE_USERKEY=
```

4. Start the database: create the database by querying the schema.sql file inside the schemas folder
```bash
schema.sql
```

6. Start the server:
```bash
npm run dev
```

## 🏗️ Structure <a name = "structure"></a>
The project is structured as follows:
```
├── .github: Folder containing the project's GitHub actions configurations.

├── src: Folder containing application files.

│   ├── assets: Folder for storing static assets such as images, fonts, etc.

│   ├── components: Folder for React components used throughout the application.

│   ├── context: Folder for React context providers and consumers.

│   ├── data: Folder for data-related files such as API requests, data models, etc.

│   ├── hooks: Folder for custom React hooks.

│   ├── pages: Folder for React components representing different pages/routes of the application.

│   ├── router: Folder for managing routing configurations using React Router.

│   ├── utils: Folder for utility functions used across the application.

└── main.jsx: File that initializes an Express server, configures middleware for handling requests, defines routes for different endpoints, and starts the server to listen on a specified port.


```

## 🔧 Running the tests <a name = "tests"></a>
The tests are divided into unit tests and e2e tests. To run the tests, you can run the following commands:

1. To run the unit tests:
```bash
npm run test
```

## 🎈 Features <a name = "features"></a>

### Auth Page - Login

![image](https://github.com/iska1234/kudos_software_front/assets/119825666/ae33fc91-c2cd-4506-bab1-cec6901f4303)


### Auth Page - Register

![image](https://github.com/iska1234/kudos_software_front/assets/119825666/73130c8b-4b41-4d8a-b8ea-da1188d1041f)


### Admin Page - Home

![image](https://github.com/iska1234/kudos_software_front/assets/119825666/5fa5c509-476c-40e7-ac81-68838dfc36c3)


### Admin Page - Saved Data

![image](https://github.com/iska1234/kudos_software_front/assets/119825666/7b59f170-3a8d-40b6-a472-6b7e5e04688d)


### Admin Page - Saved Details

![image](https://github.com/iska1234/kudos_software_front/assets/119825666/ba0b3d27-5a1b-4f59-b227-af47aa223972)


### Admin Page - Shared Data

![image](https://github.com/iska1234/kudos_software_front/assets/119825666/5641914e-34f5-4ad3-8532-a0829be41a21)


### Admin Page - Deleted Data

![image](https://github.com/iska1234/kudos_software_front/assets/119825666/2dec9bf6-1866-425a-98f9-2f0f9d385687)


## ⛏️ Built Using <a name = "built_using"></a>
- [JavaScript](https://www.typescriptlang.org/)
- [React](https://es.react.dev)
- [Vitest](https://vitest.dev/)

## 🚀 Deploy Using <a name = "built_using"></a>
- [Netlify](https://www.netlify.com)
