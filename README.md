# wk12 - hanks-employee-tracker


## Description

The purpose of this project is to invoke Express, Inquirer, mySQL2 packages in javascript to work with a database in a more user-friendly way.
Things to note about this application:
- Originally, my small brain decided to go with sequelize for this project...until well after completing all files in the ./seeds folder and comfirming operation via Insomnia. I left those files and and commented out the related code blocks where used throughout the rest of the project files. I chose not to delete the now-irrelevant files, because I'd like to recall how I worked with sequelize and what mods I made to use the mysql2 package instead.

- The package.json file includes a script to run the code automatically instead of using node server.js in conjunction with npm start, etc.

- The user can run the code without sourcing seeds.sql - they can build a database from scratch if they so choose.

- The .env file is included in the .gitignore to protect my credentials. For those perusing this readme, make sure you create your own .env for database, user, password

The following commands were entered into the terminal to run the application from localhost:
- npm init -y
- npm i express
- npm i mysql2
- npm i console.table 
- mysql -u root -p (enter password)
    - SOURCE db/schema.sql
    - SOURCE db/seeds.sql
    - exit (or open the root folder in another integrated terminal)
- npm start (application begins) 

The tables in the company_db database are linked as follows: 
![Shows relationship between tables](./assets/12-sql-homework-demo-01.png)


## Installation

N/A

## Usage

Here's the [link to the video recording](https://drive.google.com/file/d/1gwu9B5fioD3aYoOliYI1OG5N4ZJOeR_B/view)



## Credits

Resources used:
1) Bootcamp Pre-work Modules in 12-SQL and 13-ORM
2) Documentation linked in the homework activities for mysql2, console.table, etc.

## License

Please refer to the LICENSE in the repository.
