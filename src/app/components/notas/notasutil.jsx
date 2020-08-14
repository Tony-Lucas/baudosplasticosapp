import React from 'react';

export const multiplicaValor = () => {
    const quant = document.querySelector("#quantidade").value;
    const preco = document.querySelector("#precoVenda").value;
    const total = document.querySelector("#total");
    if (parseInt(quant) > 0) {
        total.value = (parseInt(quant) * parseFloat(preco)).toFixed(2);
    } else {
        total.value = ''
    }
}

export const colocaDesconto = (e) => {
    const quant = document.getElementById("quantidade").value;
    const desconto = document.getElementById("desconto").value.replace(",", ".");
    if (desconto != "") {
        let total = document.getElementById("total");
        let totalValor = parseFloat(total.value);
        total.value = totalValor - (parseInt(quant) * parseFloat(desconto))
    }else{
        multiplicaValor()
    }
}