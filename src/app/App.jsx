import React from 'react'
import Menu from '../templates/menu';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Login from './components/login/login';
import Resumo from './components/resumo/resumo';
import Mercadorias from './components/mercadoria/mercadoria';
import Notas from './components/notas/Notas';

export default class App extends React.Component{

    slidein(){
        const menu = document.getElementById('menu-mobile');
        menu.classList.toggle('d-sm-none');
    }

    logout(){
        sessionStorage.removeItem('token');
        window.location.reload();
    }

    render(){
        
        if(!sessionStorage.getItem('token')){
            return (
                <div class="container-fluid">
                    <Login />
                </div>
            )
        }else{
            return(
                <div className="container-fluid">
                    <Menu slidein={() => this.slidein} logout={this.logout}/>
                    <Router>
                        <Switch>
                            <Route exact path="/dashboard/resumo"><Resumo /></Route>
                            <Route path="/dashboard/mercadorias"><Mercadorias /></Route>  
                            <Route path="/dashboard/notas"><Notas /></Route>  
                        </Switch>
                    </Router>
                </div>
            )
        }
        
    }
}