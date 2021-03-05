import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class SlideNav extends Component {


    constructor() {
        super();

        this.logout = this.logout.bind(this);
        this.closeSideNav = this.closeSideNav.bind(this);
    }
    componentDidMount() {
    }

    logout() {
        // console.log('User is about to be logged out.')
        // // firebase.auth().signOut();

        // // localStorage.removeItem('firebase_auth');
        // // localStorage.removeItem('firebase_auth_email');

        // console.log("Usuário deslogado...");

        // window.location.reload(false);
    }

    closeSideNav(){
        //$('.sidenav').sidenav('close');
    }

    render() {
        return (
            <div>
                <ul id="slide-out" class="sidenav">
                    <li><div class="user-view">
                        <div class="background">
                            <img class="background-menu" src="https://news.efinancialcareers.com/binaries/content/gallery/efinancial-careers/articles/2019/03/programmer.jpg" />
                        </div>

                        <a class="waves-effect waves-light modal-trigger" href="#modal1">
                            <img class="circle tooltipped" data-position="right" data-tooltip="Ver minha conta" src="https://www.click2sciencepd.org/sites/default/files/images/User-Icons-orange-2.png" />
                        </a>

                        {
                            localStorage.getItem('firebase_auth_email') ?
                                <a href="#email"><span class="white-text email">{localStorage.getItem('firebase_auth_email')}</span></a> :
                                <a href="#email"><span class="white-text email">Bem vindo</span></a>
                        }

                    </div></li>

                    <Link to='/Usuarios'>
                        <li><a href="#" onClick={() => this.closeSideNav()}><i class="material-icons">insert_drive_file</i>Usuários</a></li>
                    </Link>

                    <Link to='/Produtos'>
                        <li><a href="#"><i class="material-icons">developer_board</i>Produtos</a></li>
                    </Link>

                </ul>
            </div>
        )
    }

}

export default SlideNav;