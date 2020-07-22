import React from 'react';

export default props =>
<div className="col col-lg-6 col-xl-3 col-md-5 col-sm-10 bg-blue p-5 centralizar rounded">
    <h2 className="text-center">Login</h2>
    <form>
        <input type="text" className="form-control mt-4" placeholder="Usuario" id="usuario" required />
        <input type="password" className="form-control mt-4" placeholder="Senha" id="senha" required />
        <button className="btn bg-darkblue text-white col mt-4 mb-4" onClick={props.login()}>Entrar</button>
    </form>
    <div className="row">
        <div className="col text-center">
            <span id="erro" className="bg-danger text-white p-2 d-none"></span>
        </div>
    </div>
</div>