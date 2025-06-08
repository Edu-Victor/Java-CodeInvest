package com.example.p2java.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.p2java.model.AdicionarCarteira;
import com.example.p2java.model.AdicionarFavorito;
import com.example.p2java.service.AtivoService;
import org.springframework.ui.Model;



@Controller
public class FundosController {

    @Autowired
    AtivoService ativoServiceAdd;
    @Autowired
    ApplicationContext context;

    @GetMapping("/")
    public String index(){
        return "1-login";
    }

    @GetMapping("/2-carteira")
    public String carteira(Model model){

        AtivoService cs = context.getBean(AtivoService.class);
        List<Map<String,Object>> lr = cs.puxarTodosAtivos();
        List<AdicionarCarteira> lc = AdicionarCarteira.converterUmAtivo(lr);
        model.addAttribute("clientes",lc);
        Double saldoTotal = cs.buscarSaldoTotal();
        model.addAttribute("saldoTotal", saldoTotal);

        return "2-carteira";
    }

    @GetMapping("/6-opcaodecompra")
    public String opcaodecompra(Model model){
        AtivoService cs = context.getBean(AtivoService.class);
        List<Map<String,Object>> lr = cs.puxarTodasOpcoes();
        List<AdicionarFavorito> lc = AdicionarFavorito.converterUmFavorito(lr);
        model.addAttribute("favoritos",lc);
        Double saldoTotal = cs.buscarSaldoTotal();
        model.addAttribute("saldoTotal", saldoTotal);
        return "6-opcaodecompra";
    }
    

    @GetMapping("/3-favoritos")
    public String favoritos(Model model){
        AtivoService cs = context.getBean(AtivoService.class);
        List<Map<String,Object>> lr = cs.puxarTodosFavoritos();
        List<AdicionarFavorito> lc = AdicionarFavorito.converterUmFavorito(lr);
        model.addAttribute("favoritos",lc);

        Double saldoTotal = cs.buscarSaldoTotal();
        model.addAttribute("saldoTotal", saldoTotal);
        return "3-favoritos";
    }

    @GetMapping("/4-adicionarfavoritos")
    public String adicionarfavoritos(Model model){
        model.addAttribute("addfavorito", new AdicionarFavorito());
        return "4-adicionarfavoritos";
    }

    @GetMapping("/5-adicionarcarteira")
    public String addcarteira(Model model){
        model.addAttribute("addcarteira", new AdicionarCarteira());
        return "5-adicionarcarteira";
    }

    @PostMapping("/adicionarfavorito")
    public String adicionarf(Model model, @ModelAttribute AdicionarFavorito favorito){
        ativoServiceAdd.inserirFavorito(favorito);
        return "redirect:/4-adicionarfavoritos?sucesso=true";
    }

    @PostMapping("/adicionarcarteira")
    public String adicionarc(Model model, @ModelAttribute AdicionarCarteira ativo){
        ativoServiceAdd.inserirAtivo(ativo);
        return "redirect:/5-adicionarcarteira?sucesso=true";
    }

    @PostMapping("/favoritos/fetch-data")
    @ResponseBody
    public AdicionarFavorito buscarFavoritoData(@RequestParam("codigoAtivo") String codigoAtivo) {
        return ativoServiceAdd.buscarDadosFavoritoOnline(codigoAtivo);
    }


    @PostMapping("/api/cadastrarUsuario")
    @ResponseBody
    public ResponseEntity<String> cadastrarUsuario(@RequestBody Map<String, String> dados) {
        String uid = dados.get("uid");
        String email = dados.get("email");
        ativoServiceAdd.inserirUsuarioNoBanco(uid, email);

        return ResponseEntity.ok("UID do usuário inserido com sucesso!");
    }


    @GetMapping("/carteira/editar/{id}")
    @ResponseBody
    public AdicionarCarteira pegarAtivoParaEditar(@PathVariable int id){
        AtivoService cs = context.getBean(AtivoService.class);
        Map<String,Object> reg = cs.puxarAtivo(id);
        return AdicionarCarteira.converterUmAtivo(reg);
    }

    @PostMapping("/carteira/editar/{id}")
    public ResponseEntity<String> atualizarAtivo(@ModelAttribute AdicionarCarteira ativo, @PathVariable int id){
        ativoServiceAdd.atualizarAtivo(ativo, id);
        return ResponseEntity.ok("Ativo atualizado com sucesso!");
    }

    @PostMapping("/carteira/deletar/{id}")
    public ResponseEntity<String> deletarAtivo(@PathVariable int id){
        ativoServiceAdd.deletarAtivo(id);
        return ResponseEntity.ok("Ativo deletado com sucesso!");
    }

    @GetMapping("/favoritos/editar/{id}")
    @ResponseBody
    public AdicionarFavorito pegarFavoritoParaEditar(@PathVariable int id){
        AtivoService cs = context.getBean(AtivoService.class);
        Map<String,Object> reg = cs.puxarFavorito(id);
        return AdicionarFavorito.converterUmFavorito(reg);
    }

    @PostMapping("/favoritos/editar/{id}")
    public ResponseEntity<String> atualizarFavorito(@ModelAttribute AdicionarFavorito favorito, @PathVariable int id){
        ativoServiceAdd.atualizarFavorito(favorito, id);
        return ResponseEntity.ok("Favorito atualizado com sucesso!");
    }

    @PostMapping("/favoritos/deletar/{id}")
    public ResponseEntity<String> deletarFavorito(@PathVariable int id){
        ativoServiceAdd.deletarFavorito(id);
        return ResponseEntity.ok("Favorito deletado com sucesso!");
    }
}