import React, {Component} from "react";
import {getData,getListGenres} from './server';

export default class Slider extends Component {
    constructor(){
        super();
        this.state={
            data: [],
            geners: []
        };
        this.listGeners=this.listGeners.bind(this);
    }

        
    listGeners(num) {       
        let genres=this.state.geners;

        let listGenres= num.map(n=>{
            let obName = genres.find(x=>{return x.id===n});                
            return  (<li className="list-inline-item" key={obName.id} >{obName.name}</li>)                          
        });

        return listGenres;             
    }

    componentDidMount() {
        
        const myRequestGenres = getListGenres();
        fetch(myRequestGenres)
        .then(x=>{return x.json();})
        .then(dataJson=>{
           this.setState({geners: dataJson.genres});   
        })

        const myRequest = getData('popular',1);
        
        fetch(myRequest)
        .then(x=>{return x.json();})
        .then(dataJson=>{
            let dt=dataJson.results.slice(0,3)
            dt= dt.map((x,index)=>{
                
                let url="https://image.tmdb.org/t/p/w1280/"+x.backdrop_path;
                let ratting=x.vote_average*10;
                return(
                    <div key={x.id} className={index===1? "carousel-item active":"carousel-item"}>
                        <img className="d-block w-100" src={url} alt="Third slide"></img>
                        <div className="carousel-caption text-left">
                            <div className="container-fluid">
                                <div className="movie-detail">
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col">
                                            <div className="moview-des">
                                            <h1>{x.original_title}</h1>
                                            <ul className="list-unstyled d-none d-md-block">
                                                {this.listGeners(x.genre_ids)}
                                                <li className="list-inline-item">|</li>
                                                <li className="list-inline-item">Duration:1h 50m</li>                    
                                            </ul>
                                            </div>
                                            <div className="mt-5 d-flex align-items-center">
                                            <button className="btn btn-primary">WATCH MOVIE</button>
                                            <button className="btn btn-outline-light ml-3 d-none d-sm-block">VIEW INFO</button>
                                            <a className="btn-link ml-3 d-none d-sm-block">+ ADD TO WISHLIS</a>
                                            </div>
                                        </div>
                                        <div className="col-auto  d-none d-md-block">
                                            <div className="border border-secondary rounded container-rating">
                                                <span className="text-white mr-1 font-14">Rating</span>
                                                <span> based on 3546 reviews</span>
                                                <div className="row mt-3 align-items-center">
                                                    <div className="col">       
                                                        <div className="star-rating">
                                                            <div className="start-o">
                                                            <span className="far fa-star" data-rating="1"></span>
                                                            <span className="far fa-star" data-rating="2"></span>
                                                            <span className="far fa-star" data-rating="3"></span>
                                                            <span className="far fa-star" data-rating="4"></span>
                                                            <span className="far fa-star" data-rating="5"></span>                          
                                                            </div>
                                                            <div className="start" style={{'width':ratting+"%"}}>
                                                            <span className="fas fa-star" data-rating="1"></span>
                                                            <span className="fas fa-star" data-rating="2"></span>
                                                            <span className="fas fa-star" data-rating="3"></span>
                                                            <span className="fas fa-star" data-rating="4"></span>
                                                            <span className="fas fa-star" data-rating="5"></span>                          
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    <div className="col-auto">      
                                                        <span className="px-2 text-white border border-secondary">3.4</span>
                                                    </div>
                                                </div>                 
                                            </div>
                                        </div>
                                    </div>
                                </div>                        
                            </div>
                        </div>
                    </div>
                )
            })
            this.setState({data: dt});
        })
    }
    render() {
        return(            
            <div className="container-slider">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        {this.state.data}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }
}