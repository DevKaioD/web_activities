async function carregarAlunos() {
    try {
        const response = await fetch('http://localhost:3000/alunos/list');
        const alunos = await response.json();

        const tbody = document.querySelector('#tabela-alunos tbody');
        tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

        alunos.forEacgh(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.ira}</td>
                <td><a href="edit.html?id=${encodeURIComponent(aluno.id)}">Editar</a></td>
                <td>
                    <button class="btn btn-danger" onclick="excluirAluno(${aluno.id})">Excluir</button>
                </td>
            `
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
    }
}

async function carregarMedia() {
    try {
        const response = await fetch('http://localhost:3000/alunos/media');
        const media = await response.json();

        document.getElementById('media').textContent = media.media.toFixed(2);
    } catch (error) {
        console.error('Erro ao carregar média:', error);
    }
}

async function excluirAluno() {
    const confirmed = confirm('Tem certeza que deseja excluir este aluno?');
    if (!confirmed) {
        return;
    }

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const response = await fetch(`http://localhost:3000/alunos/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Aluno excluído com sucesso!');
            window.location.href = 'view.html'; // Redireciona para a lista de alunos
        } else {
            alert('Erro ao excluir aluno.');
        }
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno.');
    }
}


carregarAlunos();
carregarMedia();