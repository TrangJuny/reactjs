import React, {Component} from "react";
import {getData,getDataGenre} from './server';

export default class Movie extends Component {
    constructor(){
        super();
        this.state={
            data: []            
        };
    }

    componentDidMount() {
        
    }
    render() {
        return(
            <div>        
            </div>
        )
    }
}