const form = document.getElementById('form-aluno');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const curso = document.getElementById('curso').value;
    const ira = parseFloat(document.getElementById('ira').value);

    if (!nome || !curso || isNaN(ira)) {
        mensagem.textContent = 'Por favor, preencha todos os campos corretamente.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/alunos/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, curso, ira })
        });

        const data = await response.json();

        if (response.ok) {
            const confirmed = confirm(data.mensagem + ' Deseja voltar a visualização?');
            if (confirmed) {
                window.location.href = 'view.html';
            }
            form.reset();
        } else {
            mensagem.textContent = 'Erro ao cadastrar aluno: ' + data.mensagem;
            console.error('Erro:', data);
        }
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        mensagem.textContent = 'Erro ao cadastrar aluno. Por favor, tente novamente mais tarde.';
    }
});