# URL Shortener API

This is a solution to the URL shortener project on roadmap.sh : https://roadmap.sh/projects/url-shortening-service

This is a simple URL shortening service built with ExpressJS, MySQL as URL database, and mysql npm package. The service allows users to create, retrieve, update, and delete shortened URLs, as well as track the usage statistics of each shortened URL.

## Setups & Installation
### Requirements
* Node.js
* Docker
* npm
### Installation
1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```
2. **Install dependencies:**
```
npm install
```

3. **Initialize database**
```
docker compose up
```

## API Endpoints

### **POST /url**

Create a shortened URL.

- **Request:**
  - **Method:** POST
  - **Content-Type:** `application/json`
  - **Body:**
    ```json
    {
      "longurl": "http://example.com",
      "shorturl": "example",
    }
    ```

- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    {
      "LONGURL": "http://example.com",
      "SHORTURL": "example",
      "CREATEDATE": "2024-08-21T12:00:00Z",
      "UPDATEDATE": "2024-08-21T12:00:00Z"
    }
    ```

- **Description:** Saves a predetermined shortened URL for the provided original URL.

### **GET /url/<short_url>**

Retrieve the original URL by its shortened URL.

- **Request:**
  - **Method:** GET
  - **URL Parameter:** `short_url` (the unique shortened URL)

- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "LONGURL": "http://example.com",
      "SHORTURL": "example",
      "CREATEDATE": "2024-08-21T12:00:00Z",
      "UPDATEDATE": "2024-08-21T12:00:00Z"
    }
    ```

- **Description:** Retrieves the original URL associated with the given shortened code and increments the access count.

### **PUT /url**

Update the original URL associated with a shortened URL.

- **Request:**
  - **Method:** PUT
  - **Content-Type:** `application/json`
  - **Body:**
    ```json
    {
      "longurl": "http://modifiedexample.com",
      "shorturl": "example",
    }
    ```

- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "LONGURL": "http://modifiedexample.com",
      "SHORTURL": "example",
      "CREATEDATE": "2024-08-21T12:00:00Z",
      "UPDATEDATE": "2024-08-21T12:00:00Z"
    }
    ```

- **Description:** Updates the original URL associated with the given shortened URL.

### **DELETE /shorten/<short_url>**

Delete a shortened URL.

- **Request:**
  - **Method:** DELETE
  - **URL Parameter:** `short_url` (the unique shortened code)

- **Response:**
  - **Status Code:** 204 No Content

- **Description:** Deletes the shortened URL associated with the given shortened URL.

### **GET /shorten/<short_url>/stats**

Get the usage statistics for a shortened URL.

- **Request:**
  - **Method:** GET
  - **URL Parameter:** `short_url` (the unique shortened URL)

- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "LONGURL": "http://example.com",
      "SHORTURL": "example",
      "CREATEDATE": "2024-08-21T12:00:00Z",
      "UPDATEDATE": "2024-08-21T12:00:00Z",
      "ACCESSCOUNT": 3
    }
    ```

- **Description:** Retrieves the usage statistics, including the access count, for the given shortened URL.



