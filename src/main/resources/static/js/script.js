//---------------------------------------------------------------------------------------------------------//
function cadastrar() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('password').value;
    let mensagem = document.getElementById("login-error");
    
    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((credenciaisDoUsuario) => {
        let user = credenciaisDoUsuario.user;
        let uid = user.uid;
        let email = user.email;
        fetch('/api/cadastrarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: uid, email: email }),
        })
    })
    .catch(error => {
        let msg = "Erro ao cadastrar.";
        if (error.code === 'auth/email-already-in-use') {
            msg = "Este e-mail já está em uso.";
        } else if (error.code === 'auth/invalid-email') {
            msg = "E-mail inválido.";
        } else if (error.code === 'auth/weak-password') {
            msg = "A senha deve ter pelo menos 6 caracteres.";
        }
        document.getElementById('login-error').innerText = msg;
        mensagem.style.color = "red";
    });
}
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
function login() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => {
        window.location.href = "/2-carteira";
    })
    .catch(error => {
        document.getElementById('login-error').innerText = "Email ou senha incorretos.";
        document.getElementById('login-error').style.color = "red";
    });
}
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
function logout() {
    firebase.auth().signOut().then(() => {window.location.href = "/";})
}
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
function recuperarSenha() {
    let emailInput = document.getElementById("email");
    let mensagem = document.getElementById("login-error");
    let email = emailInput?.value.trim();

    if (!email) {
        mensagem.textContent = "Por favor, preencha o campo de email para recuperar a senha.";
        mensagem.style.color = "red";
        return;
    }

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        mensagem.textContent = "Se o email estiver cadastrado, enviaremos um link de recuperação.";
        mensagem.style.color = "green";
    })
    .catch(() => {
        mensagem.textContent = "Formato de email inválido";
        mensagem.style.color = "red";
    });
}
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
function statusAutenticacao(){
firebase.auth().onAuthStateChanged(user => {
    let protectedRoutes = [
        "/2-carteira",
        "/3-favoritos",
        "/4-adicionarfavoritos",
        "/5-adicionarcarteira"
    ];

    if (user && window.location.pathname === "/") {
        window.location.href = "/2-carteira";
    }
    else if (!user && protectedRoutes.includes(window.location.pathname)) {
        window.location.href = "/";
    }
});
};
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
function calcularTotal() {
    let valorUnitario = document.getElementById('valor-unitario').value;
    let quantidade = document.getElementById('ativo-quantidade').value;
    
    let total = valorUnitario * quantidade;

    if(total == 0){
        document.getElementById('valor-total').value = ""
    }
    else{
        document.getElementById('valor-total').value = total.toFixed(2);
    }
    
}
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
function atualizarSaldoTable(){

    let selecionarValoresUnitario = document.querySelectorAll('.vl_unitario');
    selecionarValoresUnitario.forEach(celula => {
        let pegarValor = celula.textContent.trim();
        let inserirCifra = "R$ " + pegarValor;
        celula.textContent = inserirCifra;
    });

    let selecionarValoresTotais = document.querySelectorAll('.vl_total');
    selecionarValoresTotais.forEach(celula => {
        let pegarValorTotal = celula.textContent.trim();
        let inserirCifraTotal = "R$ " + pegarValorTotal;
        celula.textContent = inserirCifraTotal;
    })
}
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
function calcularDividendos() {
    let selecionarValoresDividendo = document.querySelectorAll('.ativos-table tbody tr');

    selecionarValoresDividendo.forEach(celula => {
        let vlTotalCelula = celula.querySelector('.vl_total');
        let dividendoCelula = celula.querySelector('.vl_dividendo');
        let valorTexto = vlTotalCelula.textContent.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
        let valorNumerico = parseFloat(valorTexto);
        let calculo = valorNumerico * 0.009;
        dividendoCelula.textContent = "R$ " + calculo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
}
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
function buscarDadosFavorito() {
    let codigoAtivo = document.getElementById('ativo-codigo').value;

    fetch('/favoritos/fetch-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `codigoAtivo=${encodeURIComponent(codigoAtivo)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('ativo-valor').value = data.valor;
        document.getElementById('ativo-dividend').value = data.dividend;
        document.getElementById('ativo-segmento').value = data.segmento;
        document.getElementById('ativo-rendimento').value = data.rendimento;
    });
}
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//

function mostrarSucesso() {
    const modal = document.getElementById('modal-sucesso');
    modal.classList.add('mostrar');
    setTimeout(() => {
        modal.classList.remove('mostrar');
    }, 2000);
}
//---------------------------------------------------------------------------------------------------------//



document.addEventListener("DOMContentLoaded", () => {
    const paramsUrl = new URLSearchParams(window.location.search);
    if (paramsUrl.get('sucesso') === 'true') {
        mostrarSucesso();
    }
    statusAutenticacao()
    atualizarSaldoTable();
    calcularDividendos();
});