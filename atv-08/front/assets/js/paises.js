async function carregarPaises() {
  const res = await fetch("https://covid19-brazil-api.vercel.app/api/report/v1/countries");
  const dados = await res.json();
  const paises = dados.data;

  const tbody = document.querySelector("#tabela-paises tbody");

  paises.forEach(pais => {
    const { country, cases, confirmed, deaths, recovered } = pais;
    const tr = document.createElement("tr");

    if (country.toLowerCase() === "brazil") {
      tr.classList.add("brasil");
    }

    tr.innerHTML = `
      <td>${country}</td>
      <td>${cases}</td>
      <td>${confirmed}</td>
      <td>${deaths}</td>
      <td>${recovered}</td>
    `;
    tbody.appendChild(tr);
  });
}

carregarPaises();
