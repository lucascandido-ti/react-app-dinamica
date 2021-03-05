import React, { Component } from 'react'
import './styles/Navbar.css';

export class Navbar extends Component {

    constructor(props){
        super(props);
        this.toast = this.toast.bind(this);
        this.ifnull = this.ifnull.bind(this);
    }

    toast(message) {
        const M = window.M;
        M.toast({ html: message })
    }

    ifnull(v, d = ""){
        if(v !== ""){
            v = v
        }else{
            v = d;
        }
        return v;
    }

    render() {
        return (
            <div>
                {/* header da pagina com  */}
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper">
                            <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
                            <a href="#" class="brand-logo left">Innovation Brindes</a>

                        </div>
                    </nav>
                </div>
                
            </div>

        )
    }
}

export default Navbar;