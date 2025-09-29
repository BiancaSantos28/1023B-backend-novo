import { Request, Response } from "express";
import produtosController from "../produtos/produtos.controller.js";

interface ItemCarrinho {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    nome: string;
}

interface Carrinho {
    usuarioId: string;
    itens: ItemCarrinho[];
    dataAtualizacao: Date;
    total: number;
}
class CarrinhoController {
    //adicionarItem
    async adicionarItem(req:Request, res:Response) {
        const { usuarioId, produtoId, quantidade } = req.body;
        //Buscar o produto no banco de dados
        try{
            const produto = await produtosController.findById(produtoId);
            if(!produto){
                return res.status(404).json({message: "Produto não encontrado"});
            }

           //Pegar o preço do produto
        const precoUnitario = produto.preco;
        const nome = produto.nome; 
        
        //Pegar o nome do produto
        let nome = produto.nome;
        
        // Verificar se um carrinho com o usuário já existe
        const carrinhoExistente = await CarrinhoController.findOne({usuarioId});
        // Se não existir deve criar um novo carrinho
        // Se existir, deve adicionar o item ao carrinho existente
        if(!carrinhoExistente){
            const novoCarrinho: Carrinho = {
                usuarioId,
                itens: [{   produtoId, quantidade, precoUnitario, nome}],
                dataAtualizacao: new Date(),
                total: precoUnitario * quantidade,
            };  
        } else {
            const itemExistente = carrinhoExistente.itens.find(item => item.produtoId === produtoId);
            if(itemExistente){
                itemExistente.quantidade += quantidade;
            } else {
                carrinhoExistente.itens.push({produtoId, quantidade, precoUnitario, nome});
            }  
        
        // Calcular o total do carrinho

        // Atualizar a data de atualização do carrinho

        }

    } 

        
       



    //removerItem
    //atualizarQuantidade
    //listar
    //remover                -> Remover o carrinho todo

}
export default new CarrinhoController();