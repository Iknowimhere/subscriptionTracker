import { Router } from "express";

let subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title:"GET all Subscriptions"}));

subscriptionRouter.get('/:id', (req, res) => res.send({title:"GET Subscription by ID"}));

subscriptionRouter.post('/', (req, res) => res.send({title:"Create Subscription"}));

subscriptionRouter.put('/:id', (req, res) => res.send({title:"Update Subscription by ID"}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title:"Delete Subscription by ID"}));

subscriptionRouter.get('/user/:id', (req, res) => res.send({title:"GET Subscriptions by User ID"}));

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title:"Cancel Subscription by ID"}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title:"GET Upcoming Renewals"}));  


export default subscriptionRouter;