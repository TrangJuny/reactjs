import React, {Component} from "react";
import {getListGenres} from './server';

export default class Filter extends Component {
    constructor(){
        super();
        this.state={
            data: [],
            genres: []
        };

    }

    componentDidMount() {
        
        const myRequestGenres = getListGenres();
        fetch(myRequestGenres)
        .then(x=>{return x.json();})
        .then(dataJson=>{            
        const newGenres=this.listGenre(dataJson.genres);
           this.setState({genres: newGenres});   
        })

    }

    listGenre(genres){
        
        const newGenres= genres.map((x)=>{
            return { ...x, active:""}
        });

        newGenres.splice(0, 0, {id:0, name:"All", active:" active"})

       const listGenres=this.RenderGenres(newGenres);

        return listGenres;
    }

    RenderGenres(list){
        const newGenres1= list.map((x,index)=>{
            return(
                    <button key={x.id} onClick={(e)=>this.props.getMovieGenre(x.id,e)}  className={"dropdown-item" + x.active} >{x.name}</button>
                )
        })
        return newGenres1;
    }

    render() {
        const {getListMovieKind,getMovieGenre} = this.props;
        return(
            <div className="tab-primary">
                <ul className="nav nav-tabs flex-column flex-sm-row">
                    <li id="filter" className="nav-item d-flex  flex-column flex-sm-row">
                      <a href="#" className="nav-link active" onClick={(e)=>getListMovieKind('popular',e)} >Popular</a>
                      <a href="#" className="nav-link" onClick={(e)=>getListMovieKind('top_rated',e)}>Top Rated</a>
                      <a href="#" className="nav-link" onClick={(e)=>getListMovieKind('upcoming',e)}>Upcoming</a>      
                      <div className=" dropdown">
                        <a className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Genre</a>
                        <div id="listGenres" className="dropdown-menu">
                            {this.state.genres}
                          <button className="dropdown-item" onClick={(e)=>getMovieGenre(80,e)} >Action 009</button>
                        </div>
                      </div>
                    </li>
                    
                    <li className="nav-item ml-auto d-flex flex-row">
                      <a className="nav-link px-0 border-0 active">
                        <i className="fas fa-th-large"></i>
                      </a>
                      <a className="nav-link border-0">
                        <i className="fas fa-th-list"></i>
                      </a>
                    </li>
                </ul>
            </div>       
      
        )
    }
}