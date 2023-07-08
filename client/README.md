# MERN Petty cash management system

<p align="center"><img src="/assets/images/emp-main-view.png"/></p>
This is Petty Cash Management System



### Prerequisites

Create a mongoDB database on your localmachine 

### Connection string | Db connectivity
Create a folder with the name of config and make file Keys.js

module.exports = {
     mongoURI: 'mongodb://localhost:DB_port/table_name'
 }; 

### Installing

Install all dependencies.

Server side dependencies install
```npm install```

Client side dependencies install without going into the client directory
```npm run client-install```

or if inside client directory
```npm install```

## Running The Project

To run both client and server
```npm run dev```

To run just the server
```npm run start```

To run just the client 
```npm run client```

or if inside client directory 
```npm run start```

