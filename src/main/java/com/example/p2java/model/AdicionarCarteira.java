package com.example.p2java.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class AdicionarCarteira {

    private int id;
    private String ativo;
    private Double valorunitario, valortotal;
    private Integer quantidade;
    private Date datacompra;


    public AdicionarCarteira() {
    }

    public AdicionarCarteira(String ativo, Double valorunitario, Integer quantidade, Date datacompra, Double valortotal) {
        this.ativo = ativo;
        this.valorunitario = valorunitario;
        this.quantidade = quantidade;
        this.datacompra = datacompra;
        this.valortotal = valortotal;
    }

    public AdicionarCarteira(int id, String ativo, Double valorunitario, Integer quantidade, Date datacompra, Double valortotal) {
        this.id = id;
        this.ativo = ativo;
        this.valorunitario = valorunitario;
        this.quantidade = quantidade;
        this.datacompra = datacompra;
        this.valortotal = valortotal;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAtivo() {
        return ativo;
    }

    public void setAtivo(String ativo) {
        this.ativo = ativo;
    }

    public Double getValorunitario() {
        return valorunitario;
    }

    public void setValorunitario(Double valorunitario) {
        this.valorunitario = valorunitario;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Date getDatacompra() {
        return datacompra;
    }

    public void setDatacompra(Date datacompra) {
        this.datacompra = datacompra;
    }

    public Double getValortotal() {
        return valortotal;
    }

    public void setValortotal(Double valortotal) {
        this.valortotal = valortotal;
    }

    public static AdicionarCarteira converterUmAtivo (Map<String,Object> registro){
        int id = (Integer) registro.get("id");
        String ativo = (String) registro.get("ativo");
        Double valorunitario = (Double) registro.get("valorunitario");
        int quantidade = (Integer) registro.get("quantidade");
        Date datacompra = (Date) registro.get("datacompra");
        Double valortotal = (Double) registro.get("valortotal");
        AdicionarCarteira cli = new AdicionarCarteira(id, ativo, valorunitario, quantidade, datacompra, valortotal);
        return cli;
    }

    public static List<AdicionarCarteira> converterUmAtivo(List<Map<String,Object>> registros){
        List<AdicionarCarteira> aux = new ArrayList<AdicionarCarteira>();
        for(Map<String,Object> reg : registros){
            aux.add(converterUmAtivo(reg));
        }
        return aux;
    }
}
