# Register-Login-APIs

### DESCRIPTION
It is NodeJS ,MongoDB app(Backend) where user can register and login using APIs, Json web token is used for nuser authentication and bcryptjs for password encryption.

---

### USING THE APPLICATION

* You can start the app in development mode using command : npm run server .

* You can start app in production mode using command : npm start .

    * **Register**
        - API : http://localhost:5000/api/user (check localhost server for port)
        - Headers : Content-type -> application/json
        - Body : raw JSON -> { "name": "" , "email":"" , "password":""}

    * **Login**
        - API : http://localhost:5000/api/auth (check localhost server for port)
        - Headers : Content-type -> application/json
        - Body : raw JSON -> { "email":"" , "password":""}


---

### LANGUAGES/FRAMEWORKS/TECHNOLOGIES
| | |
| ------ | ------ |
| **Server** | Node.js; Express.js |
| **Database** | MongoDB; Mongoose |
| **User Authentication** | jsonwebtoken; bcryptjs |

---

### AUTHORS:
Aliesa Jackson - [GitHub](https://github.com/prats7)
