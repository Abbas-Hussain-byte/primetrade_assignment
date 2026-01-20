# Postman Collection Instructions

To test the APIs using Postman:

1. Create a Collection named "Task Manager Assignment".

2. Add a variable `token` to the collection or environment.

3. **Register Request**:
   - Method: POST
   - URL: `http://localhost:5000/api/v1/auth/register`
   - Body (JSON): 
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "role": "user"
     }
     ```

4. **Login Request**:
   - Method: POST
   - URL: `http://localhost:5000/api/v1/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Test Script** (to auto-set token):
     ```javascript
     var jsonData = pm.response.json();
     pm.environment.set("token", jsonData.token);
     ```

5. **Get Tasks (Protected)**:
   - Method: GET
   - URL: `http://localhost:5000/api/v1/tasks`
   - Auth: Bearer Token (Use `{{token}}`)

6. **Create Task (Protected)**:
   - Method: POST
   - URL: `http://localhost:5000/api/v1/tasks`
   - Auth: Bearer Token
   - Body (JSON):
     ```json
     {
       "title": "My First Task",
       "description": "Details here",
       "status": "pending"
     }
     ```

7. **Update Task (Protected)**:
   - Method: PUT
   - URL: `http://localhost:5000/api/v1/tasks/:id` (Replace :id with actual ID)
   - Auth: Bearer Token
   - Body (JSON):
     ```json
     {
       "status": "completed"
     }
     ```

8. **Delete Task (Protected)**:
   - Method: DELETE
   - URL: `http://localhost:5000/api/v1/tasks/:id` (Replace :id with actual ID)
   - Auth: Bearer Token

Repeat for Admin user by registering with `"role": "admin"`.
