# Bosta Task

### Application Setup:

- make sure you have Docker in your machine
- Clone the github repository

```bash
git clone https://github.com/Ahmed1monm/Library-management-system.git
```

- Make sure the following Ports are not busy
    - 8000
    - 5432
    - 6379
- Run the following command to build and run the system containers

```bash
docker-compose up --build
```

⇒ Now the app should run and connect to PostgreSQL and Redis containers. 

---

<aside>
💡 Make sure that you send TOKEN with every API call.

</aside>

# App Modules:

### Authentication

- The system has 3 user roles each role has ID and users table has FK for that ID.
    - you don’t need to insert these 3 records. when the container been up for the first time, the app will insert them automatically.
- Use `register` from auth directory to create users and chose the user type.
- Types:
    
    ```bash
    {id: 0, name: "Admin"},
    {id: 1, name: "Author"},
    {id: 2, name: "Borrower"},
    ```
    

### Users

- All CRUD operations can be done on users table
- you can list all users from specific type by sending the type in `query params` as documented in the postman package.

 

### Books

- All CRUD operations can be done on books table
- SYSTEM CAN TRACK CHECKED BOOKS by inserting record in `checking_processes` table when user call `get-book` request. system will access user from `token` and book from `id`

### Borrowing Process

- User can borrow, return books
- User can List the books he has  ⇒ end point in profile

### Reports

- User can find some useful reports
    - Overdue borrowing processes
    - All borrowing processes in the previous month.
    - All borrowing processes within date limits [startDate, endDate] and he will receive CSV file contains this data

# App Features

- Basic authentication
- Export CSV files
- Rate limiter on all reports end-points