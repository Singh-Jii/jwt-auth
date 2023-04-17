
const myexpress=require("express")



const my_crypt=require("bcrypt")



const mymodel=require("../models/model")


const myroutes=myexpress.Router()


myroutes.post("/signin",async(request,response)=>{


    const {my_name,my_mail,encryption,profesions}=request.body;


    try{


        my_crypt.hash(encryption, 10, async(er,hash)=>{



            const my_clients=new mymodel({my_name,my_mail,encryption,profesions:hash})


            await my_clients.save()


            response.status(200).send({messages: "signin completed"})


        })



    }


    catch(er){

        response.status(400).send({messages: er.message})


    }



})



myroutes.post("/login",async(request,response)=>{


    const {my_mail,encryption}=request.body;



    try{


        const my_clients=await my_clients.findOne({my_mail});


        if(!my_clients){


            return response.status(401).json({messages:"wrong credential"});


        }


        const val_encryption=await my_crypt.compare(encryption,my_clients.encryption)
        
        
        if(!val_encryption){

            return response.status(401).json({messages:"wrong credential"})


        }


        const my_tok=jwt.sign({clientId: my_clients.id},process.env.JWT_SECRET,{


            expiresIn: "5m",


        });



        const my_rt=jwt.sign({clientId: my_clients.id},process.env.JWT_SECRET_REFRESH,{


            expiresIn: "10m",


        });


        response.json({my_tok,my_rt});


    }


    catch(er){


        console.log(er);


        response.status(500).json({messages:"error"});



    }



});





myroutes.post("/refresh",async(request,response)=>{


    const my_rt=request.body.my_rt;



    try{


        const my_dt=jwt.verify(my_rt,process.env.JWT_SECRET_REFRESH)


        const my_clients=await my_clients.findById(my_dt.clientId)


        const my_tok=jwt.sign({clientId: my_clients.id},process.env.JWT_SECRET,{


            expiresIn:"3m",


        });


        response.json({my_tok});



    }


    catch(er){


        console.log(er);


        response.sendStatus(401);


    }



});



module.exports= myroutes;

