const mymongo=require("mongoose");



const my_crypt=require("bcrypt")




require("dotenv").config()



const my_connecting=mymongo.connect(process.env.mylink)


module.exports={my_connecting}