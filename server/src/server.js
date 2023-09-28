const express = require('express');
const cors = require('cors');
const TodosRoutes = require('./todos.routes');
const app = express();

app.use(express.json());
app.use(cors())
app.use(TodosRoutes);

app.get('/health', (req, res) => {
    return res.json('up')
});
app.listen(3333, () => console.log(`Example app listening on port 3333!`)) 