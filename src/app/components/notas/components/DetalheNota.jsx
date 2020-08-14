import React from 'react'

export default props =>
    <div className="col">
        <div className="col col-12" id="listaMercadorias">
            <div className="row">
                <div className="col col-lg-8 centralizar-vertical">
                    <div className="row mt-5 mb-4">
                        <div className="col text-center">
                            <h2 className=" text-dark d-inline">Detalhe Nota</h2>
                        </div>
                    </div>
                    <div className="row mt-5 mb-4">
                        <div className="col text-center">
                            <h4 className="text-dark d-inline">Cliente: <strong>{props.nota.cliente}</strong></h4>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col col-xl-5 col-lg-7 col-md-7 cop-sm-11 mt-5 centralizar-vertical text-center">
                            <div className="row">
                                <span className="bg-primary text-white p-3 col">Data: {props.nota.data}</span>
                                <span className="bg-success text-white p-3 col">Total: R$ {parseFloat(props.nota.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mt-5">
                            <table className="table col-xl-8 col-lg-8 col-md-8 col-sm-11 mt-3 centralizar-vertical" id="tabelaDetalhe">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Preço</th>
                                        <th scope="col">Quantidade</th>
                                        <th scope="col">Desconto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.nota.mercadorias.map(item => {
                                        return (
                                            <tr>
                                                <td>{item.nome}</td>
                                                <td>{item.precoVenda}</td>
                                                <td>{item.quantidade}</td>
                                                <td>{item.desconto}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xl-8 col-lg-8 col-md-8 col-sm-11 mt-3 text-right centralizar-vertical">
                            <a href="/dashboard/notas" className="btn btn-danger text-white mt-4">Voltar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>