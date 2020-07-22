import React from 'react'

export default props =>
    <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-10 centralizar-vertical" id="formMercadoria">
        <h2 className="text-dark text-center mt-5 mb-5">Nova Mercadoria</h2>
        <input type="text" name="nome" className="form-control" placeholder="Nome da mercadoria" id="nome"/>
        <div className="row mt-3">
            <div className="col">
                <input type="text" name="nome" className="form-control" placeholder="Preco de compra" id="precoCompra"/>
            </div>
            <div className="col">
                <input type="text" name="nome" className="form-control" placeholder="Preco de venda" id="precoVenda"/>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col">
                <button className="btn btn-danger col" onClick={props.changeStatus}>Cancelar</button>
            </div>
            <div className="col">
                <button className="btn btn-success col" onClick={props.salvaMercadoria}>Salvar</button>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col text-center">
                <span id="message" className="bg-success p-2 text-white d-none rounded"></span>
            </div>
        </div>
    </div>