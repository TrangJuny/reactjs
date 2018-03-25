import React, {Component} from "react";

export default class Movie extends Component {
    constructor(){
        super();
    }
    
    render() {        
        const {original_title, release_date ,genres ,vote_average ,poster_path } = this.props;
        const listGenres = genres.map((x,index)=> { if(index !== 0) return(", "+x); return (x)})
        return(
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">        
                <div className="card item-movie">
                    <div className="card-img-top">
                        <img className="img-fluid" src={"https://image.tmdb.org/t/p/original"+poster_path} alt="Card image cap"/>
                        <span className="year">{release_date}</span>
                    </div>

                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                        <div className="movie-content">
                            <h3 className="movie-name">{original_title}</h3>
                            <span className="type">{listGenres}</span>
                        </div>
                        <span className="idmb"> {vote_average}</span>
                        </div>
                    </div>
                </div>        
            </div>
                  
      
        )
    }
}