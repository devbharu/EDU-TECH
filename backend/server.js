import express from 'express';




const app = express();


app.use(express.json());


        app.get("/",(req,res)=> {

           res.json({
            message:"yeah app running"
           })

        })



        app.listen(3000);