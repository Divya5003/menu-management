# Menu Management System

## Introduction
The Menu Management System is a backend application built with Node.js and MongoDB. This system allows for managing menu categories, subcategories, and items, enabling flexible organization of menu items.

## Features
- Manage categories, subcategories and items.
- Create and update categories, subcategories and items under them.
- Search items by name.

## Installation

### Prerequisites
- Node.js installed on your machine.
- MongoDB running locally or hosted on a cloud service like MongoDB Atlas.
- Git.

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Divya5003/menu-management.git
   cd menu-management
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   - Create a .env file in the root directory.
   - Add the following environment variables:
   ```bash
   MONGO_URI=mongodb://localhost:27017/menu_management
   ```
4. **Run the Application**:
   ```bash
   node app.js
   ```

## API Endpoints

### Category Endpoints
- Create Category: `POST /categories`
- Get all Categories: `GET /categories`
- Edit Category: `PUT /categories/:id`
- Search Category: `GET /categories/search`

### SubCategory Endpoints
- Create SubCategory: `POST /subcategories`
- Get all SubCategories: `GET /subcategories`
- Edit SubCategory: `PUT /subcategories/:id`
- Search SubCategory: `GET /subcategories/search`

### Item Endpoints
- Create Item: `POST /items`
- Get all Items: `GET /items`
- Edit Item: `PUT /items/:id`
- Search Item: `GET /items/search`
