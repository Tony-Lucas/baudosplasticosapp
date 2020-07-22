import React from 'react'

export default props =>
    <div className="row">
        <div className="col col-12" id="formMercadoria">
            <div className="col col-xl-4 col-lg-6 col-md-9 col-sm-10 centralizar-vertical">
                <h2 className="text-dark text-center mt-5 mb-5">Nova Nota</h2>
                <input type="text" name="nome" className="form-control" placeholder="Nome do cliente" id="nome" />
                <div className="row mt-3">
                    <div className="col col-xl-9 col-lg-9 col-md-8">
                        <input type="text" className="form-control " placeholder="Digite o nome da mercadoria" id="buscaMercadoria" onKeyUp={props.buscaMercadoria()}/>
                        
                    </div>
                    <div className="col ">
                        <button className="btn btn-success col">Adicionar</button>
                    </div>
                </div>
            </div>
            <h2 className="text-center text-dark mt-5">Mercadorias na nota</h2>
        </div>
    </div>