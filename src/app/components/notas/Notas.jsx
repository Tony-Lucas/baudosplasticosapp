import React from 'react'
import ListaNotas from './components/ListaNotas';
import FormNota from './components/FormNota';

export default class Notas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mercadoria: []
        }
        this.buscaMercadoria = this.buscaMercadoria.bind(this);
    }

    async buscaMercadoria(e) {
        if (e.target.value.length > 1) {
            const result = await fetch('http://localhost:3333/mercadoria/' + e.target.value + '/' + sessionStorage.getItem('token'));
            const json = await result.json();
            if(json.success){
                this.setState({mercadorias:json});
            }else if(json.message === "jwt expired"){
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        }
    }

    render() {
        return (
            <div className="row">
                <ListaNotas />
                <div className="col col-12">
                    <FormNota buscaMercadoria={(e) => this.buscaMercadoria} mercadorias={this.state.mercadorias}/>
                </div>
            </div>
        )
    }
}