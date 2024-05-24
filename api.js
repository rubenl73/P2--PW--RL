// Função assíncrona para buscar dados da API
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
        console.log('Data:', data); // Adiciona log para verificar os dados recebidos
        displayResults(data);
    } catch (error) {
        console.error('Falha ao buscar dados:', error);
        document.getElementById('resultadosApi').innerHTML = '<p>Erro ao carregar os dados.</p>';
    }
}

// Função para exibir resultados na página
function displayResults(data) {
    const resultsContainer = document.getElementById('resultadosApi');
    let contentHtml = '';

    if (data) {
        if (data.Players) {
            const playersHtml = data.Players.map(player => `<div><p>Player: ${player.Pnm}</p></div>`).join('');
            contentHtml += playersHtml;
        }
        if (data.Teams) {
            const teamsHtml = data.Teams.map(team => `<div><p>Team: ${team.Nm}</p><p>Country: ${team.CoNm}</p></div>`).join('');
            contentHtml += teamsHtml;
        }
        if (data.Stages) {
            const stagesHtml = data.Stages.map(stage => `<div><p>Stage: ${stage.Snm}</p><p>Country: ${stage.Cnm}</p></div>`).join('');
            contentHtml += stagesHtml;
        }

        resultsContainer.innerHTML = contentHtml || '<p>Nenhum resultado encontrado.</p>';
    } else {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
}

// Chamada inicial ao carregar a página
fetchData();
