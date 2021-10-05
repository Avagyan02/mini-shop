import express from 'express';
// import formidableMiddleware from 'express-formidable';
// import formDataParse from './middlewares/formDataParse';
import formidable from 'formidable';
import categoryRouter from './api/category/index';
import authRouter from './api/auth/index';
import productRouter from './api/product/index';
import notFound from './utils/notFoundHandler';

const opts = { encoding: 'utf-8', multiples: true };
const form = new formidable.IncomingForm();

const app = express();
app.use(express.json());
// app.use(formDataParse());
// app.use((req, res, next) => {
//   req = form.parse(req);
//   next();
// });
app.use(express.urlencoded({ extended: false }));
app.use('/category', categoryRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);

app.use(notFound);

export default app;
