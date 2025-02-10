import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controllers.js";
import { authorize } from "../middlewares/auth.middleware.js";

let authRouter = Router();  


authRouter.post('/sign-up', signup);

authRouter.post('/sign-in', signin);

authRouter.post('/sign-out', authorize,signout);

export default authRouter;