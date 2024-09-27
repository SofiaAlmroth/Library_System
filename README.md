# Library System Backend

This is the backend of the Library System project. The backend handles data management for library items such as books, DVDs, and audiobooks, and provides the necessary API endpoints for the frontend.

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for building APIs
- **PostgreSQL**: Database for storing library information
- **Prisma**: ORM for database management

## Features

- Manage library items such as books, DVDs, and audiobooks
- CRUD operations (Create, Read, Update, Delete) for library categories and items
- Borrowing and returning system for items that can be borrowed
- Sorting and filtering of items by type and category

## API Endpoints

### Categories

- **GET /categories**: Get a list of all categories
- **POST /categories**: Add a new category
- **PUT /categories/:id**: Update a category by ID
- **DELETE /categories/:id**: Delete a category by ID (only if no items are linked to it)

### Library Items

- **GET /items**: Get a list of all library items, with options to filter by type (book, DVD, etc.)
- **POST /items**: Add a new library item (book, DVD, or audiobook)
- **GET /items/:id**: Get details of a specific item by ID
- **PUT /items/:id**: Update an item by ID
- **DELETE /items/:id**: Delete an item by ID

### Borrowing and Returning Items

- **PUT /items/:id/borrow**: Borrow an item (if it’s borrowable)
- **PUT /items/:id/return**: Return a borrowed item

### Example API Request/Response

#### Get All Library Items
```bash
GET /items
```

```json
[
  {
    "id": 1,
    "title": "JavaScript: The Good Parts",
    "type": "book",
    "category": "Programming",
    "isBorrowable": true,
    "borrower": null,
    "borrowDate": null
  },
  {
    "id": 2,
    "title": "Inception",
    "type": "dvd",
    "category": "Movies",
    "isBorrowable": true,
    "borrower": "John Doe",
    "borrowDate": "2024-09-20"
  }
]
```

### Add a New Library Item Example
```bash
POST /items
```


### Request:
```json
{
  "id": 3,
  "title": "Clean Code",
  "type": "book",
  "categoryId": 1,
  "isBorrowable": true
}
```

### Response
```json
{
  "id": 3,
  "title": "Clean Code",
  "type": "book",
  "category": "Programming",
  "isBorrowable": true
}
```

### Borrow an Item Example
```bash
PUT /items/1/borrow
```

### Request:
```json
{
  "id": 1,
  "title": "JavaScript: The Good Parts",
  "type": "book",
  "category": "Programming",
  "isBorrowable": false,
  "borrower": "Jane Doe",
  "borrowDate": "2024-09-25"
}
```
### Response
```json
{
  "id": 1,
  "title": "JavaScript: The Good Parts",
  "type": "book",
  "category": "Programming",
  "isBorrowable": false,
  "borrower": "Jane Doe",
  "borrowDate": "2024-09-25"
}
```
### Environment Variables

To run this project, you will need to set the following environment variables in your .env file:

```env

DATABASE_URL=your_database_url
PORT=your_port_number
```


### Installation and Setup
1. Clone the repository:

```bash
git clone https://github.com/SofiaAlmroth/logistic_app_BE.git
cd logistic_app_BE
```


2. Install dependencies:

```bash
npm install
```

3. Set up the database: Ensure that you have a PostgreSQL database set up and that the `DATABASE_URL` is correctly configured in the `.env` file.

4. Run database migrations (if you're using Prisma):

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm start
```
The server will be running on http://localhost:your_port.

### Future Improvements
- Implement authentication: Add user authentication and authorization for accessing specific endpoints.
- Caching: Implement caching for API responses to improve performance for repeated requests.
- Add pagination: Include pagination for large data sets.
- **React Query**: Use React Query in the frontend to handle server-side data fetching, caching, and updating the UI in real-time. This will make the app more performant and reduce the need for manual API call management.
```
