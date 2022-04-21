const mysql= require ('mysql');
const express=require('express');
const app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.json());

const port=7070
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

app.listen(port,()=>console.log(`Express server is running on the port  on: ${port}`));

app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee',(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                status:200,
                data:rows
            })
        }
    })
  
});
app.delete('/employees/:id',(req,res)=>{
    try {
        mysqlConnection.query('DELETE  FROM Employee WHERE EmpID=?',[req.params.id],(err,message)=>{
            if(err){
                throw err;
            }else{
                res.json({
                    status:304,
                    message:"user was deleted!"
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
   
});