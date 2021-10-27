import express, { request, response } from "express";
import { checkinActivities, 
         checkoutActivities, 
         listActivities, 
         removeActivities } from "./controllers/activitiesController.js";
import { insertVehicles, 
         listVehicles, 
         removeVehicles, 
         updateVehicles } from "./controllers/vehiclesController.js";

const app = express();

app.use(express.json());

// Endpoints Vehicles
app.get('/api/vehicles', listVehicles);
app.post('/api/vehicles', insertVehicles);
app.put('/api/vehicles/:id', updateVehicles);
app.delete('/api/vehicles/:id', removeVehicles);

// Endpoints Activities
app.post('/api/activities/checkin', checkinActivities);
app.put('/api/activities/checkout', checkoutActivities);
app.delete('/api/activities/:id', removeActivities);
app.get('/api/activities', listActivities);

app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000")
})