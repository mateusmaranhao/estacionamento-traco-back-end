import express, { request, response } from "express";
import { openDatabase } from "./database.js";
const app = express();

app.use(express.json());

app.get('/api/vehicles', async (request, response) => {
  const db = await openDatabase();
  const vehicles = await db.all(`
    SELECT * FROM vehicles
  `);
  db.close();
  response.send(vehicles);
});

app.post('/api/vehicles', async (request, response) => {
  const { model, label, type, owner, observation } = request.body;
  const db = await openDatabase();
  const data = await db.run(`
    INSERT INTO vehicles (model, label, type, owner, observation)
    VALUES (?, ?, ?, ?, ?)
  `, [model, label, type, owner, observation]);
  db.close();
  response.send({
    id: data.lastID,
    model, 
    label,
    type, 
    owner,
    observation
  });
});

app.put('/api/vehicles/:id', async (request, response) => {
  const { model, label, type, owner, observation } = request.body;
  const { id } = request.params;

  const db = await openDatabase();

  const vehicle = await db.get(`
    SELECT * FROM vehicles WHERE id = ?
  `, [id]);

  if(vehicle) {
    const data = await db.get(`
    UPDATE vehicles
      SET model = ?,
          label = ?, 
          type = ?, 
          owner = ?, 
          observation = ?
      WHERE id = ?

    `, [model, label, type, owner, observation, id]);
    db.close();
    response.send({
      id,
      model, 
      label, 
      type, 
      owner,
      observation
    });
  }

  db.close();
  response.send(vehicle || {});
});

app.delete('/api/vehicles/:id', async (request, response) => {
  const { id } = request.params;
  const db = await openDatabase();
  const data = await db.run(`
    DELETE FROM vehicles
      WHERE id = ? 
  `, [id]);
  db.close();
  response.send({
    id,
    message: `Veículo [${id}] removido com sucesso.`
  });
});

// Endpoints Activities

app.post('/api/activities/checkin', async (request, response) => {
  const { label } = request.body;
  const db = await openDatabase();

  const vehicle = await db.get(`
    SELECT * FROM vehicles WHERE label = ? 
  `, [label]);

  if(vehicle) {
    const checkinAt = (new Date()).getTime();
    const data = await db.run(`
    INSERT INTO activities (vehicles_id, checkin_at) 
    VALUES (?, ?)
  `, [vehicle.id, checkinAt]);

  db.close();
  response.send({
    vehicles_id: vehicle.id,
    checkin_at: checkinAt, 
    message: `O veículo com a placa [${vehicle.label}] entrou no estacionamento`
  });
  return;
  }
  db.close();
  response.send({
    message: `O veículo com a placa [${label}] não está cadastrada`
  })
});

app.put('/api/activities/checkout', async (request, response) => {

});

app.delete('/api/activities/:id', async (request, response) => {

});

app.get('/api/activities', async (request, response) => {

});

app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000")
})