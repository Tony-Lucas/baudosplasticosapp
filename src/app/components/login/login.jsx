import React from 'react'
import FormLogin from './components/formLogin';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.login= this.login.bind(this);
    }

    async login(e){
        e.preventDefault();
        const usuario = document.querySelector('#usuario').value;
        const senha = document.querySelector('#senha').value;
        const result = await fetch('http://localhost:3333/login',{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({usuario:usuario,senha:senha})
        });
        const json = await result.json();
        if(json.success){
            sessionStorage.setItem('token',json.token);
            window.location.reload();
        }else{
            const erroSpan = document.querySelector("#erro");
            erroSpan.textContent =  json.message;
            erroSpan.classList.remove('d-none')
            setTimeout(() => {
                erroSpan.classList.add('d-none')
            },3000)
        }
    }

    render(){
        return(
            <div className="row">
                <FormLogin login={(e) => this.login}/>
            </div>
        )
    }
}