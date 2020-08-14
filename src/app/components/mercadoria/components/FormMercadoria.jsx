import React from 'react'

export default props =>
    <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-10 centralizar-vertical" >
        <h2 className="text-dark text-center mt-5 mb-5">Nova Mercadoria</h2>
        
        <form action="http://bdpapiserver-com.umbler.net/mercadoria" method="post" enctype="multipart/form-data" id="formMercadoria">
            <input type="hidden" name="token" value={sessionStorage.getItem('token')} />
            <input type="text" name="nome" className="form-control" placeholder="Nome da mercadoria" required/>
            <div className="row mt-3">
                <div className="col">
                    <input type="text" name="precoCompra" className="form-control" placeholder="Preco de compra" required/>
                </div>
                <div className="col">
                    <input type="text" name="precoVenda" className="form-control" placeholder="Preço de Venda" required/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <label className="d-block">Imagem</label>
                    <input type="file" className="form-control" name="img" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <button className="btn btn-danger col" onClick={props.changeStatus}>Cancelar</button>
                </div>
                <div className="col">
                    <input type="submit" value="Submit" className="btn btn-success col"/>
                </div>
            </div>
        </form>
        <div className="row mt-4">
            <div className="col text-center">
                <span id="message" className="bg-success p-2 text-white d-none rounded">Mercadoria Salva</span>
            </div>
        </div>
    </div>