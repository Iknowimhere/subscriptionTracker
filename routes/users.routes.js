import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controllers.js";

let userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);

userRouter.post('/', (req, res) => res.send({title:"Create User"}));

userRouter.put('/:id', (req, res) => res.send({title:"Update User by ID"}));

userRouter.delete('/:id', (req, res) => res.send({title:"Delete User by ID"}));

export default userRouter;