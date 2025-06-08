function criarGraficoDistribuicaoAtivos() {
    // Obter os dados da tabela
    const linhas = document.querySelectorAll('.ativos-table tbody tr');
    const ativos = {};
    
    linhas.forEach(linha => {
        const nome = linha.querySelector('td:nth-child(2)').textContent.trim();
        const quantidade = parseFloat(linha.querySelector('td:nth-child(4)').textContent.trim());
        
        if (ativos[nome]) {
            ativos[nome] += quantidade;
        } else {
            ativos[nome] = quantidade;
        }
    });
    
    // Preparar dados para o gráfico
    const labels = Object.keys(ativos);
    const data = Object.values(ativos);
    const backgroundColors = [
        'rgba(67, 131, 93, 0.8)',
        'rgba(62, 127, 145, 0.8)',
        'rgba(92, 189, 139, 0.8)',
        'rgba(144, 238, 144, 0.8)',
        'rgba(46, 139, 87, 0.8)',
        'rgba(143, 188, 143, 0.8)'
    ];
    
    // Criar o gráfico
    const ctx = document.getElementById('donutChart1').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value} unidades`;
                        }
                    }
                }
            },
            cutout: '50%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}








function criarGraficoPerformanceMensal() {
    // Obter os dados da tabela
    const linhas = document.querySelectorAll('.ativos-table tbody tr');
    const ativos = {};
    
    linhas.forEach(linha => {
        const nome = linha.querySelector('td:nth-child(2)').textContent.trim();
        const dividendoText = linha.querySelector('.vl_dividendo').textContent.trim();
        const dividendo = parseFloat(dividendoText.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
        
        if (ativos[nome]) {
            ativos[nome] += dividendo;
        } else {
            ativos[nome] = dividendo;
        }
    });
    
    // Preparar dados para o gráfico
    const labels = Object.keys(ativos);
    const data = Object.values(ativos);
    const backgroundColors = [
        'rgba(67, 131, 93, 0.8)',
        'rgba(62, 127, 145, 0.8)',
        'rgba(92, 189, 139, 0.8)',
        'rgba(144, 238, 144, 0.8)',
        'rgba(46, 139, 87, 0.8)',
        'rgba(143, 188, 143, 0.8)'
    ];
    
    // Criar o gráfico
    const ctx = document.getElementById('donutChart2').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: R$ ${value.toFixed(2).replace('.', ',')}`; // Formata como moeda
                        }
                    }
                }
            },
            cutout: '50%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}
















document.addEventListener("DOMContentLoaded", () => {
    criarGraficoDistribuicaoAtivos(); // Adicione esta linha
    criarGraficoPerformanceMensal(); // Adicione esta linha
});























// function mostrarSucesso() {
//     const modal = document.getElementById('modal-sucesso');
//     modal.classList.add('mostrar');
//     setTimeout(() => {
//         modal.classList.remove('mostrar');
//     }, 2000);
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const paramsUrl = new URLSearchParams(window.location.search);
//     if (paramsUrl.get('sucesso') === 'true') {
//         mostrarSucesso();
//     }
// });