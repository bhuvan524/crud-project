import express from 'express';
import dbConnection from './config/db.js';
import { ObjectId } from "mongodb"; 


const app = express();

app.set("view engine", 'ejs');


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.get('/api',async (req, resp) => {
    const db = await dbConnection();
    //console.log("db con",db);

    const students =await db
     .collection('students')
     .find()
     .toArray(); 

    resp.send(students); 
});

app.get('/ui',async (req, resp) =>{
    const db = await dbConnection();

    const students =await db
     .collection('students')
     .find()
     .toArray(); 

    resp.render('stuProfile',{students});
});

app.get('/add', (req, resp) =>{

    resp.render('addStuInfo');
});

app.post("/submit",async (req, resp) =>{
    const db = await dbConnection();
    const collection = db.collection('students');
    const result = await collection.insertOne(req.body);
    console.log('result');
    resp.send('data saved');
});

app.post("/submit-api",async (req, resp) =>{
    console.log(req.body);

    const {name,branch,rollNo,email} = req.body;
    if(!name || !branch || !rollNo || !email){
        return resp.send({message:"operation",success:false});
        return false;
    }
    const db = await dbConnection();
    const collection = db.collection("students");
    const result = await collection.insertOne(req.body);
        resp.send({message:"data store",success:true,result:result});
});

app.delete("/delete/:id", async (req, resp) =>{
    console.log(req.params.id);
    const db = await dbConnection();
    const collection = db.collection("students");
    const result = await collection.deleteOne({_id:new ObjectId(req.params.id)})
    if(result){
       resp.send({
          message:"student data deleted",
           success:true
       })
    }else{
        resp.send({
           message:"not delete",
           success:false
        })
        
    }

});

app.get("/ui/delete/:id", async (req, resp) =>{
    console.log(req.params.id);
    const db = await dbConnection();
    const collection = db.collection("students");
    const result = await collection.deleteOne({_id: new ObjectId(req.params.id)});
    if(result){
       resp.send("<h1> student data deleted </h1>");
    }else{
        resp.send("<h1> student data deleted </h1>");
        success:false;
        
    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));