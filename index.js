// const create = require('./api/category/post');
// const update = require('./api/category/put');
// const delCat = require('./api/category/delete');
// const read = require('./api/category/get_one');
// const readMany = require('./api/category/get_many');

const connect = require('./mongodb');
const app = require('./app');
const http = require('http');

http.createServer((req,res) => {}).listen(3000, () => console.log('Server run'));
// app.post('/category', create);
// app.put('/category/:id', update);
// app.delete('/category/:id', delCat);
// app.get('/category/:id', read);
// app.get('/category', readMany);