import React from 'react'

export default props =>
    <div className="col col-12" id="listaMercadorias">
        <div className="row">
            <div className="col col-xl-8 col-md-12 col-sm-12 col-lg-10 centralizar-vertical">
                <div className="row">
                    <div className="col col-12 text-center mt-5 mb-5">
                        <h2 className=" text-dark d-inline">Mercadorias Cadastradas</h2>
                    </div>
                    <div className="col">
                        <div className="row mt-3">
                            <div className="col col-lg-5 col-xl-5 col-md-6 col-sm-10">
                                <input type="text" className="form-control" placeholder="Buscar mercadoria" id="inputMercadoria" onKeyUp={props.buscaMercadoria()} />
                            </div>
                            <div className="col">
                                <button className="btn btn-success float-right mb-4" onClick={props.changeStatus}>Novo</button>
                            </div>
                        </div>
                    </div>
                </div>
            
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">IMG</th>
                            <th scope="col text-break">Nome da mercadoria</th>
                            <th scope="col">Preço de compra</th>
                            <th scope="col">Preço de venda</th>
                            <th scope="col">Deletar/Alterar</th>
                        </tr>
                    </thead>
                    <tbody className="regular">
                        {props.mercadorias.map(mercadoria => {
                            return (
                                <tr>
                                    <td><img src={"http://bdpapiserver-com.umbler.net/" + mercadoria.nomeImg} alt="" width="32" /></td>
                                    <td>{mercadoria.nome}</td>
                                    <td>{mercadoria.precoCompra.toString().replace('.', ',')}</td>
                                    <td>{mercadoria.precoVenda.toString().replace('.', ',')}</td>
                                    <td>
                                        <button className="btn btn-warning col col-sm-12 col-lg-5 col-md-5" idmercadoria={mercadoria.id} nomeimg={mercadoria.nomeImg} onClick={props.alteraMercadoria()}>Alterar</button>
                                        <button className="btn btn-danger col ml-xl-3 ml-md-2 mt-md-0 mt-sm-2 col-sm-12 col-lg-5 col-md-5" idmercadoria={mercadoria.id} nomeimg={mercadoria.nomeImg} onClick={props.deletaMercadoria()}>Deletar</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="row mt-3 mb-5">
            <div className="col">
                <div className="row">
                    <div className="col col-xl-1 col-lg-1 col-md-2 col-sm-4 centralizar-vertical">
                        <button className="col btn btn-primary text-white" onClick={props.maisDez}>Mais 10</button>
                    </div>
                </div>
            </div>
        </div>
    </div>