import { MongoClient } from "mongodb";

const dbName = "school";
const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

const dbConnection = async () => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('students');

        const result = await collection.find().toArray();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

export default dbConnection;