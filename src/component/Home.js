import React, {Component} from 'react';
import './styles/Home.css';

class Home extends Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div class="img1">
                        <p class="line typing-animation">Olá, bem vindo ao teste pratico para Innovation Brindes =D</p>
                        <img src="https://images.unsplash.com/photo-1614794447777-63bd5f669437?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;