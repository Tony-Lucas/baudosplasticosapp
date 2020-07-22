import React from 'react';
import MenuIcon from '../icons/open-menu.png';
import iconMenu from '../icons/open-menu.png';
import {slidein} from '../js/animations';

export default props =>
    <div className="row">
        <div className="col position-absolute d-lg-none d-md-none d-sm-none w-50 h-100 bg-darkblue menu-mobile text-white" id="menu-mobile">
            <a href="/dashboard/resumo" className="d-block mt-4 p-3">Resumo</a>
            <a href="/dashboard/mercadorias" className="d-block mt-4 p-3">Mercadorias</a>
            <a href="/dashboard/notas" className="d-block mt-4 p-3">Notas</a>
            <a href="/dashboard/relatorios" className="d-block mt-4 p-3">Relatorios</a>
        </div>
        <div className="col bg-blue d-lg-none d-md-none d-sm-block p-2">
            <button className="btn float-right" onClick={props.slidein()}><img src={iconMenu} alt="" width="32"/></button>
        </div>
        <div className="col text-white bg-blue d-sm-none d-md-block d-lg-block p-2 ">
            <div className="row">
                <div className="col col-xl-2 col-lg-2 col-md-3">
                    <h3>asdasd</h3>
                </div>
                <div className="col mt-2 text-center">
                    <a href="/dashboard/resumo" className="d-inline p-2 ">Resumo</a>
                    <a href="/dashboard/mercadorias" className="d-inline ml-5 p-2">Mercadorias</a>
                    <a href="/dashboard/notas" className="d-inline ml-5 p-2">Notas</a>
                    <a href="/dashboard/relatorios" className="d-inline ml-5 p-2">Relatorios</a>
                </div>
                <div className="col text-right mt-1 col-xl-2 col-lg-2 col-md-3">
                    <button className="btn bg-darkblue text-white" onClick={props.logout}>Sair</button>
                </div>
            </div>
        </div>
    </div>
    