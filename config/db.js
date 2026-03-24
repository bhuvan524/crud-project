import { MongoClient,ObjectId } from "mongodb";

const dbName = "school";
const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

let db;
const dbConnection = async () => {
    
    if(!db){

        await client.connect();
         db = client.db(dbName);
        console.log('database connected');
    }
       return db;
};

export default dbConnection;