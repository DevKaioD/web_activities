const express = require('express');
const cors = require('cors');

const alunosRouter = require('./routes/route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/alunos', alunosRouter);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});