# Webshop School Project

This is a Webshop project developed as part of a school assignment. It's a full-stack JavaScript application featuring a React frontend and a Node.js backend.

## Table of Contents

-   [Netlify](#netlify)
-   [Installation](#installation)
-   [Running the Project](#running-the-project)

## Netlify

The project is deployed on Netlify and can be accessed at the following URL:

[Webshop](https://webshoppyy.netlify.app/)

## Installation

To set up this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone [repository URL]
    ```
2. Navigate to the project directory:
    ```bash
    cd [project-name]
    ```
3. Install the dependencies for the React application:
    ```bash
    npm install
    ```
4. Navigate to the `server` directory and install the server dependencies:
    ```bash
    cd server
    npm install
    ```

## Running the Project

To run the project on your local machine, follow these steps:

1. In the project root directory, start the React application:

    ```bash
    npm start
    ```

    This will launch the frontend on `http://localhost:3000`.

2. Open a separate terminal window, navigate to the `server` directory, and start the Node.js server:
    ```bash
    cd server
    npm start
    ```
    The server will typically run on `http://localhost:4500`.

Now, you should be able to access the webshop in your browser at `http://localhost:3000`.

> **Note:** Ensure you have Node.js and npm installed on your machine to run this project.

## Pre-configured User Accounts for Testing

The project includes two pre-configured user accounts for comprehensive testing:

1. **Admin Account:**

    - **Email:** `admin@test.com`
    - **Password:** `123`
    - **First Name:** Admin
    - **Last Name:** Beheerder
    - **Role:** admin
    - _Description:_ This account has administrative privileges, allowing testing of features like managing products, viewing all user profiles, and other administrative functions.

2. **Customer Account:**
    - **Email:** `customer@test.com`
    - **Password:** `123`
    - **First Name:** Customer
    - **Last Name:** Klant
    - **Role:** customer
    - _Description:_ This account simulates the typical customer experience, focusing on browsing products, adding them to the cart, and making purchases.

These accounts enable testing the application from both the administrator's and customer's perspectives, demonstrating the versatility and functionality of the webshop.
