const express = require('express')
    const {connectDb, getDb} = require('./db')
    const db = require('./db')
    const app = express()

        const cors = required('cors')
        app.use(cors())
        console.log("Starting...")

        let dbConn

        connectDb((err)=> {
            if(!err) {
                app.listen(3000, () => {
                    console.log("Server listening to port 6000")
                })
                dbConn = getDb()
            }else {
                console.error("Can't connect to the server")
            }
        })

        app.get('/products', (req, res) => {
            const Products = [];
            dbConn.collection('Products')
                .find()
                .toArray()
                .then((result) => {
                    Products.push(...result);
                    res.status(200).json(Products);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    res.status(500).json({ error: 'Could not fetch the documents' });
                });
        });

        app.get('/users', (req, res) => {
            const users = [];
            dbConn.collection('users')
                .find()
                .toArray()
                .then((result) => {
                    users.push(...result);
                    res.status(200).json(users);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                    res.status(500).json({ error: 'Could not fetch the documents' });
                });
        });


    let dbConnection

    module.exports = {
        connectDb: (cbFunc) => {
            MongoClient.connect('mongodb://localhost:27017/Store')
            .then((client) => {
                dbConnection = client.db()
                return cbFunc()
            })
            .catch((err) =>{
                console.error(err)
                return cbFunc(err)
            })
        },
        getDb: () => dbConnection
    }