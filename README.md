
# Bachelor Home



**The Bachelor Flat Management App is a comprehensive web-based solution designed to simplify and streamline the management of shared living expenses, daily meals, and purchases for residents of a bachelor flat or shared accommodation. This application aims to provide a member-friendly platform for flatmates to collaboratively manage their finances and household activities.**

![](https://img.shields.io/badge/version-v0.0.1-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---


## Table of Contents
- [Overview](#Overview)
- [Installation](#Installation)
- [Key Features](#KeyFeatures)
- [Configuration](#Configuration)
- [Api Endpoint](#ApiEndpoint)
- [Usage Example](#UseExample)
- [Credits](#Credits)
- [Testing](#Testing)
- [Contact](#Contact-Information)


## Overview
The Bachelor Flat Management App is a comprehensive web-based solution designed to simplify and streamline the management of shared living expenses, daily meals, and purchases for residents of a bachelor flat or shared accommodation. This application aims to provide a member-friendly platform for flatmates to collaboratively manage their finances and household activities.

##### **Problem Statement**

Living in a shared bachelor flat often involves challenges in coordinating expenses, tracking daily meals, and managing shared purchases. Without an organized system, flatmates may face difficulties in splitting costs, maintaining transparency, and keeping an accurate record of their financial activities.
## Installation

Install my-project with npm and node js

If you give npm install then all package install.

```bash
    node: v18.1.0,
    npm:v7.1.2.0
```
    #### Requirements

    For running this project you need some package.
    
    1. bcryptjs: 2.4.3,
    2. body-parser: ^1.20.2,
    3. cors: ^2.8.5,
    4. dotenv: ^16.3.1,
    5. express: ^4.18.2,
    6. express-openapi-validator: ^5.0.6,
    7. express-validator: ^7.0.1,
    8. jsonwebtoken: ^9.0.2,
    9. mongoose:^7.5.1,
    10. morgan: ^1.10.0,
    11. shortid: ^2.2.16,
    12. supertest: ^6.3.3,
    13. swagger-ui-express: ^5.0.0,
    14. yamljs: ^0.3.0,


    
## KeyFeatures

### 1. Member Registration and Management
- Allow new members to register with essential information.
- Easily update member information as needed.
- Generate member reports 

### 2. Daily Meal Tracking
- Record and track daily meals for each member.
- Calculate and display meal statistics
- Generate meal reports for analysis or billing.

### 3. Daily Expense and Purchase Recording
- Keep a detailed record of daily expenses, purchases, and transactions.
- Track expenses on a per-member basis.

### 4. Daily Important Notices for Members
- Send and display daily notices and announcements to members.
- Allow members to view past notices for reference.

### 5. Reporting and Analytics
- Generate various reports, including meal consumption, expenses


## Configuration

To run this project, you will need to add the following environment variables to your .env file

- `DB_CONNECTION_URL` = mongodb+srv://- - - - <username>:<password>@cluster0.gq9xpkk.mongodb.net
- `DB_USERNAME` 
- `DB_PASSWORD` 
- `DB_NAME` 
- `DB_QUERY` 
- `PORT`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`


## API Reference

### Auth

#### Create a new member  (Admin)

```http
  POST /api/v1/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your access token |

| Request body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |


#### Signin to existing member  (Admin , Members)

```http
  POST /api/v1/signin
```

| Request body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

#### Signout to existing member  (Admin , Members)

```http
  POST /api/v1/signout
```

### Admin Auth

#### Create a admin (only first time)

```http
  POST /api/v1/auth/signup
```
| Request body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

### Token

#### Create Access token (Admin , Members)

```http
  POST /api/v1/refresh_token
```
| Request body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refresh_token` | `string` | **Required**. Your token

### Member

#### Get all member (Admin)

```http
  GET /api/v1/members?query=params
```
| params | 
| :-------- | 
| `page (default 1) - current page number` | 
| `limit (default 10) - the number of objects should be returned ` | 
| `sortType (default desc) - the type of sort, it could be either asc or desc` | 
| `sortBy (default updatedAt) - the property that will used to sort. It could be either updatedAt or title.` | 
| `search - by name` | 

#### Get a single member  (Admin)

```http
  GET /api/v1//members/:{id}
```
Explore more Api Endpoint please visit (https://app.swaggerhub.com/apis-docs/KD_programers/BachelorApi/1.0.0)



## Usage/Examples

### Signing Up a New Member

To sign up a new member, make a POST request to the `/api/v1/signup` endpoint with the following request body:

```javascript

const axios = require('axios');

// Define the API endpoint URL

const endpointUrl = 'https://example.com/api/v1/signup';

// Request body
const requestBody = {
  name: 'mohammdad aymon',
  email: 'mdaiman2016@gmail.com',
  password: 'password123'
};

// Make a POST request to the signup endpoint
axios.post(endpointUrl, requestBody)
  .then((response) => {
    if (response.status === 201) {
      console.log('Signup successful');
      console.log('Response Data:', response.data);
    } else {
      console.error('Signup failed');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  // return a response like 

        {
        code: 201,
        message: "Signup successful",
        data: {
            id:"member_id1111",
            name: "aymon",
            email: "mdaiman201@gmail.com",
            role: "Member",
            token_data: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ",
            refresh_token: "eyJKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            },
            links: {
            self: "/auth/signup",
            signin: "/auth/signin"
            }
        }
        }


```
Explore more please visit (https://app.swaggerhub.com/apis-docs/KD_programers/BachelorApi/1.0.0)

## Credits

This project relies on the following open-source packages and libraries:

- **Express.js**: A fast, unopinionated, and minimalist web framework for Node.js. [Website](https://expressjs.com/)
- **bcrypt**: A library for securely hashing and salting passwords. [GitHub](https://github.com/kelektiv/node.bcrypt.js)
know more check **Requirements** section

### Acknowledgments

Special thanks to the maintainers and contributors of these packages for their valuable work in the open-source community.

### License Information

Please note that each of the referenced packages may have its own license terms. Be sure to review and comply with the licensing terms of each package as specified in its respective repository.

## Testing

### Automated Testing with Jest

[Jest](https://jestjs.io/) is a popular JavaScript testing framework commonly used for testing Node.js applications. It provides a simple and efficient way to write unit tests, integration tests, and end-to-end tests for your code.

#### Running Tests

To run the automated tests for this project using Jest, follow these steps:
1. Ensure you have Jest installed as a development dependency. If not, you can install it using npm:

  ```sh
   npm install --save-dev jest
```
Run the Jest test suite using the following command:

 ```sh
   npm test
```
2. API Testing with Supertest
Supertest is a popular library for making HTTP requests and assertions in Node.js tests. It's commonly used for testing REST APIs and web applications.

### Documentation with Swagger
Swagger is a powerful tool for designing, documenting, and testing APIs. It allows you to define your API using the OpenAPI Specification (formerly known as Swagger Specification) and automatically generates interactive API documentation.
In this example:

- We provide information about automated testing using Jest, including instructions for running tests.
- We showcase an example of API testing using Supertest, along with a sample test case.
- We mention Swagger as a tool for documenting and testing APIs, and we provide a placeholder for your API documentation URL.


###  MongoDB Memory Server for virtual DB

[MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server) is a convenient tool for spinning up an in-memory MongoDB database during testing. It allows you to mock a real MongoDB database, making it ideal for testing without affecting your actual data.

#### Running Tests

To run the automated tests for this project using Jest and MongoDB Memory Server, follow these steps:

1. Ensure you have MongoDB Memory Server installed as development dependencies. If not, you can install them using npm:

   ```sh
   npm install --save-dev mongodb-memory-server


## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out:

- **Name:** Aymon
- **Email:** mdaiman2016@gmail.com
- **GitHub:** [Your GitHub Profile](https://github.com/Aymon2016)
- **LinkedIn:** [Your LinkedIn Profile](https://linkedin.com/in/mohammadAymon)

You can also open an issue on this project's GitHub repository if you encounter any problems or want to report a bug: [Project Issues](https://github.com/Aymon2016/Bachelor_home/issues).


