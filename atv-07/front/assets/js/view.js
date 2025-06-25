async function carregarAlunos() {
    try {
        const response = await fetch('http://localhost:3000/alunos/listar');
        const alunos = await response.json();

        const tbody = document.querySelector('#tabela-alunos tbody');
        tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

        let iraTotal = 0;

        alunos.forEach(aluno => {
            iraTotal += parseFloat(aluno.ira);
            
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
            `;
            tbody.appendChild(tr);
        });

        const mediaIra = alunos.length > 0 ? (iraTotal / alunos.length).toFixed(2) : "0.00";
        document.querySelector('#media').textContent = `Média do IRA: ${mediaIra}`;

    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
    }
}

async function excluirAluno(id) {
    const confirmed = confirm('Tem certeza que deseja excluir este aluno?');
    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/alunos/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            alert('Aluno excluído com sucesso!');
            window.location.href = 'view.html'; // Redireciona para a lista de alunos
            carregarAlunos(); // Recarrega a lista de alunos
        } else {
            alert(data.erro || 'Erro ao excluir aluno.');
        }
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno.');
    }
}

carregarAlunos();