import express from 'express';
import categoryRouter from './api/category/index';
import checkRouter from './api/auth/index';
import notFound from './utils/notFoundHandler';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/category', categoryRouter);
app.use('/auth', checkRouter);

app.use(notFound);

export default app;
