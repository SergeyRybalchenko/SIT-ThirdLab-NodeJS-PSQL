const client = require('./connection.js')
const express = require('express');
const bodyParser = require("body-parser");
const app = express();


app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/students', (req, res)=>{
    client.query(`Select * from students`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/students/:id', (req, res)=>{
    client.query(`Select * from students where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.use(bodyParser.json());

app.post('/students', (req, res)=> {
    const student = req.body;
    let insertQuery = `INSERT INTO students(id, "firstName", "lastName", "group", "createdAt", "updatedAt")
        VALUES (${student.id}, '${student.firstName}', '${student.lastName}', '${student.group}', '${student.createdAt}', '${student.updatedAt}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/students/:id', (req, res)=> {
    let student = req.body;
    let updateQuery = `UPDATE public.students
	SET "firstName"= '${student.firstName}', "lastName"= '${student.lastName}',
    "group"='${student.group}', "createdAt"='${student.createdAt}', "updatedAt"= '${student.updatedAt}'
	WHERE id = '${req.params.id}'`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/students/:id', (req, res)=> {
    let insertQuery = `delete from students where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})