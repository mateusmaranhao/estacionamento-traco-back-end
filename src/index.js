import express, { request, response } from "express";
const app = express();

app.use(express.json());

app.get('/api/vehicles', (request, response) =>{
  const {id} = request.query;
  const vehicles = [
    {
      id: '1',
      name: '328i e36',
      owner: 'Mateus',
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

app.listen(8000, () => {
  console.log("Olá, mundo. Está é minha primeira API!")
})