import React from 'react'

export default props =>
    <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-10 centralizar-vertical" id="formMercadoriaAltera">
        <h2 className="text-dark text-center mt-5 mb-5">Altera Mercadoria {props.nome}</h2>
        <form action="http://bdpapiserver-com.umbler.net/mercadoria/altera" method="post" enctype="multipart/form-data" id="formAltera" onsubmit='window.location.reload()'>
            <input type="hidden" name="nomeImg" defaultValue={props.mercadoria.mercadoria.nomeImg} />
            <input type="hidden" name="id" defaultValue={props.mercadoria.mercadoria.id}/>
            <input type="hidden" name="token" defaultValue={sessionStorage.getItem('token')}/>
            <input type="text" name="nome" className="form-control" placeholder="Nome da mercadoria" id="nomeAltera" defaultValue={props.mercadoria.mercadoria.nome} required />
            <div className="row mt-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Preço de Compra" id="precoCompraAltera" name="precoCompra" defaultValue={props.mercadoria.mercadoria.precoCompra.replace('.', ',')} required />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Preço de Venda" id="precoVendaAltera" name="precoVenda" defaultValue={props.mercadoria.mercadoria.precoVenda.replace('.', ',')} required />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <label htmlFor=""><img src={"http://bdpapiserver-com.umbler.net/" + props.mercadoria.mercadoria.nomeImg} alt="" width="64" />{props.mercadoria.mercadoria.nomeImg}</label>
                    <input type="file" className="form-control" name="img" id="imgAltera" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <button className="btn btn-danger col" onClick={props.changeStatus}>Cancelar</button>
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-success col" id="btnAltera">Salvar</button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col text-center">
                    <span id="message" className="bg-success p-2 text-white d-none rounded">Mercadoria Salva</span>
                </div>
            </div>
        </form>
    </div>