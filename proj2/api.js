async function fetchData() {
    const url = 'https://livescore6.p.rapidapi.com/v2/search?Category=soccer&Query=chel';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'f8eaa4c467msh785cf92571925a3p1557aejsn37d7a5d51ada',
            'x-rapidapi-host': 'livescore6.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Presumindo que a resposta é JSON
        displayResults(data);
    } catch (error) {
        console.error('Falha ao buscar dados:', error);
        document.getElementById('resultadosApi').innerHTML = '<p>Erro ao carregar os dados.</p>';
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById('resultadosApi');
    if (data && data.results) {
        const resultsHtml = data.results.map(item => `<div><p>${item.title}</p></div>`).join('');
        resultsContainer.innerHTML = resultsHtml;
    } else {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
}

// Chamada inicial ao carregar a página
fetchData();
