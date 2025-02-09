import { Router } from "express";

let userRouter = Router();

userRouter.get('/', (req, res) => res.send({title:"GET all Users"}));
userRouter.get('/:id', (req, res) => res.send({title:"GET User by ID"}));

userRouter.post('/', (req, res) => res.send({title:"Create User"}));

userRouter.put('/:id', (req, res) => res.send({title:"Update User by ID"}));

userRouter.delete('/:id', (req, res) => res.send({title:"Delete User by ID"}));

export default userRouter;