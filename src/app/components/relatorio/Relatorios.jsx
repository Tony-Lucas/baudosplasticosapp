import React from 'react'
import loading from '../../../svg-loaders/oval.svg'
import loadingSvg from '../../../svg-loaders/tail-spin.svg';

export default class Relatorios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            lucro: 0,
            desconto: 0,
            vendas: 0,
            total: 0,
            vendasData: 0,
            totalData: 0,
            lucroData: 0,
            descontoData: 0,
            mercadoriasVendidas: []
        }
        this.buscaInformacoes = this.buscaInformacoes.bind(this);
        this.geraPdf = this.geraPdf.bind(this);
    }

    async componentWillMount() {
        const data = new Date();
        const ano = data.getFullYear();
        let mes = (data.getMonth() + 1).toString();
        let dia = data.getDate().toString();
        if (mes.length === 1) {
            mes = 0 + mes
        }
        if (dia.length === 1) {
            dia = 0 + dia;
        }

        const dataformat = ano + '-' + mes + '-' + dia
        const result = await fetch('http://bdpapiserver-com.umbler.net/notas/' + dataformat + '/' + dataformat + '/' + sessionStorage.getItem('token'));
        const resultJson = await result.json();
        let jsonVendas;
        if (resultJson.success) {
            for (let i = 0; i < resultJson.notas.length; i++) {
                const resultVendas = await fetch("http://bdpapiserver-com.umbler.net/vendas/" + resultJson.notas[i].id + '/' + sessionStorage.getItem('token'))
                jsonVendas = await resultVendas.json();
                for (let j = 0; j < jsonVendas.vendas.length; j++) {
                    console.log()
                    const resultMercadoria = await fetch('http://bdpapiserver-com.umbler.net/mercadoria/' + jsonVendas.vendas[j].id_mercadoria + '/' + sessionStorage.getItem('token'));
                    const mercadoriaJson = await resultMercadoria.json();
                    if (mercadoriaJson.mercadoria) {
                        this.setState({ lucro: this.state.lucro + ((parseFloat(mercadoriaJson.mercadoria.precoVenda) - parseFloat(mercadoriaJson.mercadoria.precoCompra)) * jsonVendas.vendas[j].quantidade - (jsonVendas.vendas[j].desconto)) })
                        this.setState({ vendas: resultJson.notas.length, total: this.state.total + resultJson.notas[i].total, desconto: this.state.desconto + jsonVendas.vendas[j].desconto })
                    }

                }
            }
        } else {
            sessionStorage.removeItem('token')
            document.location.reload();
        }
    }

    async buscaInformacoes() {
        this.setState({
            vendasData: 0,
            totalData: 0,
            lucroData: 0,
            mercadoriasVendidas: []
        })

        const datainicial = document.querySelector("#datainicial").value;
        const datafinal = document.querySelector("#datafinal").value;
        const result = await fetch("http://bdpapiserver-com.umbler.net/notas/" + datainicial + "/" + datafinal + "/" + sessionStorage.getItem('token'));
        const json = await result.json();
        let totalData = 0, lucroData = 0, vendasData = 0, desconto = 0, mercadoriasVendidas = [];
        vendasData = json.notas.length;
        const load = document.querySelector('#load');
        const relatorioData = document.querySelector('#relatorioData');
        console.log(relatorioData)
        if (json.success) {
            for (let i = 0; i < json.notas.length; i++) {
                load.classList.remove('d-none')
                const resultVendas = await fetch("http://bdpapiserver-com.umbler.net/vendas/" + json.notas[i].id + '/' + sessionStorage.getItem('token'))
                const jsonVendas = await resultVendas.json()
                totalData += json.notas[i].total
                for (let j = 0; j < jsonVendas.vendas.length; j++) {
                    const resultMercadoria = await fetch("http://bdpapiserver-com.umbler.net/mercadoria/" + jsonVendas.vendas[j].id_mercadoria + '/' + sessionStorage.getItem('token'))
                    const jsonMercadoria = await resultMercadoria.json();
                    lucroData += (parseFloat(jsonMercadoria.mercadoria.precoVenda) - parseFloat(jsonMercadoria.mercadoria.precoCompra)) * jsonVendas.vendas[j].quantidade
                    desconto += jsonVendas.vendas[j].desconto
                    let objeto = {
                        id: jsonMercadoria.mercadoria.id, nome: jsonMercadoria.mercadoria.nome, precoVenda: jsonMercadoria.mercadoria.precoVenda, precoCompra: jsonMercadoria.mercadoria.precoCompra,
                        quantidade: jsonVendas.vendas[j].quantidade, lucro: (parseFloat(jsonMercadoria.mercadoria.precoVenda) - parseFloat(jsonMercadoria.mercadoria.precoCompra)) * jsonVendas.vendas[j].quantidade,
                        desconto: jsonVendas.vendas[j].desconto
                    }
                    mercadoriasVendidas.push(objeto)
                }
            }
            this.setState({ totalData: totalData, vendasData: vendasData, lucroData: lucroData, descontoData: desconto.toFixed(2), mercadoriasVendidas: this.state.mercadoriasVendidas.concat(mercadoriasVendidas) });
            load.classList.add('d-none')
            relatorioData.classList.remove('d-none')
        } else {
            sessionStorage.removeItem('token');
            window.location.reload();
        }
    }

    async geraPdf(e) {

        if (this.state.mercadoriasVendidas.length > 0) {
            const datainicial = document.querySelector("#datainicial").value;
            const datafinal = document.querySelector("#datafinal").value;
            const anoInicial = datainicial.substring(0, 4);
            const mesInicial = datainicial.substring(5, 7);
            const diaInicial = datainicial.substring(8, 10);
            const anoFinal = datafinal.substring(0, 4);
            const mesFinal = datafinal.substring(5, 7);
            const diaFinal = datafinal.substring(8, 10);
            const dataInicial = diaInicial + "/" + mesInicial + "/" + anoInicial
            const dataFinal = diaFinal + "/" + mesFinal + "/" + anoFinal
            const btnPdf = e.target;
            btnPdf.textContent = "";
            let imgTag = document.createElement("img");
            imgTag.setAttribute("src", loadingSvg)
            imgTag.setAttribute("width", "24")
            btnPdf.appendChild(imgTag)
            let tabela = `
            <h3 style="text-align: center;margin-top:25px;margin-bottom:15px;">Bau Dos Plasticos</h3>
            <h5 style="text-align: center;margin-top:15px;margin-bottom:25px;">Data: ${dataInicial} a ${dataFinal}</h5>
            <table style="border:1px solid;border-collapse: collapse;font-size:10px;">
            <thead>
                <tr>
                    <td style="border:1px solid;padding:7px">Nome da mercadoria</td>
                    <td style="border:1px solid;padding:7px">Preço</td>
                    <td style="border:1px solid;padding:7px">Quantidade</td>
                    <td style="border:1px solid;padding:7px">Desconto</td>
                    <td style="border:1px solid;padding:7px">Lucro</td>
                    <td style="border:1px solid;padding:7px">Total</td>
                </tr>   
            <thead>`
            let subtotal = 0;
            this.state.mercadoriasVendidas.forEach(item => {
                subtotal += (parseFloat(item.precoVenda) * parseInt(item.quantidade)) - item.desconto;
                let tr = `
                    <tr>
                        <td style="padding:5px;text-align:center;border:1px solid">${item.nome}</td>
                        <td style="padding:5px;text-align:center;border:1px solid">${item.precoVenda.replace(".", ",")}</td>
                        <td style="padding:5px;text-align:center;border:1px solid">${item.quantidade}</td>
                        <td style="padding:5px;text-align:center;border:1px solid">${item.desconto}</td>
                        <td style="padding:5px;text-align:center;border:1px solid">${(parseFloat(item.precoVenda) * item.quantidade).toFixed(2) - item.desconto}</td>
                        <td style="padding:5px;text-align:center;border:1px solid">${(parseFloat(item.precoVenda) * item.quantidade).toFixed(2) - item.desconto}</td>
                    </tr> `
                tabela += tr;
            })
            const subtotalTag = `<h5 style="text-align: center;margin-top:25px;margin-bottom:25px;">Subtotal: R$ <strong>${subtotal.toFixed(2)}</strong></h5>`
            tabela += `</thead></table>${subtotalTag}`
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
                    }, 3000)
                }
            })
        }

    }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col  centralizar-vertical ">
                        <h2 className="text-dark text-center mt-5 mb-4">Resumo Hoje</h2>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col col-xl-8 col-sm-12 col-md-10 centralizar-vertical p-3">
                        <div className="row">
                            <div className="col col-xl-2 col-md-3 col-sm-8 bg-primary text-white centralizar-vertical p-3 text-center">
                                <h5 className="p-3">Notas</h5>
                                <span className="p-3 bold">{this.state.vendas}</span>
                            </div>
                            <div className="col col-xl-2 col-md-3 col-sm-8 mt-sm-4 mt-lg-0 mt-xl-0 mt-md-0 bg-warning text-white centralizar-vertical p-3 text-center">
                                <h5 className="p-3">Total</h5>
                                <span className="p-2 bold">R$ {parseFloat(this.state.total).toFixed(2)}</span>
                            </div>
                            <div className="col col-xl-2 col-md-3 col-sm-8 mt-sm-4 mt-lg-0 mt-xl-0 mt-md-0 bg-info text-white centralizar-vertical p-3 text-center">
                                <h5 className="p-3">Descontos</h5>
                                <span className="p-2 bold">R$ {parseFloat(this.state.desconto).toFixed(2)}</span>
                            </div>
                            <div className="col col-xl-2 col-md-3 col-sm-8 mt-sm-4 mt-lg-0 mt-xl-0 mt-md-0 bg-success text-white centralizar-vertical p-3 text-center">
                                <h5 className="p-3">Lucro</h5>
                                <span className="p-3 bold">R$ {parseFloat(this.state.lucro).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <h2 className="text-center text-dark mb-5 mt-5">Buscar por data</h2>
                <div className="row mt-3">
                    <div className="col col-xl-4 col-lg-10 col-md-10 col-sm-12 centralizar-vertical">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Data inicial</label>
                                <input type="date" className="form-control" id="datainicial" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Data final</label>
                                <input type="date" className="form-control" id="datafinal" />
                            </div>
                            <div className="col col-sm-12">
                                <button className="btn btn-primary mt-3 float-right" onClick={this.buscaInformacoes}>Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-none" id="load">
                    <div className="col col-8 centralizar-vertical ">
                        <div className="row">
                            <div className="col col-1 centralizar-vertical">
                                <img src={loading} className="col" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-none" id="relatorioData">
                    <div className="col col-xl-9 col-sm-12 col-md-12 centralizar-vertical">
                        <div className="row mt-5">
                            <div className="col col-xl-2 col-md-3 col-sm-3 mt-sm-4 mt-lg-0 mt-xl-0 mt-md-0 bg-primary text-white centralizar-vertical rounded p-3">
                                <span className="">Vendas: {this.state.vendasData}</span>
                            </div>
                            <div className="col col-xl-2 col-md-3 col-sm-3 mt-sm-4 mt-lg-0 mt-xl-0 mt-md-0 bg-warning text-white centralizar-vertical rounded p-3">
                                <span className="">Total: {this.state.totalData.toFixed(2)}</span>
                            </div>
                            <div className="col col-xl-2 col-md-3 col-sm-3 mt-sm-4 mt-lg-0 mt-xl-0 mt-md-0 bg-info text-white centralizar-vertical rounded p-3">
                                <span className="">Desconto: {this.state.descontoData}</span>
                            </div>
                            <div className="col col-xl-2 col-md-3 col-sm-3 mt-sm-4 mt-lg-0 mt-xl-0 mt-md-0 bg-success text-white centralizar-vertical rounded p-3">
                                <span className="">Lucro: {parseFloat(this.state.lucroData).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="row mt-4 mb-5">
                            <div className="col">
                                <div className="row">
                                    <div className="col col-xl-1 col-lg-1 col-md-3 col-sm-4 centralizar-vertical">
                                        <button className="btn btn-primary col" onClick={this.geraPdf}>PDF</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5 mb-5">
                            <div className="col alturatabela">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Preço Compra</th>
                                            <th scope="col">Preco Venda</th>
                                            <th scope="col">Quantidade</th>
                                            <th scope="col">Desconto</th>
                                            <th scope="col">Lucro</th>
                                        </tr>
                                    </thead>
                                    <tbody className="col">
                                        {this.state.mercadoriasVendidas.map(item => {
                                            return (
                                                <tr>
                                                    <td>{item.nome}</td>
                                                    <td>{item.precoCompra}</td>
                                                    <td>{item.precoVenda}</td>
                                                    <td>{item.quantidade}</td>
                                                    <td>{item.desconto}</td>
                                                    <td>{item.lucro.toFixed(2)}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}