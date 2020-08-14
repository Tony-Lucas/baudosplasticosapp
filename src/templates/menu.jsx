import React from 'react';
import iconMenu from '../icons/open-menu.png'
export default props =>

    <div className="col">
        <div className="row">
            <div className="col text-white bg-blue d-sm-none d-md-block d-lg-block pt-2 pb-2">
                <div className="row">
                    <div className="col col-xl-2 col-lg-2 col-md-3">
                        <h3>asdasd</h3>
                    </div>
                    <div className="col mt-2 text-center">
                        <a href="/dashboard/mercadorias" className="d-inline ml-5 p-2">Mercadorias</a>
                        <a href="/dashboard/notas" className="d-inline ml-5 p-2">Notas</a>
                        <a href="/dashboard/relatorios" className="d-inline ml-5 p-2">Relatorios</a>
                    </div>
                    <div className="col text-right mt-1 col-xl-2 col-lg-2 col-md-3">
                        <button className="btn bg-darkblue text-white" onClick={props.logout}>Sair</button>
                    </div>
                </div>
            </div>
            <div className="col text-white bg-blue d-sm-block d-md-none d-lg-none pt-2 pb-2 text-right">
                <a className="btn border-0" onClick={props.slidein}><img src={iconMenu} alt="" width="35"/></a>
            </div>
            <div className="col w-50 alturamax porcima d-sm-none d-md-none d-lg-none position-absolute bg-darkblue menu-mobile" id="menu-mobile">
                <a href="/dashboard/mercadorias" className="d-block p-3 mt-3">Mercadorias</a>
                <a href="/dashboard/notas" className="d-block p-3 mt-3">Vendas</a>
                <a href="/dashboard/relatorios" className="d-block p-3 mt-3">Relatórios</a>
                <button className="btn bg-darkblue bg-darkdarkblue text-white col mt-4 p-2" onClick={props.logout}>Sair</button>
            </div>
        </div>
    </div>


