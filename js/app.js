/**
 * Este evento garante que o script só será executado após o carregamento completo do HTML.
 * É uma boa prática para evitar erros de elementos não encontrados.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Seleção de Elementos do DOM ---
    // Mapeamos os elementos HTML para variáveis para fácil acesso.
    const precoInput = document.getElementById('preco');
    const quantidadeInput = document.getElementById('quantidade');
    const descontoInput = document.getElementById('desconto');
    const distanciaInput = document.getElementById('distancia');
    const calcularBtn = document.getElementById('calcularBtn');
    const resultadosDiv = document.getElementById('resultados');
    const boasVindasDiv = document.getElementById('mensagem-boas-vindas');

    // --- Event Listener para o botão de calcular ---
    // Adiciona um "ouvinte" que espera pelo clique no botão para executar a função principal.
    calcularBtn.addEventListener('click', calcularPedidoCompleto);
    
    // =================================================================
    // ATIVIDADE 1: FUNÇÕES BÁSICAS PARA CÁLCULOS
    // =================================================================

    /**
     * 👋 Exibe uma mensagem de boas-vindas na tela.
     */
    function exibirBoasVindas() {
        boasVindasDiv.innerHTML = "<p><strong>Olá! Bem-vindo(a) ao nosso sistema de delivery.</strong></p>";
    }

    /**
     * 🛒 Calcula o subtotal dos itens.
     * @param {number} preco - O preço de um item.
     * @param {number} quantidade - A quantidade de itens.
     * @returns {number} O subtotal calculado.
     */
    function calcularSubtotal(preco, quantidade) {
        return preco * quantidade;
    }

    /**
     * 🎁 Calcula o valor do desconto a ser aplicado.
     * @param {number} valor - O valor sobre o qual o desconto será aplicado.
     * @param {number} percentual - O percentual de desconto.
     * @returns {number} O valor do desconto.
     */
    function calcularDesconto(valor, percentual) {
        return valor * (percentual / 100);
    }

    /**
     * 🚚 Calcula a taxa de entrega baseada na distância.
     * A taxa é de R$ 1.50 por quilômetro.
     * @param {number} distancia - A distância em km.
     * @returns {number} O valor da taxa de entrega.
     */
    function calcularTaxaEntrega(distancia) {
        return distancia * 1.50;
    }

    // =================================================================
    // ATIVIDADE 2 e 4: FUNÇÕES COM RETORNO E ARROW FUNCTIONS
    // As funções `calcularImposto`, `calcularTotalFinal` e `verificarFreteGratis` foram convertidas para Arrow Functions.
    // =================================================================

    /**
     * 💰 (Arrow Function) Retorna o valor do imposto (8% sobre o subtotal).
     * @param {number} subtotal - O subtotal do pedido.
     * @returns {number} O valor do imposto.
     */
    const calcularImposto = (subtotal) => subtotal * 0.08;

    /**
     * 🧾 (Arrow Function) Retorna o valor total final do pedido.
     * @param {number} subtotal - Subtotal dos produtos.
     * @param {number} desconto - Valor do desconto.
     * @param {number} taxaEntrega - Valor da taxa de entrega.
     * @param {number} imposto - Valor do imposto.
     * @returns {number} O total a pagar.
     */
    const calcularTotalFinal = (subtotal, desconto, taxaEntrega, imposto) => {
        return (subtotal - desconto) + taxaEntrega + imposto;
    };
    
    /**
     * 🆓 (Arrow Function) Verifica se o cliente tem direito a frete grátis (pedidos acima de R$ 50).
     * @param {number} subtotalAposDesconto - O valor do subtotal após aplicar descontos.
     * @returns {boolean} Verdadeiro se tiver frete grátis, falso caso contrário.
     */
    const verificarFreteGratis = subtotalAposDesconto => subtotalAposDesconto > 50;


    // =================================================================
    // ATIVIDADE 3: APLICAÇÃO PRÁTICA COMPLETA
    // =================================================================
    
    /**
     * Função principal que orquestra todos os cálculos e exibe os resultados na tela.
     */
    function calcularPedidoCompleto() {
        // Obter valores dos campos de input, convertendo para números. O `|| 0` evita erros se o campo estiver vazio.
        const preco = parseFloat(precoInput.value) || 0;
        const quantidade = parseInt(quantidadeInput.value) || 0;
        const percentualDesconto = parseFloat(descontoInput.value) || 0;
        const distancia = parseFloat(distanciaInput.value) || 0;

        // 1. Calcular Subtotal
        const subtotal = calcularSubtotal(preco, quantidade);

        // 2. Calcular Desconto
        const valorDesconto = calcularDesconto(subtotal, percentualDesconto);
        const subtotalComDesconto = subtotal - valorDesconto;

        // 3. Verificar Frete Grátis e Calcular Taxa de Entrega
        let taxaEntrega = 0;
        const temFreteGratis = verificarFreteGratis(subtotalComDesconto);
        if (!temFreteGratis) {
            taxaEntrega = calcularTaxaEntrega(distancia);
        }
        
        // 4. Calcular Imposto
        const valorImposto = calcularImposto(subtotalComDesconto);
        
        // 5. Calcular Total Final
        const totalFinal = calcularTotalFinal(subtotal, valorDesconto, taxaEntrega, valorImposto);

        // 6. Exibir resultados na área de resultados, formatando os números para duas casas decimais.
        resultadosDiv.innerHTML = `
            <h2>Resumo do Pedido</h2>
            <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
            <p>Desconto (${percentualDesconto}%): - R$ ${valorDesconto.toFixed(2)}</p>
            <p>Imposto (8%): + R$ ${valorImposto.toFixed(2)}</p>
            <p>Taxa de Entrega: ${temFreteGratis ? 'Frete Grátis!' : `+ R$ ${taxaEntrega.toFixed(2)}`}</p>
            <hr>
            <p><strong>Total a Pagar: R$ ${totalFinal.toFixed(2)}</strong></p>
        `;
    }

    // Exibe a mensagem de boas-vindas inicial assim que a página é carregada.
    exibirBoasVindas();
});