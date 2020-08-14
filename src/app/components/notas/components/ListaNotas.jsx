import React from 'react'

export default props =>
    <div className="col col-12" id="listaMercadorias">
        <div className="row">
            <div className="col col-xl-6 centralizar-vertical">
                <div className="row mt-5 mb-5">
                    <div className="col text-center">
                        <h2 className=" text-dark d-inline">Notas</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <input type="date" className="form-control" id="datainicial" />
                            </div>
                            <div className="col">
                                <input type="date" className="form-control" id="datafinal" />
                            </div>
                            <div className="col">
                                <button className="btn btn-primary" onClick={props.buscaNotaData}>Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <button className="btn btn-success float-right mb-4" onClick={props.changeStatusToZero}>Nova</button>
                    </div>
                </div>
                <table className="table" id="tabela">
                    <thead>
                        <tr>
                            <th scope="col">Cliente</th>
                            <th scope="col col-xl-4">Data</th>
                            <th scope="col">Total (R$)</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.notas.map(nota => {
                            return (
                                <tr>
                                    <td>{nota.cliente}</td>
                                    <td>{nota.data}</td>
                                    <td>{nota.total}</td>
                                    <td>
                                        <button className="btn btn-primary" idnota={nota.id} onClick={props.visualizaNota()}>Detalhes</button>
                                        <button href="/dashboard/notas" idnota={nota.id} className="btn btn-primary text-white ml-4" onClick={props.geraPDF()}>PDF</button>
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