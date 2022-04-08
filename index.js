const mysql= require ('mysql');
const express=require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json);

var mysqlConnection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'EmployeeDB' 
    });
mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Db connection succeded');
    else
    console.log('DB connection failed \n Error :' + JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log('Express server is running on the port  on:3000'));
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee',(err,rows,fields)=>{
        if(!err)
       res.send(rows);
        else
        console.log(err);
    })
});
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE  FROM Employee WHERE EmpID=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
       res.send('Deleted sucessfully');
        else
        console.log(err);
    })
});