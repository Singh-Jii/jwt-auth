const myexpress=require("express")


const myroutes= myexpress.Router()


const my_blg=require("../models/model")



myroutes.post("/",async(request,response)=>{


    try{


        const blogging=new my_blg({


            headline: request.body.headline,


            pages: request.body.pages,


            inventor:request.user._id,


        })


        await blogging.save()


        response.status(201).json(blogging)



    }


    catch(er){


        response.status(400).json({messages:er.message})


    }



})



myroutes.get("/",async(request,response)=>{


    try{


        const blogging=await my_blg.find().populate("inventor","my_name","my_mail")


        response.json(blogging);


    }


    catch(er){


        response.status(500).json({messages:er.message});


    }


})




myroutes.put("/:id",async(request,response)=>{


    try{


        const blogging=await my_blg.findById(request.params.id);


        if(!blogging){


            return response.status(404).json({messages:"does not exist"})





        }


        if(!blogging.inventor.equals(request.user._id)){


            return response.status(403).json({messages:"not provided"})


        }


        blogging.headline=request.body.headline


        blogging.pages=request.body.pages


        await blogging.save();


        response.json(blogging)


    }



    catch(er){

        response.status(400).json({messages:er.message})


        }



})



myroutes.delete("/:id",async(request,response)=>{


    try{


        const blogging=await my_blg.findById(request.params.id);


        if(!blogging){


            return response.status(404).json({messages:"not provided"})


        }


        if(!blogging.inventor.equals(request.user._id)){


            return response.status(403).json({messages:"not provided"})



        }


        await blogging.remove();


        response.json({messages:"delete"})



    }



    catch(er){


        response.status(400).json({messages:er.message})


    }



});




myroutes.delete("/:id",async(request,response)=>{


    try{


        const blogging=await my_blg.findById(request.params.id);



        if(!blogging){


            return response.status(404).json({messages:"not exist"})



        }



        await blogging.remove();


        response.json({messages:"delete"})


    }


    catch(er){


        response.status(400).json({messages:er.message})


    }


});




module.exports= myroutes;