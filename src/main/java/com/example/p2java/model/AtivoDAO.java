package com.example.p2java.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class AtivoDAO {

    @Autowired
    JdbcTemplate inserirNoBanco;


    public void inserirFavoritoNoBanco(AdicionarFavorito dadosFavorito){
        String sql = "INSERT INTO favoritos(nome, valor, dividend, rendimento, segmento) VALUES(?,?,?,?,?)";
        Object[] parametros = new Object[5];
        parametros[0] = dadosFavorito.getNome();
        parametros[1] = dadosFavorito.getValor();
        parametros[2] = dadosFavorito.getDividend();
        parametros[3] = dadosFavorito.getRendimento();
        parametros[4] = dadosFavorito.getSegmento();

        inserirNoBanco.update(sql, parametros);
    }


    public void inserirAtivoNoBanco(AdicionarCarteira dadosCarteira){

        String sql = "INSERT INTO ativos(ativo, valorunitario, quantidade, datacompra, valortotal) VALUES(?,?,?,?,?)";
        Object[] parametros = new Object[5];
        parametros[0] = dadosCarteira.getAtivo();
        parametros[1] = dadosCarteira.getValorunitario();
        parametros[2] = dadosCarteira.getQuantidade();
        parametros[3] = dadosCarteira.getDatacompra();
        parametros[4] = dadosCarteira.getValortotal();

        inserirNoBanco.update(sql, parametros);
        atualizarSaldoTotal();
    }


    public List<Map<String,Object>> puxarTodosAtivos(){
        String sql = "SELECT * FROM ativos;";
        return inserirNoBanco.queryForList(sql);
    }


    public Map<String,Object> puxarAtivo(int id){
        String sql = "SELECT * FROM ativos WHERE id = ?;";
        return inserirNoBanco.queryForMap(sql, id);
    }


    public List<Map<String,Object>> puxarTodosFavoritos(){
        String sql = "SELECT * FROM favoritos;";
        return inserirNoBanco.queryForList(sql);
    }

    public Map<String,Object> puxarFavorito(int id){
        String sql = "SELECT * FROM favoritos WHERE id = ?;";
        return inserirNoBanco.queryForMap(sql, id);
    }


    public List<Map<String,Object>> puxarCompras(){
        String sql = "SELECT MIN(f.id) AS id, f.nome, MIN(f.valor) AS valor, MIN(f.dividend) AS dividend, MIN(f.rendimento) AS rendimento, MIN(f.segmento) AS segmento FROM favoritos AS f LEFT JOIN ativos AS c ON f.nome = c.ativo WHERE c.ativo IS NULL GROUP BY f.nome ORDER BY id;";
        return inserirNoBanco.queryForList(sql);
    }


    public void inserirUsuario(String uid, String email) {
        String sql = "INSERT INTO usuarios(uid, email) VALUES(?,?)";
        Object[] parametros = new Object[2];
        parametros[0] = uid;
        parametros[1] = email;
        inserirNoBanco.update(sql, parametros);
    }

    public void atualizarAtivoNoBanco(AdicionarCarteira dadosCarteira, int id){
        String sql = "UPDATE ativos SET ativo = ?, valorunitario = ?, quantidade = ?, datacompra = ?, valortotal = ? WHERE id = ?";
        Object[] parametros = new Object[6];
        parametros[0] = dadosCarteira.getAtivo();
        parametros[1] = dadosCarteira.getValorunitario();
        parametros[2] = dadosCarteira.getQuantidade();
        parametros[3] = dadosCarteira.getDatacompra();
        parametros[4] = dadosCarteira.getValortotal();
        parametros[5] = id;
        inserirNoBanco.update(sql, parametros);
        atualizarSaldoTotal();
    }

    public void deletarAtivoDoBanco(int id){
        String sql = "DELETE FROM ativos WHERE id = ?;";
        inserirNoBanco.update(sql, id);
        atualizarSaldoTotal();
    }

    public void atualizarFavoritoNoBanco(AdicionarFavorito dadosFavorito, int id){
        String sql = "UPDATE favoritos SET nome = ?, valor = ?, dividend = ?, rendimento = ?, segmento = ? WHERE id = ?";
        Object[] parametros = new Object[6];
        parametros[0] = dadosFavorito.getNome();
        parametros[1] = dadosFavorito.getValor();
        parametros[2] = dadosFavorito.getDividend();
        parametros[3] = dadosFavorito.getRendimento();
        parametros[4] = dadosFavorito.getSegmento();
        parametros[5] = id;
        inserirNoBanco.update(sql, parametros);
    }

    public void deletarFavoritoDoBanco(int id){
        String sql = "DELETE FROM favoritos WHERE id = ?;";
        inserirNoBanco.update(sql, id);
    }

    public Double buscarSaldoTotal() {
        String sql = "SELECT valor_total FROM saldo WHERE id = 1";
        return inserirNoBanco.queryForObject(sql, Double.class);
    }

  
    public void atualizarSaldoTotal() {
        String sql = "SELECT COALESCE(SUM(valortotal), 0.0) FROM ativos";
        Double novoSaldo = inserirNoBanco.queryForObject(sql, Double.class);
        String updateSql = "UPDATE saldo SET valor_total = ? WHERE id = 1";
        inserirNoBanco.update(updateSql, novoSaldo);
    }
}