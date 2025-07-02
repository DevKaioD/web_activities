async function carregarEstados() {
  const res = await fetch("https://covid19-brazil-api.vercel.app/api/report/v1");
  const dados = await res.json();
  const estados = dados.data;

  const tbody = document.querySelector("#tabela-estados tbody");

  let totalCasos = 0, totalSuspeitos = 0, totalObitos = 0;
  let maiorRel = -Infinity;
  let menorRel = Infinity;
  let linhaMaiorRel = null;
  let linhaMenorRel = null;

  estados.forEach(estado => {
    const { state, uf, cases, suspects, deaths } = estado;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${state}</td>
      <td>${uf}</td>
      <td>${cases}</td>
      <td>${suspects}</td>
      <td>${deaths}</td>
    `;

    totalCasos += cases;
    totalSuspeitos += suspects;
    totalObitos += deaths;

    const rel = deaths === 0 ? Infinity : cases / deaths;

    if (rel > maiorRel) {
      maiorRel = rel;
      linhaMaiorRel = tr;
    }

    if (rel < menorRel) {
      menorRel = rel;
      linhaMenorRel = tr;
    }

    tr.dataset.deaths = deaths;
    tbody.appendChild(tr);
  });

  const qtd = estados.length;
  document.getElementById("media-casos").textContent = (totalCasos / qtd).toFixed(2);
  document.getElementById("media-suspeitos").textContent = (totalSuspeitos / qtd).toFixed(2);
  document.getElementById("media-obitos").textContent = (totalObitos / qtd).toFixed(2);

  const mediaObitos = totalObitos / qtd;
  document.querySelectorAll("#tabela-estados tbody tr").forEach(tr => {
    const obitos = Number(tr.dataset.deaths);
    if (obitos > mediaObitos) tr.classList.add("acima-media");
  });

  if (linhaMaiorRel) linhaMaiorRel.classList.add("maior-relacao");
  if (linhaMenorRel) linhaMenorRel.classList.add("menor-relacao");
}

carregarEstados();
