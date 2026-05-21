Backend API Test Cases
1. Happy Path Scenarios
A new user is able to sign up using valid email and password, and the account is created successfully.
A registered user can log in with correct credentials and receives a valid JWT token.
A logged-in user can access the protected /requirements/ endpoint using a valid token.
A user can create a new requirement with valid title, description, and status.
The created requirement is successfully stored and returned with a unique ID.
A user can fetch the list of all requirements and view previously created entries.
Multiple requirements can be created sequentially and retrieved in descending order.

2. Error Path Scenarios
Attempting to sign up with an already registered email results in a 400 error.
Logging in with an incorrect password returns a 401 unauthorized error.
Logging in with a non-existent email returns a 401 unauthorized error.
Accessing a protected endpoint without providing a token returns a 401/403 error.
Accessing a protected endpoint with an invalid or malformed token results in a 401 error.
Sending a request with missing required fields (e.g., title or status) returns a 422 validation error.
Providing incorrect data types in request payload results in a 422 validation error.
Sending improperly formatted JSON in the request body results in a 422 error.

3. Edge Case Scenarios
Submitting an empty request body results in a validation error without crashing the application.
Extremely long strings for fields like title or description are handled without breaking the system.
Special characters in input fields are stored and retrieved correctly.
SQL injection attempts (e.g., '; DROP TABLE users; --) are treated as plain text and do not affect the database.
Duplicate requirement entries are handled consistently based on application logic.
Tampering with the JWT token results in a failed authentication response.
Concurrent creation of multiple requirements does not lead to data inconsistency.
Database connection failures are handled gracefully with appropriate error responses.
If token expiry is implemented, expired tokens are rejected with an authentication error.
