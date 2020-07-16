import React from "react";
import styleClasses from './Preloader.module.css';
import preloaderGif from '../../../assets/images/preloaderGif.gif';


const Preloader = (props) => {
    return <div>
        {/*<img src={preloaderGif}/>*/}
        <div className={styleClasses.lds_dual_ring}></div>
    </div>
}

export default Preloader;