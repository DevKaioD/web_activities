const express = require('express');
const router = express.Router();
const alunos = require('../data/data');
const Aluno = require('../models/aluno');

router.get('/listar', (req, res) => {
    res.json(alunos);
});

router.get('/media', (req, res) => {
    const totalIra = alunos.reduce((acc, aluno) => acc + aluno.ira, 0);
    const mediaIra = totalIra / alunos.length;

    res.json({ mediaIra });
});

router.post('/criar', (req, res) => {
    const json = req.body;
    let id = (alunos[alunos.length - 1].id) + 1;
    
    const novoAluno = new Aluno(id++, json.nome, json.curso, json.ira);

    alunos.push(novoAluno);

    res.status(201).json({mensagem: "Aluno cadastrado com sucesso", aluno: novoAluno});
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, curso, ira } = req.body;

    if (!nome || !curso || !ira) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

    if (alunoIndex === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    alunos[alunoIndex] = new Aluno(id, nome, curso, ira);
    res.json({ mensagem: "Aluno atualizado com sucesso", aluno: alunos[alunoIndex] });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

    if (alunoIndex === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    alunos.splice(alunoIndex, 1);
    res.json({ mensagem: "Aluno removido com sucesso" });
});

module.exports = router;