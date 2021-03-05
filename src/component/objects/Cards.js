import React, { Component } from 'react';
//import './styles/Cards.css';

class Cards extends Component{
    constructor(props){
        super(props);
        
        this.state ={
            id: undefined,
            name: undefined,
            email: undefined,
            password: undefined
        }
    }

    componentDidMount(){
        this.setState({
            id: this.props.id,
            name: this.props.name,
            email: this.props.email,
            password: this.props.password
        })
    }

    render(){
        return(
            <div>
                <div className={this.props.col}>
                    <div class="card grey darken-3">
                        <div class="card-content white-text">
                            <span class="card-title">{this.props.name}</span>
                            <p>{this.props.email}</p>
                        </div>
                        <div class="card-action">
                            <a class="modal-trigger" data-position="left" data-tooltip="Editar">
                                <i class="material-icons" onClick={(p)=>this.props.loadData(this.state)}>edit</i>
                            </a>
                            <a class="modal-trigger" data-position="left" data-tooltip="Deletar">
                                <i class="material-icons" onClick={(p)=>this.props.deleteData(this.state)}>delete</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;