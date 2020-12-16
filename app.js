const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const PORT=process.env.PORT || 3050;
const app=express();
app.use(express.json());


//Conexión de MySQL
const connection=mysql.createConnection({
    host   : 'localhost',
  user     : 'root',
  password : '',
  database : 'node20_mysql',
  
});

//Route

app.get('/',(req,res)=>{
    res.send('Bienvenido a mi API');
});

// all customers
app.get('/customers',(req,res)=>{
    const sql='select * from customers';
    connection.query(sql, (error,results)=> {
        if (error) throw error;
        if (results.length>0){
            res.json(results);
        }else{
            res.send('Not result');
        }
    })

    // res.send('Lista de customers');
});

app.get('/customers/:id',(req,res)=>{
    // res.send('Get customers by id');
    const {id}=req.params
    const sql=`SELECT * FROM customers WHERE id=${id}`;
    connection.query(sql, (error,result)=> {
        if (error) throw error;
        if (result.length>0){
            res.json(result);
        }else{
            res.send('Not result');
        }
    })

})



app.post('/add',(req,res)=>{
    const sql='INSERT INTO customers SET ?';
    const customerObj={
        name:req.body.name,
        city:req.body.city

    }
    connection.query(sql,customerObj, error=>{
        if(error)throw error;
        res.send('Customer created!!!! :D')
    })


    // res.send('New customer')
});
app.put('/update/:id',(req,res)=>{
    // res.send('Cliente actualizado');
    const {id}=req.params;
    const{name,city}=req.body;
    const sql=`UPDATE customers SET name='${name}', city='${city}' WHERE id=${id}`;
    connection.query(sql, error=>{
        if(error)throw error;
        res.send('Customer updated  !!!! :D')
    })

});

app.delete('/delete/:id',(req,res)=>{
    // res.send('Cliente eliminado');
    const {id}=req.params;
    const sql=`DELETE FROM customers WHERE id= ${id}`;
    
    connection.query(sql, error=>{
        if(error)throw error;
        res.send('DELETE customer  !!!! :D')
    })

});


//Check connect 
connection.connect(error => {
    if(error)throw error;
    console.log('Servidor corriendo ')
})

app.listen(PORT,()=>console.log(`Server  corriendo en puerto ${PORT}`))


