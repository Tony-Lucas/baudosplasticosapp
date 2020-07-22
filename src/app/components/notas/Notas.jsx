import React from 'react'
import ListaNotas from './components/ListaNotas';
import FormNota from './components/FormNota';
export default class Notas extends React.Component{
    render(){
        return(
            <div className="row">
                <ListaNotas />
                <FormNota />
            </div>
        )
    }
}