const express = require('express');
const router = express.Router();
const AlunoService = require('../services/alunoService.js');

router.get('/listar', (req, res) => {
    const lista = AlunoService.listarAlunos();
    res.json(lista);
});

router.post('/criar', (req, res) => {
    const { nome, curso, ira } = req.body;

    const aluno = AlunoService.cadastrar({nome, curso, ira});
    res.status(201).json({ mensagem: "Aluno cadastrado com sucesso", aluno });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, curso, ira } = req.body;

    const alunoAtualizado = AlunoService.atualizar(id, { nome, curso, ira });

    res.json({ mensagem: "Aluno atualizado com sucesso", aluno: alunoAtualizado });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const alunoRemovido = AlunoService.remover(id);

    res.json({ mensagem: "Aluno removido com sucesso" });
});

module.exports = router;