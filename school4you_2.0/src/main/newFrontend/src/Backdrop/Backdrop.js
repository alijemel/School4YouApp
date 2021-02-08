import React from 'react'
import classes from './Backdrop.css'

const backdrop =(props) => {
    let backdrop = null
    if(props.show) {
        backdrop = 
        <div className={classes.Backdrop} onClick={props.clicked}></div>
    
    }

    return (
        backdrop
    )
}
export default backdrop
