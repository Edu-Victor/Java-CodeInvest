package com.example.p2java.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.p2java.model.AdicionarCarteira;
import com.example.p2java.model.AdicionarFavorito;
import com.example.p2java.model.AtivoDAO;


@Service
public class AtivoService {

    @Autowired
    AtivoDAO dadosinserir;

    @Autowired
    PuxarSite scraperService;

    public void inserirFavorito(AdicionarFavorito favorito){
        favorito.setNome(favorito.getNome().toUpperCase());
        dadosinserir.inserirFavoritoNoBanco(favorito);
    }

    public void inserirAtivo(AdicionarCarteira carteira){
        carteira.setAtivo(carteira.getAtivo().toUpperCase());
        dadosinserir.inserirAtivoNoBanco(carteira);
    }

    public AdicionarFavorito buscarDadosFavoritoOnline(String codigoAtivo) {
        return scraperService.pegarDadosFavorito(codigoAtivo);
    }

    public List<Map<String,Object>> puxarTodosAtivos(){
        return dadosinserir.puxarTodosAtivos();
    }

    public Map<String,Object> puxarAtivo(int id){
        return dadosinserir.puxarAtivo(id);
    }

    public List<Map<String,Object>> puxarTodosFavoritos(){
        return dadosinserir.puxarTodosFavoritos();
    }


    public List<Map<String,Object>> puxarTodasOpcoes(){
        return dadosinserir.puxarCompras();
    }

    public Map<String,Object> puxarFavorito(int id){
        return dadosinserir.puxarFavorito(id);
    }

    public void inserirUsuarioNoBanco(String uid, String email) {
        dadosinserir.inserirUsuario(uid, email);
    }

    public void atualizarAtivo(AdicionarCarteira ativo, int id){
        ativo.setValortotal(ativo.getValorunitario()*ativo.getQuantidade());
        ativo.setAtivo(ativo.getAtivo().toUpperCase());
        dadosinserir.atualizarAtivoNoBanco(ativo, id);
    }

    public void deletarAtivo(int id){
        dadosinserir.deletarAtivoDoBanco(id);
    }

    public void atualizarFavorito(AdicionarFavorito favorito, int id){
        favorito.setNome(favorito.getNome().toUpperCase());
        dadosinserir.atualizarFavoritoNoBanco(favorito, id);
    }

    public void deletarFavorito(int id){
        dadosinserir.deletarFavoritoDoBanco(id);
    }

    public Double buscarSaldoTotal() {
        return dadosinserir.buscarSaldoTotal();
    }
}