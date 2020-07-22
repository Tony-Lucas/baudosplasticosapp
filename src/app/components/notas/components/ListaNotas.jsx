import React from 'react'

export default props =>
    <div className="col col-12 d-none" id="listaMercadorias">
        <div className="row">
            <div className="col col-lg-8 centralizar-vertical">
                <div className="row mt-5 mb-4">
                    <div className="col text-center">
                        <h2 className=" text-dark d-inline">Notas</h2>
                    </div>
                </div>
                <button className="btn btn-success float-right mb-4">Nova</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Data</th>
                            <th scope="col">Total</th>
                            <th scope="col">Mercadorias</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>