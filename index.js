
import fs from 'fs'
import express from 'express'
import path from 'path'


const PORT = process.env.PORT || 8000
const app = express();

app.use(express.json());

let current_timestamp = new Date().toISOString().replaceAll(/:/g,"-");
let file_name = path.join('TimeStamp',`${current_timestamp}.txt`); 

app.get('/',(req,res)=> {
    try{
        
        fs.writeFileSync(file_name,`Today's date and time : ${current_timestamp}`,'utf-8')
        let data = fs.readFileSync(file_name,'utf-8')
        
        //fs.appendFileSync(`${file_name}.txt`,'I am another data','utf-8')
        //data = fs.readFileSync(`${file_name}.txt`,'utf-8')
        res.status(200).send({
            messsage:"data created sucessfully",
            data
        })
       
    }
    catch(err){
        console.log(err);
        res.status(400).send({
            message:err.message.error || 'Internal server error'
        })
    }

})

app.post('/post',(req,res)=> {
    try{

        let add_data = new Date(req.body.data)

        fs.writeFileSync(file_name,add_data,'utf-8')
        let data = fs.readFileSync(file_name,'utf-8')
        
        // fs.appendFileSync(`${file_name}.txt`,'I am another data','utf-8')
        // data = fs.readFileSync(`${file_name}.txt`,'utf-8')
        res.status(200).send({
            messsage:"data created sucessfully",
            data
        })
       
    }
    catch(err){
        console.log(err);
        res.status(400).send({
            message:err.message.error || 'Internal server error'
        })
    }

})

app.put('/add',(req,res)=> {
    try{
        
        fs.appendFileSync(file_name,new Date(req.body.data),'utf-8')
        let data = fs.readFileSync(file_name,'utf-8')
        res.status(200).send({
            messsage:"data updated sucessfully",
            data
        })
       
    }
    catch(err){
        console.log(err);
        res.status(400).send({
            message:err.message.error || 'Internal server error'
        })
    }

})

app.get('/getTextFiles', (req, res) => {
    const folderPath = 'TimeStamp';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(400).send('An error occurred while listing the files from the directory');
        } else {
            const textFiles = files.filter((file) => path.extname(file) === '.txt');
            res.status(200).json(textFiles);
        }
    });
});

// const http = require('http')
// const fs = require('fs')
// const qs = require('querystring')

// const server = new http.createServer((req,res)=>{
//     res.writeHead(200,"OK",{
//         "Content-Type":"application/json"
//     })
//    try {
//     if(req.method==='GET'){
//         let data = fs.readFileSync(`${file_name}.txt`,'utf-8')
//         let response = {
//             statusCode:200,
//             message:"File Read Successfully",
//             data
//         }
//         res.end(JSON.stringify(response))
//     }
//     else if(req.method==='POST'){
//         let stream=''
//         req.on('data',chunk=>{
//             stream += chunk.toString()
//         })

//         req.on('end',()=>{
//             let body = JSON.parse(stream)

//             fs.writeFileSync(`${file_name}.txt`,body.data,'utf-8')

//             res.end(JSON.stringify({
//                 statusCode:200,
//                 message:"File Write Successfully",
//             }))
//         })

      
//     }
//     else if(req.method==='PUT'){
//         let stream=''
//         req.on('data',chunk=>{
//             stream += chunk.toString()
//         })

//         req.on('end',()=>{
//             let body = JSON.parse(stream)

//             fs.appendFileSync(`${file_name}.txt`,body.data,'utf-8')

//             res.end(JSON.stringify({
//                 statusCode:200,
//                 message:"File Updated Successfully",
//             }))
//         })

      
//     }
//     else{
//         res.end(JSON.stringify({
//             statusCode:400,
//             message:"URL Invalid"
//         }))
//     }
    
//    } catch (error) {
//     res.end(JSON.stringify(error))
//    }
// })

app.listen(8000,()=>{
    console.log("Server is listening port 8000")
})