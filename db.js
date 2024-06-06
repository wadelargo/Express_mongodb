const {MongoClient} = require('mongodb')

let dbConnection

module.exports ={
    connectDb:() => {
        MongoClient.connect("Mongodb://localhost:27617store")
        .then((client)=>{
            dbConnection = client.db()
        })
        .catch((err) => console.error(err))
    },
    getDB: () =>{
        
    }
}