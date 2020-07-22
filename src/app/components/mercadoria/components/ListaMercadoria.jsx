import React from 'react'

export default props => 
<div className="col col-12" id="listaMercadorias">
    <div className="row">
        <div className="col col-lg-8 centralizar-vertical">
            <div className="row mt-5 mb-4">
                <div className="col text-center">
                    <h2 className=" text-dark d-inline">Mercadorias Cadastradas</h2>
                </div>
            </div>
            <button className="btn btn-success float-right mb-4" onClick={props.changeStatus}>Novo</button>
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Nome da mercadoria</th>
                        <th scope="col">Preço de compra</th>
                        <th scope="col">Preço de venda</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody className="regular">
                    {props.mercadorias.map(mercadoria =>{
                        return(
                            <tr>
                                <td>{mercadoria.nome}</td>
                                <td>{mercadoria.precoCompra.toString().replace('.',',')}</td>
                                <td>{mercadoria.precoVenda.toString().replace('.',',')}</td>
                                <td>
                                    <button className="btn btn-danger" idmercadoria={mercadoria.id} onClick={props.deletaMercadoria()}>X</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
</div>