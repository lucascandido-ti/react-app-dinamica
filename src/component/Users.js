import React, { Component } from 'react';
import Cards from './objects/Cards';
import './styles/User.css';

class Users extends Component{
 
    constructor(props){
        super(props);
        this.buildGrid = this.buildGrid.bind(this);
        this.ifnull = this.ifnull.bind(this);
        this.loadData = this.loadData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            data_grid: undefined,

            id: undefined,
            name: undefined,
            email: undefined,
            password: undefined,
            reload: undefined,
            load: "preloader-wrapper big active"
        }
    }

    ifnull(a, b){
        if(a === undefined || a === ""){
            return b;
        }else{
            return a;
        }
    }

    loadData(p){
        this.setState({
            id: p.id,
            name: p.name,
            email: p.email,
            password: p.password
        })
    }

    deleteData(p){
        var data = {
                        id: p.id,
                        name: p.name,
                        email: p.email,
                        password: p.password
                    };
        this.delete(data);
    }

    buildGrid = async (e) =>{

        var myHeaders = new Headers();

        var myInit = { method: 'POST',
                       headers: myHeaders,
                       cors:'none',
                       cache:'default'
                    };
        
        var DATA_API = await fetch(`http://laravelteste.localhost:447/get_user`,myInit);
        var DATA_API_REST = await DATA_API.json();
        
        var card_items = DATA_API_REST.map((data)=>
                <Cards
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    email={data.email}
                    password={data.password}
                    loadData={this.loadData}
                    deleteData={this.deleteData}
                    col="col s4"
                />
        );

        this.setState({
            data_grid: card_items,
            load: "preloader-wrapper big"
        });

        return card_items;
    }

    componentDidMount() {
        this.buildGrid();
    }

    handleClick() {
        this.handleSubmit();
    }

    handleChange(event, field) {
        eval('this.setState({'+field+': event.target.value})');
    }

    handleSubmit = async (e)=> {
        if(this.ifnull(this.state.name,"") == ""){
            alert("Adicione um nome.")
        }else if(this.ifnull(this.state.email,"") == ""){
            alert("Adicione um email.")
        }else if(this.ifnull(this.state.password,"") == ""){
            alert("Adicione um password.")
        }else{
            await this.save();
            
            return true;
        }
    }
    
    save = async (e) =>{
        var myInit = { method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body:JSON.stringify({
                                                "token":"854697",
                                                "class":"Users",
                                                "data":{
                                                    
                                                            "id":this.ifnull(this.state.id,""),
                                                            "name":this.ifnull(this.state.name,""),
                                                            "email":this.ifnull(this.state.email,""),
                                                            "password":this.ifnull(this.state.password,""),
                                                            "permission_id":1
                                                        }
                                            })
                        };
        var DATA_API = await fetch(`http://laravelteste.localhost:447/insert_user`,myInit)
                                .then((p)=>{
                                    if(p.statusText == "Internal Server Error"){
                                        alert("Falha ao tentar salvar.");
                                    }else{
                                        while(p.statusText != "OK"){
                                            console.log(1);
                                        }
                                        alert("Usuário salvo com succeso.");
                                        this.setState({
                                            data_grid: undefined,
                                            load: "preloader-wrapper big active"
                                        });
                                        this.buildGrid();
                                        this.setState({
                                            id: "",
                                            name: "",
                                            email: "",
                                            password: ""
                                        })
                                    }
                                });
    }

    delete = async (data) =>{
        var myInit = { method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body:JSON.stringify({
                                                "token":"854697",
                                                "class":"Users",
                                                "data":{
                                                            "id":this.ifnull(data.id,""),
                                                            "name":this.ifnull(data.name,""),
                                                            "email":this.ifnull(data.email,""),
                                                            "password":this.ifnull(data.password,""),
                                                            "permission_id":1
                                                        }
                                            })
                        };
        var DATA_API = await fetch(`http://laravelteste.localhost:447/delete_user`,myInit)
                                .then((p)=>{
                                    while(p.statusText != "OK"){
                                        console.log(1);
                                    }
                                    alert("Usuário deletado com succeso.");
                                    this.setState({
                                        data_grid: undefined,
                                        load: "preloader-wrapper big active"
                                    });
                                    this.buildGrid();
                                });
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <h5>Usuários</h5>
                            <div class="input-field col s4 m4">
                                <input placeholder="Nome" id="name" type="text" defaultValue={this.state.name} onChange={(event)=>this.handleChange(event,'name')}/>
                            </div>
                        
                            <div class="input-field col s4 m4">
                                <input placeholder="Email" id="email" type="email" class="validate"defaultValue={this.state.email} onChange={(event)=>this.handleChange(event,'email')}/>
                            </div>
                        
                            <div class="input-field col s4 m4">
                                <input placeholder="Senha" id="senha" type="password" class="validate" defaultValue={this.state.password} onChange={(event)=>this.handleChange(event,'password')}/>
                            </div>

                            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleClick}>Salvar
                                <i class="material-icons left">save</i>
                            </button>
                            {/* <div class="btn-insert right" onClick={this.save(this.state)}>
                                <a class="waves-effect Default btn right"><i class="material-icons left">save</i>Salvar</a>
                            </div> */}
                    </div>
                </div>
                <div className="row">
                    {this.state.data_grid}
                </div>
                
                <div className="container center">
                    <div class={this.state.load}>
                        <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>
                </div>
                
            
            </div>
        );
    }


}

export default Users;