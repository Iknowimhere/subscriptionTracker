import express from 'express';
import { PORT } from './config/env.js';
let app = express();    

import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/users.routes.js';
import connectDB from './database/db.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

app.use(express.json());
app.use(arcjetMiddleware)

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen( PORT,async () => {
    console.log(`Subscription api is running on http://localhost:${PORT}`);

    await connectDB();
});