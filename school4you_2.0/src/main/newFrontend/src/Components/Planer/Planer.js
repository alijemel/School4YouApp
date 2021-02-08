import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import classes from './Planer.module.css'
import Button from '../../Button/Button'
import UserDataService from '../../api/UserDataService';
import './Cubes.css'

class Planer extends Component {

    render() {
        return (

            <div class="container">
    <div class="cube">dohjknlkmnl;kmnp;o'l;k,;'lm;l/m,</div>
    <div class="cube">ray</div>
    <div class="cube">me</div>
    <div class="cube">fa</div>
    <div class="cube">so</div>
    <div class="cube">la</div>
    <div class="cube">te</div>
    <div class="cube">do</div>
</div>
            // <div>
            //     <table class="table table-borderless">
            //         <thead>
            //             <tr>
            //                 <th>#</th>
            //                 <th>First Name</th>
            //                 <th>Last Name</th>
            //                 <th>First Name</th>
            //                 <th>Last Name</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             <tr>
            //                 <th scope="row">1</th>
            //                 <td>
            //                     <div className={classes.lol}>
            //                         <div className={classes.SchoolClass}>
            //                             lolojklnkl;n;kmnlknklnklnkn 
            //                         </div>
            //                     </div>


            //                 </td>
            //                 <td>
            //                 <div className={classes.lol}>
            //                         <div className={classes.SchoolClass}>
            //                             loloijjnilkm;lm;lkml;'ml;m; oij;olmn
            //                             jnoklnl;k
            //                             jnoklnl
            //                             junokln'
            //                         </div>
            //                     </div>
            //                 </td>

            //             </tr>
            //             <tr>
            //                 <th scope="row">2</th>
            //                 <td>Jacob</td>
            //                 <td>Thornton</td>
            //             </tr>
            //         </tbody>
            //     </table>

            // </div>
        )
    }
}

export default Planer