require('dotenv').config();
const mysql = require('mysql2');
const faker = require('@faker-js/faker');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
})

function addData() {
    connection.connect((err) => {
        if (err) {
            console.log('something went wrong');
        }
        
        const query = 'INSERT INTO users (name, age, mobile, email, city) VALUES ?';
        for (let i = 0; i < 50000; i++) {
            
            const values = [
                faker.name.findName(),
                faker.datatype.number({ min: 18, max: 99 }),
                faker.phone.phoneNumber(),
                faker.internet.email(),
                faker.address.city()
            ];
            
            connection.query(query, [[values]], (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log('record inserted');
            });
        }
    })
}
addData();