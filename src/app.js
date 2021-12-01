import express from 'express';
import categoryRouter from './api/category/index';
import authRouter from './api/auth/index';
import productRouter from './api/product/index';
import orderRouter from './api/order/index';
import notFound from './utils/notFoundHandler';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/category', categoryRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(notFound);

export default app;
