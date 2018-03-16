/**
 * Created by Andreea.Serban on 23.02.2018.
 */
import React,{ Component } from 'react';

import GamesCategoryList from './games_category_list';
import GamesCatChildrenGrid from './game_cat_children_grid';

class Casino extends Component {
    render(){
       return(
           <section className="CasinoWrapper">
               <GamesCategoryList />
               <GamesCatChildrenGrid />
           </section>
       )
    }

}

export default Casino;