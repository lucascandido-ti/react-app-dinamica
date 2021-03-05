import React, { Component } from 'react';
//import './styles/List.css';

class List extends Component{
    constructor(props){
        super(props);
        
        this.state ={
            id: undefined,
            name: undefined,
            estoque: undefined,
            preco: undefined
        }
    }

    componentDidMount(){
        this.setState({
            id: this.props.id,
            name: this.props.name,
            estoque: this.props.estoque,
            preco: this.props.preco
        })
    }

    render(){
        return(
                        <tbody>
                            <tr>
                                <td><a><i class="material-icons" onClick={(p)=>this.props.loadData(this.state)}>edit</i></a></td>
                                <td><a><i class="material-icons" onClick={(p)=>this.props.deleteData(this.state)}>delete</i></a></td>
                                <td>{this.props.name}</td>
                                <td>{this.props.estoque}</td>
                                <td>{this.props.preco}</td>
                            </tr>
                        </tbody>
        );
    }
}

export default List;