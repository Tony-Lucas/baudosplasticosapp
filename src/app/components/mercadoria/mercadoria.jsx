import React from 'react';
import ListaMercadoria from './components/ListaMercadoria';
import FormMercadoria from './components/FormMercadoria';

export default class Component extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            mercadorias: []
        }
        this.salvaMercadoria = this.salvaMercadoria.bind(this);
        this.changeStatusToOne = this.changeStatusToOne.bind(this);
        this.changeStatusToZero = this.changeStatusToZero.bind(this);
        this.deletaMercadoria = this.deletaMercadoria.bind(this);
        this.mascaraValor = this.mascaraValor.bind(this);
    }

    async componentDidMount() {
        
        const result = await fetch('http://localhost:3333/mercadoria/' + sessionStorage.getItem('token'));
        const json = await result.json();
        if(json.success === true){
            this.setState({ mercadorias: json.mercadorias });
        }else if(json.message === "jwt expired"){
            sessionStorage.removeItem('token');
            window.location.reload();
        }
        
    }

    async salvaMercadoria() {
        const nome = document.querySelector("#nome").value;
        const precoCompra = document.querySelector("#precoCompra").value;
        const precoVenda = document.querySelector("#precoVenda").value;
        const token = sessionStorage.getItem("token");
        const result = await fetch('http://localhost:3333/mercadoria', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: nome, precoCompra: precoCompra, precoVenda: precoVenda, token: token })
        }).then(result => {
            return result.json();
        }).then(res => {
            if (res.success) {
                const message = document.querySelector("#message");
                message.innerHTML = res.message;
                message.classList.remove('d-none');
                setTimeout(() => {
                    message.classList.add('d-none')
                }, 4000)
            }else if(res.message === "jwt expired"){
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        })
    }

    changeStatusToOne() {
        this.setState({ status: 1 })
    }

    changeStatusToZero() {
        window.location.reload();
        this.setState({ status: 0 })

    }

    async deletaMercadoria(e) {
        const id = parseInt(e.target.getAttribute('idmercadoria'));
        const result = await fetch('http://localhost:3333/mercadoria/' + id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        }).then(result => {
            return result.json();
        }).then(result => {
            if (result.success) {
                window.location.reload();
            }else if(result.message === "jwt expired"){
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        })
    }

    mascaraValor(e){
        console.log(e.target.value)
    }

    render() {
        if (this.state.status === 0) {
            return (
                <div className="row">
                    <ListaMercadoria changeStatus={this.changeStatusToOne} mercadorias={this.state.mercadorias} deletaMercadoria={(e) => this.deletaMercadoria} />
                </div>
            )
        } else {
            return (
                <div className="row">
                    <FormMercadoria salvaMercadoria={this.salvaMercadoria} changeStatus={this.changeStatusToZero} mascaraValor={(e) => this.mascaraValor}/>
                </div>
            )
        }
    }
}