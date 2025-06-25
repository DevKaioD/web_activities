const alunos = require('../data/data');
const Aluno = require('../models/aluno');

class AlunoService {
    static listarAlunos() {
        return alunos;
    }

    static cadastrar({ nome, curso, ira }) {
        const id = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;
        const novoAluno = new Aluno(id, nome, curso, ira);

        alunos.push(novoAluno);

        return novoAluno;
    }

    static atualizar(id, { nome, curso, ira }) {
        const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
        if (alunoIndex === -1) {
            throw new Error('Aluno não encontrado');
        }

        alunos[alunoIndex] = { id, nome, curso, ira };

        return alunos[alunoIndex];
    }

    static remover(id) {
        const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
        if (alunoIndex === -1) {
            throw new Error('Aluno não encontrado');
        }

        const alunoRemovido = alunos.splice(alunoIndex, 1)[0];
        return alunoRemovido;
    }

}

module.exports = AlunoService;
