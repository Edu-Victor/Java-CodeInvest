<h1>CodeInvest: Gerenciador de Carteira de Investimentos</h1>

  <p>
        <strong>CodeInvest</strong> é uma aplicação web desenvolvida para auxiliar investidores no acompanhamento de sua carteira de ativos. O sistema permite ao usuário registrar, visualizar e gerenciar seus investimentos, além de monitorar ativos de interesse através de uma lista de favoritos.
    </p>
    <p>
        Uma das principais funcionalidades do projeto é a capacidade de buscar dados atualizados de Fundos Imobiliários (FIIs) em tempo real através de web scraping, automatizando o processo de obtenção de informações como cotação, dividend yield e segmento.
    </p>

  <h2>✨ Funcionalidades Principais</h2>
    <ul>
        <li><strong>Autenticação de Usuários:</strong> Sistema seguro de login e cadastro integrado com o Firebase Authentication.</li>
        <li>
            <strong>Dashboard da Carteira:</strong>
            <ul>
                <li>Visualização clara de todos os ativos da carteira ("Meus Ativos").</li>
                <li>Cálculo automático e exibição do saldo total investido.</li>
                <li>Gráficos para análise da distribuição de ativos e performance (usando Chart.js).</li>
            </ul>
        </li>
        <li>
            <strong>Gerenciamento de Ativos (CRUD):</strong>
            <ul>
                <li>Adicionar novos ativos à carteira com informações de compra (quantidade, valor, data).</li>
                <li>Editar e excluir ativos existentes de forma intuitiva através de modais.</li>
            </ul>
        </li>
        <li>
            <strong>Lista de Favoritos:</strong>
            <ul>
                <li>Adicione e gerencie uma watchlist de ativos que você deseja acompanhar.</li>
                <li><strong>Busca de Dados em Tempo Real:</strong> Ao adicionar um novo favorito, o sistema utiliza <strong>Jsoup</strong> para fazer web scraping do site <code>statusinvest.com.br</code> e preencher automaticamente os dados do ativo.</li>
            </ul>
        </li>
        <li><strong>Sugestão de Compra:</strong> Uma tela de "Opções de Compra" que exibe de forma inteligente os ativos da sua lista de favoritos que você ainda não possui em carteira.</li>
    </ul>

  <h2>🛠️ Tecnologias Utilizadas</h2>
  <h4>Backend</h4>
  <ul>
        <li><strong>Java</strong></li>
        <li><strong>Spring Boot:</strong> Framework principal para a construção da aplicação.</li>
        <li><strong>Spring Web:</strong> Para criar os endpoints REST e servir as páginas web.</li>
        <li><strong>JDBC Template:</strong> Para a persistência e comunicação com o banco de dados.</li>
        <li><strong>Jsoup:</strong> Biblioteca para extração e manipulação de dados HTML (web scraping).</li>
    </ul>

  <h4>Frontend</h4>
    <ul>
        <li><strong>HTML5</strong> e <strong>CSS3</strong></li>
        <li><strong>Thymeleaf:</strong> Motor de templates para renderizar as páginas no lado do servidor.</li>
        <li><strong>JavaScript:</strong> Para interatividade do cliente, manipulação de modais e chamadas assíncronas (AJAX).</li>
        <li><strong>Chart.js:</strong> Para a criação de gráficos dinâmicos no dashboard.</li>
        <li><strong>Font Awesome:</strong> Biblioteca de ícones.</li>
    </ul>

  <h4>Autenticação e Banco de Dados</h4>
    <ul>
        <li><strong>Firebase Authentication:</strong> Para o sistema de autenticação de usuários.</li>
        <li><strong>Banco de Dados Relacional (ex: PostgreSQL, MySQL):</strong> A aplicação está configurada para usar um banco de dados SQL através do <code>JdbcTemplate</code>.</li>
    </ul>

  <h2>🏛️ Arquitetura</h2>
    <p>O projeto segue uma arquitetura MVC (Model-View-Controller) simplificada:</p>
    <ul>
        <li><strong>Controller (<code>com.example.p2java.controller</code>):</strong> <code>FundosController</code> gerencia as requisições HTTP, processa os dados de entrada e define qual view será retornada.</li>
        <li><strong>Model (<code>com.example.p2java.model</code>):</strong> Contém as classes de domínio (<code>AdicionarCarteira</code>, <code>AdicionarFavorito</code>) e o <code>AtivoDAO</code> para acesso aos dados.</li>
        <li><strong>Service (<code>com.example.p2java.service</code>):</strong> Camada de serviço (<code>AtivoService</code>, <code>PuxarSite</code>) que contém a lógica de negócio, como o web scraping e a comunicação com o DAO.</li>
        <li><strong>View (<code>src/main/resources/templates</code>):</strong> Arquivos HTML com Thymeleaf que compõem a interface do usuário.</li>
    </ul>

