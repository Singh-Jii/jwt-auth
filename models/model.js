const  mymongo=require("mongoose")


const my_crypt=require("bcrypt")



const myschema=mymongo.Schema({


    my_name:{


        type:String,

        val:true


    },


    my_mail:{

        type:String,


        val:true,


    },


    encryption:{


        type:String,

        val:true


    },


    profesions:{



        type:String,


        default:"client",



    }



});




const myschema2=mymongo.Schema({


    headline:{


        type:String,

        val:true,



    },


    pages:{


        type:String,


        val:true,



    },


    inventor:{


        type:mymongo.Schema.Types.ObjectId,


        pro:"client",

        val:true,


    }


})




const mymodel=mymongo.model("user",myschema)



const mymodeltwo=mymongo.model("blogging",myschema2)



module.exports={mymodel,mymodeltwo}