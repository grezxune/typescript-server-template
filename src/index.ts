import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import apolloServer from './graph';

const app = express();

app.use(cors());
app.use('/stripeWebhook', (_, res) => res.status(200).send('New!'));

apolloServer.applyMiddleware({ app });

const port = process.env.PORT || process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
