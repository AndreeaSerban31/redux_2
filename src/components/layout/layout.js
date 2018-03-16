/**
 * Created by Andreea.Serban on 23.02.2018.
 */
import React, { Component } from 'react';

import Header from '../partials/header/header';
import Footer from '../partials/footer/footer';


class Layout extends Component {
    render() {
        return (
            <div className="RootContent">
                <Header />
                    <main className="MainContent">
                        { this.props.children }
                    </main>
                <Footer />
            </div>
        );
    }
}
export default Layout;

