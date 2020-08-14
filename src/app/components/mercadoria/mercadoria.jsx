import React from 'react';
import ListaMercadoria from './components/ListaMercadoria';
import FormMercadoria from './components/FormMercadoria';
import AlteraMercadoriaForm from './components/AlteraMercadoriaForm';

export default class Component extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            limite: 10,
            pulos: 0,
            mercadorias: [],
            buscaMercadorias: [],
            alteraMercadoria: []
        }
        this.changeStatusToOne = this.changeStatusToOne.bind(this);
        this.changeStatusToZero = this.changeStatusToZero.bind(this);
        this.changeStatusToTwo = this.changeStatusToTwo.bind(this)
        this.deletaMercadoria = this.deletaMercadoria.bind(this);
        this.alteraMercadoria = this.alteraMercadoria.bind(this);
        this.buscaMercadoria = this.buscaMercadoria.bind(this)
        this.maisDez = this.maisDez.bind(this)
    }

    async componentDidMount() {
        const result = await fetch('http://bdpapiserver-com.umbler.net/mercadoria/limite/' + this.state.limite + "/" + this.state.pulos + "/" + sessionStorage.getItem('token'));
        const json = await result.json();
        if (json.success === true) {
            this.setState({ mercadorias: this.state.mercadorias.concat(json.mercadoria[0]) });
        } else if (json.message === "jwt expired") {
            sessionStorage.removeItem('token');
            window.location.reload();
        }
    }

    changeStatusToOne() {
        this.setState({ status: 1 })
    }

    changeStatusToZero() {
        window.location.reload();
        this.setState({ status: 0 })
    }

    async changeStatusToTwo(e) {
        const result = await fetch('http://bdpapiserver-com.umbler.net/mercadoria/' + e.target.getAttribute('idmercadoria') + '/' + sessionStorage.getItem('token'));
        const mercadoria = await result.json();
        this.setState({ alteraMercadoria: mercadoria, status: 2 })
    }

    async deletaMercadoria(e) {
        const id = e.target.getAttribute('idmercadoria');
        const nomeimg = e.target.getAttribute('nomeimg');
        const result = await fetch('http://bdpapiserver-com.umbler.net/mercadoria/' + id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token"),
                'nomeimg': nomeimg
            }
        }).then(result => {
            return result.json();
        }).then(result => {
            if (result.success) {
                window.location.reload();
            } else if (result.message === "jwt expired") {
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        })
    }

    async alteraMercadoria(e) {
        const id = e.target.getAttribute('idmercadoria');
        const result = await fetch('http://bdpapiserver-com.umbler.net/mercadoria/' + id + '/' + sessionStorage.getItem('token'));
        const mercadoria = await result.json();
        if (mercadoria.success) {
            this.setState({ alteraMercadoria: mercadoria, status: 2 })
        } else if (result.message === "jwt expired") {
            sessionStorage.removeItem('token');
            window.location.reload();
        }
    }

    async maisDez() {
        const limite = this.state.mercadorias.length + 10;
        const pulos = this.state.pulos + 10;
        const result = await fetch("http://bdpapiserver-com.umbler.net/mercadoria/limite/" + limite + "/" + pulos + "/" + sessionStorage.getItem('token'));
        const json = await result.json();
        this.setState({mercadorias: this.state.mercadorias.concat(json.mercadoria[0]),pulos: pulos ,limite: limite})
    }

    async buscaMercadoria(e) {
        const inputBusca = document.querySelector("#inputMercadoria").value;
        if (inputBusca.length > 1) {
            const result = await fetch("http://bdpapiserver-com.umbler.net/mercadoria/busca/" + inputBusca + '/' + sessionStorage.getItem('token'));
            const json = await result.json();
            if (json.success) {
                this.setState({ mercadorias: [] });
                this.setState({ mercadorias: json.mercadorias })
            } else if (json.message === "jwt expired") {
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        } else {
            const result = await fetch('http://bdpapiserver-com.umbler.net/mercadoria/limite/' + this.state.limite + "/" + this.state.pulos + "/" + sessionStorage.getItem('token'));
            const json = await result.json();
            if (json.success === true) {
                this.setState({ mercadorias: json.mercadoria[0] });
            } else if (json.message === "jwt expired") {
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        }
    }

    render() {
        if (this.state.status === 0) {
            return (
                <div className="row">
                    <ListaMercadoria maisDez={this.maisDez} changeStatus={this.changeStatusToOne} mercadorias={this.state.mercadorias} deletaMercadoria={(e) => this.deletaMercadoria} changeStatusToTwo={(e) => this.changeStatusToTwo} alteraMercadoria={(e) => this.alteraMercadoria} buscaMercadoria={(e) => this.buscaMercadoria} />
                </div>
            )
        } else if (this.state.status === 1) {
            return (
                <div className="row">
                    <FormMercadoria changeStatus={this.changeStatusToZero} mascaraValor={(e) => this.mascaraValor} />
                </div>
            )
        } else if (this.state.status === 2) {
            return (
                <div className="row">
                    <AlteraMercadoriaForm changeStatus={this.changeStatusToZero} mercadoria={this.state.alteraMercadoria} />
                </div>
            )
        }
    }
}