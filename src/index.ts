import { PrismaClient } from "@prisma/client";
import express from "express";
import { log } from "console";
const client = new PrismaClient();//instance of the class

const app = express();
//@ts-ignore
app.get("/users",async (req,res) => {
    const users = await client.user.findMany();
    res.json({
        users
    })
})

app.get("/todos/:id" , async (req,res) => {
    const id = req.params.id;
    const user =await client.user.findFirst({
        where:{
            id:parseInt(id)
        },
        select:{
            Todos:true,
            username:true,
            password:true
        }
    });
    res.json({
        user
    })
})

async function createUser(){

    await client.user.create({
        data:{
           username:"Meerat",
           password:"7020",
           age:21,
           city:"Calicut"
       }
   })

   console.log("The db is updated");
   

}

async function findPeople(){
    const user = await client.user.findFirst({
        where:{
            id:1
        },
        include:{
            Todos:true
        }
    })
    console.log(user);
    

}

findPeople();
//createUser();
console.log("The server is listening on the port 3000");

app.listen(3000);