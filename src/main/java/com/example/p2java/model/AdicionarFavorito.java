package com.example.p2java.model;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AdicionarFavorito {

    private int id;
    private String nome, segmento;
    private Double valor, dividend, rendimento;

    public AdicionarFavorito() {
    }

    public AdicionarFavorito(String nome, Double valor, Double dividend, Double rendimento, String segmento) {
        this.nome = nome;
        this.valor = valor;
        this.dividend = dividend;
        this.rendimento = rendimento;
        this.segmento = segmento;
    }

    public AdicionarFavorito(int id, String nome, Double valor, Double dividend, Double rendimento, String segmento) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.dividend = dividend;
        this.rendimento = rendimento;
        this.segmento = segmento;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public Double getValor() {
        return valor;
    }
    public void setValor(Double valor) {
        this.valor = valor;
    }
    public Double getDividend() {
        return dividend;
    }
    public void setDividend(Double dividend) {
        this.dividend = dividend;
    }
    public Double getRendimento() {
        return rendimento;
    }
    public void setRendimento(Double rendimento) {
        this.rendimento = rendimento;
    }
    public String getSegmento() {
        return segmento;
    }
    public void setSegmento(String segmento) {
        this.segmento = segmento;
    }


    public static AdicionarFavorito converterUmFavorito (Map<String,Object> registro){
        int id = (Integer) registro.get("id");
        String nome = (String) registro.get("nome");
        Double valor = (Double) registro.get("valor");
        Double dividend = (Double) registro.get("Dividend");
        Double rendimento = (Double) registro.get("rendimento");
        String segmento = (String) registro.get("segmento");
        AdicionarFavorito cli = new AdicionarFavorito(id, nome, valor, dividend, rendimento, segmento);
        return cli;
    }

    public static List<AdicionarFavorito> converterUmFavorito(List<Map<String,Object>> registros){
        List<AdicionarFavorito> aux = new ArrayList<AdicionarFavorito>();
        for(Map<String,Object> reg : registros){
            aux.add(converterUmFavorito(reg));
        }
        return aux;
    }
}