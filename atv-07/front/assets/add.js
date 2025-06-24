const form = document.getElementById('form-aluno');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const curso = document.getElementById('curso').value;
    const ira = parseFloat(document.getElementById('ira').value);

    try {
        const response = await fetch('http://localhost:3000/alunos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, curso, ira })
        });

        if (response.ok) {
            alert('Aluno cadastrado com sucesso!');
            window.location.href = 'view.html'; // Redireciona para a lista de alunos
        } else {
            alert('Erro ao cadastrar aluno.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        alert('Erro ao cadastrar aluno.');
    }
});