import express, { request, response } from "express";
const app = express();

app.use(express.json());

app.get('/api/vehicles', (request, response) =>{
  const {id} = request.query;
  const vehicles = [
    {
      id: '1',
      name: '328i e36',
      owner: 'Mateus César',
      type: 'car',
    },
    {
      id: '2',
      name: 'GS-T',
      owner: 'Rafaella Alvarenga',
      type: 'car',
    }
  ]

  if(id) {
  response.send(vehicles.filter(vehicle => vehicle.id == id))
  }
  response.send(vehicles)
});

app.post('/api/vehicles', (request, response) => {

});

app.put('/api/vehicles/:id', (request, response) => {
  
});

app.delete('/api/vehicles/:id', (request, response) => {
  
});

app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000")
})