package com.example.p2java.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import com.example.p2java.model.AdicionarFavorito;
import java.io.IOException;


@Service
public class PuxarSite {

    public AdicionarFavorito pegarDadosFavorito(String codigoAtivo) {
        try {
            String maiusculo = codigoAtivo.toUpperCase();
            String url = "https://statusinvest.com.br/fundos-imobiliarios/" + codigoAtivo.toLowerCase();
            Document doc = Jsoup.connect(url).get();

            String classeElementosGerais = ".top-info.top-info-1.top-info-md-2.sm.d-flex.justify-between  strong.value";
            String classeValor = "div[title='Valor atual do ativo'] strong.value";
            String classeDividend = "div[title='Dividend Yield com base nos últimos 12 meses'] strong.value";
            String classeRendimento = ".value.d-inline-block.fs-5.fw-900";

            Elements elementosGerais = doc.select(classeElementosGerais);
            Element elementoValor = doc.selectFirst(classeValor);
            Element elementoDividend = doc.selectFirst(classeDividend);
            Element elementoRendimento = doc.selectFirst(classeRendimento);

            if (elementoValor == null || elementoDividend == null || elementosGerais.size() < 4) {
                System.out.println("Não foi possível encontrar todos os dados para o ativo: " + maiusculo);
                return null;
            }else{
                System.out.println("Ativo: " + maiusculo + " encontrado");
            }

            String valorRendimento= elementoRendimento.text().replace(",", ".").trim();
            String valorText = elementoValor.text().replace("R$", "").replace(".", "").replace(",", ".").trim();
            String dividendText = elementoDividend.text().replace("%", "").replace(",", ".").trim();
            String segmentoText = elementosGerais.get(elementosGerais.size() - 1).text().trim();


            AdicionarFavorito favorito = new AdicionarFavorito();

            favorito.setRendimento(Double.parseDouble(valorRendimento));
            favorito.setNome(codigoAtivo.toUpperCase());
            favorito.setValor(Double.parseDouble(valorText));
            favorito.setDividend(Double.parseDouble(dividendText));
            favorito.setSegmento(segmentoText);

            return favorito;

        } catch (IOException | NumberFormatException e) {
            System.err.println("Erro ao buscar dados do ativo " + codigoAtivo + ": " + e.getMessage());
            return null;
        }
    }
}
