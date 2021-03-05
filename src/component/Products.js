import React, { Component } from 'react';
import List from './objects/List';


class Products extends Component{
 
    constructor(props){
        super(props);
        this.buildGrid = this.buildGrid.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
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
            estoque: undefined,
            preco: undefined,
            categorie_id: undefined,
            combo_categorie: undefined,
            brand_id: undefined,
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
            estoque: p.estoque,
            preco: p.preco
        })
    }

    deleteData(p){
        var data = {
                        id: p.id,
                        name: p.name,
                        estoque: p.estoque,
                        preco: p.preco
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
        
        var DATA_API = await fetch(`http://laravelteste.localhost:447/get_product`,myInit);
        var DATA_API_REST = await DATA_API.json();
        
       
        var itens = DATA_API_REST.map((data)=>
                <List 
                    key="1"
                    id={data.id}
                    name={data.name}
                    estoque={data.estoque}
                    preco={data.estoque}
                    categorie_id="1"
                    brand_id="1"
                    loadData={this.loadData}
                    deleteData={this.deleteData}
                />
        );
       
        this.setState({
            data_grid: itens,
            load: "preloader-wrapper big"
        });

        return true;
    }

    loadCategories = async (e) =>{

        var myHeaders = new Headers();

        var myInit = { method: 'POST',
                       headers: myHeaders,
                       cors:'none',
                       cache:'default'
                    };
        
        var DATA_API = await fetch(`http://laravelteste.localhost:447/get_categorie`,myInit);
        var DATA_API_REST = await DATA_API.json();
       
        var data_combo = DATA_API_REST.map((data)=>
                <option value={data.id}>{data.name}</option>
        );
        
        this.setState({
            combo_categorie: data_combo
        });

        return true;
    }


    componentDidMount() {
        this.loadCategories();
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
        }else if(this.ifnull(this.state.estoque,"") == ""){
            alert("Adicione um estoque.")
        }else if(this.ifnull(this.state.preco,"") == ""){
            alert("Adicione um preco.");
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
                                                "class":"Products",
                                                "data":{
                                                    
                                                            "id":this.ifnull(this.state.id,""),
                                                            "name":this.ifnull(this.state.name,""),
                                                            "estoque":this.ifnull(this.state.estoque,""),
                                                            "preco":this.ifnull(this.state.preco,""),
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
                                            estoqeu: "",
                                            preco: ""
                                        })
                                    }
                                });
    }

    delete = async (data) =>{
        var myInit = { method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body:JSON.stringify({
                                                "token":"854697",
                                                "class":"Products",
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
                                <input placeholder="Estoque" id="estoque" type="text" defaultValue={this.state.estoque} onChange={(event)=>this.handleChange(event,'estoque')}/>
                            </div>
                        
                            <div class="input-field col s4 m4">
                                <input placeholder="Preco" id="preco" type="text" defaultValue={this.state.preco} onChange={(event)=>this.handleChange(event,'preco')}/>
                            </div>

                            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleClick}>Salvar
                                <i class="material-icons left">save</i>
                            </button>
                            {/* <div class="btn-insert right" onClick={this.save(this.state)}>
                                <a class="waves-effect Default btn right"><i class="material-icons left">save</i>Salvar</a>
                            </div> */}
                    </div>
                </div>
                
                <div className="container center">
                        <table>
                            <thead>
                                <tr>
                                    <th><i class="material-icons">edit</i></th>
                                    <th><i class="material-icons">delete</i></th>
                                    <th>Nome</th>
                                    <th>Estoque</th>
                                    <th>Preco</th>
                                </tr>
                            </thead>
                            {this.state.data_grid}
                        </table>
                </div>
                
                
                
                {/* <div className="container center">
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
                </div> */}
                
            
            </div>
        );
    }


}

export default Products;