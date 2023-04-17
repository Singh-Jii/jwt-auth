const myexpress=require("express")


const my_crypt=require("bcrypt")



require("dotenv").config()


const {my_connecting}=require("./database")


const myapplication=express()


myapplication.use(express.json())



myapplication.listen(process.env.myport,async()=>{


    try{

        await my_connecting


        console.log("database connected");



    }


    catch(er){

        console.log("database doesnot connected");


        console.log(er);


    }


    console.log(`port: ${process.env.myport}`);


    
})