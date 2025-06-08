document.addEventListener("DOMContentLoaded", () => {
    
    var editModal = document.getElementById("editModal");
    var deleteModal = document.getElementById("deleteModal");
    var editFavoritoModal = document.getElementById("editFavoritoModal");
    var deleteFavoritoModal = document.getElementById("deleteFavoritoModal");
    var closeButtons = document.getElementsByClassName("close-button");
    var editButtons = document.querySelectorAll(".ativos-table .btn-editar");
    var deleteButtons = document.querySelectorAll(".ativos-table .btn-excluir");
    var editFavoritoButtons = document.querySelectorAll(".ativos-table .btn-editar");
    var deleteFavoritoButtons = document.querySelectorAll(".ativos-table .btn-excluir");
    var cancelEditButton = document.getElementById("cancelEdit");
    var cancelDeleteButton = document.getElementById("cancelDelete");
    var confirmDeleteButton = document.getElementById("confirmDelete");
    var cancelEditFavoritoButton = document.getElementById("cancelEditFavorito");
    var cancelDeleteFavoritoButton = document.getElementById("cancelDeleteFavorito");
    var confirmDeleteFavoritoButton = document.getElementById("confirmDeleteFavorito");
    var currentAtivoIdToDelete = null;
    var currentFavoritoIdToDelete = null;

    function closeModals() {
        if (editModal) editModal.style.display = "none";
        if (deleteModal) deleteModal.style.display = "none";
        if (editFavoritoModal) editFavoritoModal.style.display = "none";
        if (deleteFavoritoModal) deleteFavoritoModal.style.display = "none";
    }

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            closeModals();
        }
    }
    window.onclick = function(event) {
        if (event.target == editModal || event.target == deleteModal || event.target == editFavoritoModal || event.target == deleteFavoritoModal) {
            closeModals();
        }
    }

    editButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (editModal && window.location.pathname === "/2-carteira") { 
                let ativoId = this.dataset.id;
                fetch(`/carteira/editar/${ativoId}`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById("edit-id").value = data.id;
                        document.getElementById("edit-ativo").value = data.ativo;
                        document.getElementById("edit-valorunitario").value = data.valorunitario;
                        document.getElementById("edit-quantidade").value = data.quantidade;
                        let date = new Date(data.datacompra);
                        let formattedDate = date.toISOString().split('T')[0];
                        document.getElementById("edit-datacompra").value = formattedDate;
                        editModal.style.display = "flex";
                    })
                    .catch(error => console.error('Error fetching ativo data:', error));
            }
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (deleteModal && window.location.pathname === "/2-carteira") {
                currentAtivoIdToDelete = this.dataset.id;
                deleteModal.style.display = "flex";
            }
        });
    });

    if (cancelEditButton) {
        cancelEditButton.addEventListener("click", function() {
            closeModals();
        });
    }

    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener("click", function() {
            closeModals();
        });
    }

    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener("click", function() {
            if (currentAtivoIdToDelete) {
                fetch(`/carteira/deletar/${currentAtivoIdToDelete}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    window.location.reload(); 
                    closeModals();
                })
            }
        });
    }

    let editForm = document.getElementById("editForm");
    if (editForm) {
        editForm.addEventListener("submit", function(event) {
            event.preventDefault();
            let id = document.getElementById("edit-id").value;
            let ativo = document.getElementById("edit-ativo").value;
            let valorunitario = document.getElementById("edit-valorunitario").value;
            let quantidade = document.getElementById("edit-quantidade").value;
            let datacompra = document.getElementById("edit-datacompra").value;

            let formData = new URLSearchParams();
            formData.append('id', id);
            formData.append('ativo', ativo);
            formData.append('valorunitario', valorunitario);
            formData.append('quantidade', quantidade);
            formData.append('datacompra', datacompra);

            fetch(`/carteira/editar/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            })
            .then(() => {
                window.location.reload(); 
                closeModals();
            })
        
        });
    }

    if (window.location.pathname === "/3-favoritos") {
        editFavoritoButtons.forEach(button => {
            button.addEventListener("click", function() {
                let favoritoId = this.dataset.id;
                fetch(`/favoritos/editar/${favoritoId}`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById("edit-favorito-id").value = data.id;
                        document.getElementById("edit-favorito-nome").value = data.nome;
                        document.getElementById("edit-favorito-valor").value = data.valor;
                        document.getElementById("edit-favorito-rendimento").value = data.rendimento;
                        document.getElementById("edit-favorito-dividend").value = data.dividend;
                        document.getElementById("edit-favorito-segmento").value = data.segmento;
                        editFavoritoModal.style.display = "flex";
                    })
                    .catch(error => console.error('Error fetching favorito data:', error));
            });
        });

        deleteFavoritoButtons.forEach(button => {
            button.addEventListener("click", function() {
                currentFavoritoIdToDelete = this.dataset.id;
                deleteFavoritoModal.style.display = "flex";
            });
        });

        if (cancelEditFavoritoButton) {
            cancelEditFavoritoButton.addEventListener("click", function() {
                closeModals();
            });
        }
        if (cancelDeleteFavoritoButton) {
            cancelDeleteFavoritoButton.addEventListener("click", function() {
                closeModals();
            });
        }

        if (confirmDeleteFavoritoButton) {
            confirmDeleteFavoritoButton.addEventListener("click", function() {
                if (currentFavoritoIdToDelete) {
                    fetch(`/favoritos/deletar/${currentFavoritoIdToDelete}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(() => {
                        window.location.reload(); 
                        closeModals();
                    })
                }
            });
        }

        let editFavoritoForm = document.getElementById("editFavoritoForm");
        if (editFavoritoForm) {
            editFavoritoForm.addEventListener("submit", function(event) {
                event.preventDefault();
                let id = document.getElementById("edit-favorito-id").value;
                let nome = document.getElementById("edit-favorito-nome").value;
                let valor = document.getElementById("edit-favorito-valor").value;
                let rendimento = document.getElementById("edit-favorito-rendimento").value;
                let dividend = document.getElementById("edit-favorito-dividend").value;
                let segmento = document.getElementById("edit-favorito-segmento").value;

                let formData = new URLSearchParams();
                formData.append('id', id);
                formData.append('nome', nome);
                formData.append('valor', valor);
                formData.append('rendimento', rendimento);
                formData.append('dividend', dividend);
                formData.append('segmento', segmento);

                fetch(`/favoritos/editar/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString()
                })
                .then(() => {
                    window.location.reload(); 
                    closeModals();
                })
            });
        }
    }   
});