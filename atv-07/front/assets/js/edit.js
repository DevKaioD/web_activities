const params = new URLSearchParams(window.location.search);
const id = params.get('id');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/alunos/listar');
        const alunos = await response.json();
        const aluno = alunos.find(a => a.id === parseInt(id));

        document.getElementById('nome').value = aluno.nome;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('ira').value = aluno.ira;
    } catch (error) {
        console.error('Erro ao carregar aluno:', error);
        alert('Erro ao carregar os dados do aluno.');
    }
});

document.getElementById('form-editar').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const curso = document.getElementById('curso').value;
    const ira = parseFloat(document.getElementById('ira').value);

    if (!nome || !curso || isNaN(ira)) {
        mensagem.textContent = 'Por favor, preencha todos os campos corretamente.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/alunos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, curso, ira })
        });

        if (response.ok) {
            alert('Aluno atualizado com sucesso!');
            window.location.href = 'view.html';
        } else {
            document.getElementById('mensagem').textContent = 'Erro ao atualizar aluno.';
        }
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        document.getElementById('mensagem').textContent = 'Erro ao atualizar aluno.';
    }
});