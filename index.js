const create = require('./api/post');
const update = require('./api/put');
const delCat = require('./api/delete');
const read = require('./api/get_one');
const readMany = require('./api/get_many');
const app = require('./app');

app.post('/category', create);
app.put('/category/:id', update);
app.delete('/category/:id', delCat);
app.get('/category/:id', read);
app.get('/category', readMany);