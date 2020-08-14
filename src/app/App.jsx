import React from 'react'
import Menu from '../templates/menu';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/login';
import Mercadorias from './components/mercadoria/mercadoria';
import Notas from './components/notas/Notas';
import Relatorios from './components/relatorio/Relatorios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    slidein() {
        const menu = document.getElementById('menu-mobile');
        menu.classList.toggle('d-sm-none');
    }

    logout() {
        sessionStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        if (!sessionStorage.getItem('token')) {
            return (
                <div className="container-fluid">
                    <Login />
                </div>
            )
        } else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <Menu logout={this.logout} slidein={this.slidein}/>
                    </div>
                    <Router>
                        <Switch>
                            <Route path="/dashboard/mercadorias"><Mercadorias /></Route>
                            <Route path="/dashboard/notas"><Notas /></Route>
                            <Route path="/dashboard/relatorios"><Relatorios /></Route>
                        </Switch>
                    </Router>
                </div>
            )
        }

    }
}