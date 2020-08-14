import React from 'react'
import ListaNotas from './components/ListaNotas';
import FormNota from './components/FormNota';
import { multiplicaValor, colocaDesconto } from './notasutil';
import DetalheNota from './components/DetalheNota';
import loadingSvg from '../../../svg-loaders/tail-spin.svg';

export default class Notas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notas: [],
            limite: 10,
            pulos: 0,
            detalheNota: [],
            mercadoria: [],
            mercadoriasCarrinho: [],
            subtotal: 0,
            status: 1
        }
        this.buscaMercadoria = this.buscaMercadoria.bind(this);
        this.listaMercadorias = this.listaMercadorias.bind(this);
        this.preencheCampo = this.preencheCampo.bind(this);
        this.adicionaAoCarrinho = this.adicionaAoCarrinho.bind(this);
        this.changeStatusToZero = this.changeStatusToZero.bind(this);
        this.changeStatusToOne = this.changeStatusToOne.bind(this);
        this.finalizaNota = this.finalizaNota.bind(this);
        this.visualizaNota = this.visualizaNota.bind(this);
        this.geraPDF = this.geraPDF.bind(this);
        this.buscaNotaData = this.buscaNotaData.bind(this);
        this.maisDez = this.maisDez.bind(this)
    }

    changeStatusToOne() {
        this.setState({ status: 1 })
        window.location.reload();
    }

    changeStatusToZero() {
        this.setState({ status: 0 })
    }

    async componentDidMount() {
        const result = await fetch('http://bdpapiserver-com.umbler.net/notas/limite/' + this.state.limite + "/" + this.state.pulos + "/" + sessionStorage.getItem('token'));
        const json = await result.json();
        console.log(json)
        if (json.success) {
            for (let i = 0; i < json.notas[0].length; i++) {
                const ano = json.notas[0][i].data.substring(0, 4);
                const mes = json.notas[0][i].data.substring(5, 7);
                const dia = json.notas[0][i].data.substring(8, 10);
                const nota = { id: json.notas[0][i].id, total: parseFloat(json.notas[0][i].total).toFixed(2).replace('.', ','), data: dia + '/' + mes + '/' + ano, cliente: json.notas[0][i].cliente }
                this.setState({ notas: this.state.notas.concat(nota) });
            }
        } else {
            sessionStorage.removeItem('token')
            window.location.reload();
        }
    }

    async buscaMercadoria(e) {
        const inputBusca = document.querySelector("#buscaMercadoria").value;
        if (inputBusca.length > 1) {
            const result = await fetch('http://bdpapiserver-com.umbler.net/mercadoria/busca/' + inputBusca + '/' + sessionStorage.getItem('token'));
            const json = await result.json();
            if (json.success) {
                this.setState({ mercadoria: json });
            } else if (json.message === "jwt expired") {
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        } else {
            const listaMercadoriasDiv = document.querySelector("#listaMercadoria");
            listaMercadoriasDiv.classList.add("d-none")
            const inputQuant = document.querySelector("#quantidade");
            const inputPreco = document.querySelector("#precoVenda");
            const inputTotal = document.querySelector("#total");
            const inputId = document.querySelector("#idMercadoria");
            const inputdesconto = document.querySelector("#desconto")
            inputQuant.value = ''; inputPreco.value = ''; inputTotal.value = ''; inputId.value = ''; inputdesconto.value = '';

        }
    }

    preencheCampo(e) {
        const busca = document.querySelector("#buscaMercadoria");
        const preco = document.querySelector("#precoVenda");
        const inputId = document.querySelector("#idMercadoria");
        const listaMercadoriasDiv = document.querySelector("#listaMercadoria");
        const pai = e.target.parentElement.parentElement.querySelectorAll("div");
        inputId.value = pai[0].lastChild.getAttribute("id");
        busca.value = pai[0].textContent;
        preco.value = pai[1].textContent;
        listaMercadoriasDiv.classList.toggle('d-none')
    }

    adicionaAoCarrinho() {
        const inputNome = document.querySelector("#buscaMercadoria");
        const inputQuant = document.querySelector("#quantidade");
        const messageErro = document.querySelector("#erroMessage");
        if (inputNome.value === '' || inputQuant.value === '') {
            messageErro.classList.remove('d-none')
            setTimeout(() => {
                messageErro.classList.add('d-none')
            }, 3000)
        } else {
            const inputNome = document.querySelector("#buscaMercadoria");
            const inputQuant = document.querySelector("#quantidade");
            const inputPreco = document.querySelector("#precoVenda");
            const inputTotal = document.querySelector("#total");
            const inputId = document.querySelector("#idMercadoria");
            const desconto = document.querySelector("#desconto");
            const mercadoria = { id: inputId.value, nome: inputNome.value, quant: inputQuant.value, precoVenda: inputPreco.value, total: inputTotal.value, desconto: parseFloat(parseInt(inputQuant.value) * desconto.value.replace(",", ".")) }
            this.setState({ mercadoriasCarrinho: this.state.mercadoriasCarrinho.concat(mercadoria), subtotal: (parseFloat(this.state.subtotal) + parseFloat(mercadoria.total)).toFixed(2) });
            inputNome.value = ''; inputQuant.value = ''; inputPreco.value = ''; inputTotal.value = '';
            this.setState({ mercadoria: [] })
        }

    }

    listaMercadorias() {
        const listaMercadoriasDiv = document.querySelector("#listaMercadoria");
        if (this.state.mercadoria.mercadorias !== undefined) {
            listaMercadoriasDiv.classList.remove("d-none")
            return (
                <div>
                    <div className="row">
                        <div className="col">
                            <label className="pt-3 bold">Nome</label>
                        </div>
                        <div className="col">
                            <label className="pt-3 bold">Preço</label>
                        </div>
                    </div>
                    {this.state.mercadoria.mercadorias.map((item) => {
                        return (
                            <div className="row hover-mercadoria" onClick={this.preencheCampo}>
                                <div className="col p-0">
                                    <p className="d-block p-3 " id={item.id}>{item.nome}</p>
                                </div>
                                <div className="col p-0">
                                    <p className="d-block p-2" precoitem={item.precoVenda}>{item.precoVenda}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    async finalizaNota() {
        const idMercadorias = []; // ids e quant mercadorias
        const cliente = document.getElementById("cliente").value;
        if (this.state.mercadoriasCarrinho.length > 0 && this.state.subtotal > 0) {
            const result = await fetch('http://bdpapiserver-com.umbler.net/notas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ total: this.state.subtotal, cliente: cliente, token: sessionStorage.getItem('token') })
            });

            const nota = await result.json() // id_nota
            for (let i = 0; i < this.state.mercadoriasCarrinho.length; i++) {
                const objeto = { id: parseInt(this.state.mercadoriasCarrinho[i].id), quant: parseInt(this.state.mercadoriasCarrinho[i].quant), desconto: parseFloat(this.state.mercadoriasCarrinho[i].desconto) }
                console.log(objeto.desconto)
                idMercadorias.push(objeto);
                const result = await fetch("http://bdpapiserver-com.umbler.net/vendas", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notaId: nota.id, id_mercadoria: idMercadorias[i].id, quantidade: idMercadorias[i].quant, token: sessionStorage.getItem('token'), desconto: idMercadorias[i].desconto })
                })
            }

        } else {
            console.log('carrinho vazio')
        }
    }

    async geraPDF(e) {
        let id = e.target.getAttribute("idnota")
        let btnPdf = e.target;
        btnPdf.textContent = ""
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", loadingSvg)
        imgTag.setAttribute("width", "24")
        btnPdf.appendChild(imgTag)
        const resultVendas = await fetch("http://bdpapiserver-com.umbler.net/vendas/" + id + '/' + sessionStorage.getItem('token'));
        const jsonVendas = await resultVendas.json();
        const resultNota = await fetch("http://bdpapiserver-com.umbler.net/notas/" + id + '/' + sessionStorage.getItem('token'));
        const jsonNota = await resultNota.json();
        const ano = jsonNota.notas.data.substring(0, 4)
        const mes = jsonNota.notas.data.substring(5, 7)
        const dia = jsonNota.notas.data.substring(8, 10)
        if (jsonVendas.success) {
            let tabela = `
            <h3 style="text-align: center;margin-top:25px;margin-bottom:15px;">Bau Dos Plasticos</h3>
            <h5 style="text-align: center;margin-top:15px;margin-bottom:25px;">Data:${dia + "/" + mes + "/" + ano}</h5>
            <table style="border:1px solid;border-collapse: collapse;font-size:10px;">
            <thead>
                <tr>
                    <td style="border:1px solid;padding:7px">Nome da mercadoria</td>
                    <td style="border:1px solid;padding:7px">Preço</td>
                    <td style="border:1px solid;padding:7px">Quantidade</td>
                    <td style="border:1px solid;padding:7px">Desconto</td>
                    <td style="border:1px solid;padding:7px">Total</td>
                </tr>   
            <thead>`

            for (let i = 0; i < jsonVendas.vendas.length; i++) {
                const resultMercadoria = await fetch("http://bdpapiserver-com.umbler.net/mercadoria/" + jsonVendas.vendas[i].id_mercadoria + "/" + sessionStorage.getItem('token'));
                const jsonMercadoria = await resultMercadoria.json();
                let tr = `
            <tr>
                <td style="padding:5px;text-align:center;border:1px solid">${jsonMercadoria.mercadoria.nome}</td>
                <td style="padding:5px;text-align:center;border:1px solid">${jsonMercadoria.mercadoria.precoVenda.replace('.', ',')}</td>
                <td style="padding:5px;text-align:center;border:1px solid">${jsonVendas.vendas[i].quantidade}</td>
                <td style="padding:5px;text-align:center;border:1px solid">${jsonVendas.vendas[i].desconto}</td>
                <td style="padding:5px;text-align:center;border:1px solid">${(parseFloat(jsonMercadoria.mercadoria.precoVenda) * jsonVendas.vendas[i].quantidade).toFixed(2) - jsonVendas.vendas[i].desconto}</td>
            </tr> `
                tabela += tr;
            }

            tabela += `</thead></table>`
            const result = fetch("http://bdpapiserver-com.umbler.net/notas/pdf", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: sessionStorage.getItem('token'), corpo: tabela })
            }).then(result => {
                return result.json();
            }).then(result => {
                if (result.success) {
                    setTimeout(() => {
                        window.open("http://bdpapiserver-com.umbler.net/pdfnota.pdf")
                        btnPdf.removeChild(btnPdf.childNodes[0]);
                        btnPdf.textContent = "PDF"
                    }, 1000)
                }
            })

        } else {
            sessionStorage.removeItem('token')
            window.location.reload();
        }
    }

    async visualizaNota(e) {
        const nota = await fetch("http://bdpapiserver-com.umbler.net/notas/" + e.target.getAttribute('idnota') + '/' + sessionStorage.getItem('token'));
        const jsonNota = await nota.json();
        console.log(jsonNota)
        if (jsonNota.success) {
            const result = await fetch('http://bdpapiserver-com.umbler.net/vendas/' + jsonNota.notas.id + '/' + sessionStorage.getItem('token'));
            const jsonVendas = await result.json();
            console.log(jsonVendas)
            let mercadorias = [];
            for (let i = 0; i < jsonVendas.vendas.length; i++) {
                const result = await fetch("http://bdpapiserver-com.umbler.net/mercadoria/" + jsonVendas.vendas[i].id_mercadoria + '/' + sessionStorage.getItem('token'))
                const json = await result.json();
                let objeto = { quantidade: jsonVendas.vendas[i].quantidade, nome: json.mercadoria.nome, precoVenda: json.mercadoria.precoVenda, desconto: jsonVendas.vendas[i].desconto }
                mercadorias.push(objeto)
            }
            const ano = jsonNota.notas.data.substring(0, 4);
            const mes = jsonNota.notas.data.substring(5, 7);
            const dia = jsonNota.notas.data.substring(8, 10);
            const data = dia + '/' + mes + '/' + ano;
            const notaDetalhe = { id: jsonNota.notas.id, total: jsonNota.notas.total, data: data, mercadorias: mercadorias, cliente: jsonNota.notas.cliente }
            this.setState({ status: 2, detalheNota: notaDetalhe })
        } else {
            sessionStorage.removeItem('token')
            window.location.reload();
        }
    }

    async buscaNotaData() {
        const datainicial = document.querySelector("#datainicial").value;
        const datafinal = document.querySelector("#datafinal").value;
        if (datainicial != "" || datafinal != "") {
            const result = await fetch("http://bdpapiserver-com.umbler.net/notas/" + datainicial + "/" + datafinal + "/" + sessionStorage.getItem('token'));
            const json = await result.json();
            console.log(json)
            let notas = [];
            if (json.success) {
                for (let i = 0; i < json.notas.length; i++) {
                    const ano = json.notas[i].data.substring(0, 4);
                    const mes = json.notas[i].data.substring(5, 7);
                    const dia = json.notas[i].data.substring(8, 10);
                    const nota = { id: json.notas[i].id, total: parseFloat(json.notas[i].total).toFixed(2).replace('.', ','), data: dia + '/' + mes + '/' + ano, cliente: json.notas[i].cliente }
                    notas.push(nota)
                }
                this.setState({ notas: notas })
            } else {
                sessionStorage.removeItem('token')
                window.location.reload();
            }
            this.setState({ notas: notas })
        }
    }

    async maisDez() {
        const limite = this.state.notas.length + 10;
        const pulos = this.state.pulos + 10;
        const result = await fetch("http://bdpapiserver-com.umbler.net/notas/limite/" + limite + "/" + pulos + "/" + sessionStorage.getItem('token'));
        const json = await result.json();
        let dia, mes, ano;
        if (json.notas[0]) {
            json.notas[0].forEach(item => {
                console.log(item.data)
                ano = item.data.substring(0, 4);
                mes = item.data.substring(5, 7);
                dia = item.data.substring(8, 10);
                const nota = { id: item.id, total: parseFloat(item.total).toFixed(2).replace('.', ','), data: dia + '/' + mes + '/' + ano, cliente: item.cliente }
                this.setState({ notas: this.state.notas.concat(nota), pulos: this.state.pulos + pulos, limite: this.state.limite + limite });
            })
        }
    }

    render() {
        if (this.state.status === 1) {
            return (
                <div className="row">
                    <ListaNotas maisDez={this.maisDez} changeStatusToZero={this.changeStatusToZero} buscaNotaData={this.buscaNotaData} notas={this.state.notas} visualizaNota={(e) => this.visualizaNota} geraPDF={(e) => this.geraPDF} />
                </div>
            )
        } else if (this.state.status === 0) {
            return (
                <div className="row">
                    <FormNota colocaDesconto={colocaDesconto} subtotal={this.state.subtotal} finalizaNota={this.finalizaNota} changeStatusToOne={this.changeStatusToOne} mercadoriasCarrinho={this.state.mercadoriasCarrinho} adicionaAoCarrinho={this.adicionaAoCarrinho} multiplicaValor={multiplicaValor} buscaMercadoria={(e) => this.buscaMercadoria} listaMercadorias={this.listaMercadorias} />
                </div>
            )
        } else if (this.state.status === 2) {
            return (
                <div className="row">
                    <DetalheNota nota={this.state.detalheNota} />
                </div>
            )
        }

    }
}