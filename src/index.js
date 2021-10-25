import express, { request, response } from "express";
const app = express();

app.use(express.json());

app.get('/api/ping', (request, response) =>{
  response.send({
    message: 'pong'
  })
})


app.listen(8000, () => {
  console.log("Olá, mundo. Está é minha primeira API!")
})