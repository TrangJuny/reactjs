import React, {Component} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {getData,getListGenres,getDataGenre} from './server';
import Filter from './filter';
import Movie from './movie';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            data: [],
            genres: [],
            numPage:1,
            type:null,
            hasMoreItems:false
        };
        this.listGenres=this.listGenres.bind(this);
        this.getListMovie=this.getListMovie.bind(this);
        this.getMovieGenre=this.getMovieGenre.bind(this);
        this.getListMovieKind=this.getListMovieKind.bind(this)
    }
  
    listGenres(num) {             
        let genres=this.state.genres;
        let listGenres= num.map(n=>{
            let obName = genres.find(x=>{return x.id===n});   
               return  obName.name;                        
        });

        return listGenres;      

    }

    getListMovie(){

        var type = "popular";

        if(this.state.type) {
            type = this.state.type;
        }

        var listMovie = this.state.data;

        const myRequest = getData(type,this.state.numPage);

            fetch(myRequest)
            .then(x=>{return x.json();})
            .then(dataJson=>{
                let dt=dataJson.results.map(x=>{
                    return(       
                        <Movie key={"id_"+x.id}
                            original_title={x.original_title}
                            release_date={x.release_date}
                            genres={this.listGenres(x.genre_ids)}
                            vote_average={x.vote_average}
                            poster_path={x.poster_path}
                        ></Movie>
                    )
                })
                

                if(this.state.hasMoreItems){
                    
                    listMovie=listMovie.concat(dt);
                     
                    this.setState({data: listMovie, numPage:this.state.numPage+1})  

                    if(this.state.numPage===dataJson.total_pages){
                        this.setState({hasMoreItems:false});                        
                    }

                }
            })
    }
    
    getMovieGenre(num,e){
        if(e){e.preventDefault();}
        
        const myRequest = getDataGenre(num);
        fetch(myRequest)
        .then(x=>{return x.json();})
        .then(dataJson=>{
            let dt=dataJson.results.map(x=>{
                return(       
                    <Movie key={x.id}
                        original_title={x.original_title}
                        release_date={x.release_date}
                        genres={this.listGenres(x.genre_ids)}
                        vote_average={x.vote_average}
                        poster_path={x.poster_path}
                    ></Movie>
                )
            })
            return this.setState({data: dt,hasMoreItems:false});
        })
    }
    
    getListMovieKind(kind,e){
        if(e){e.preventDefault();}
        this.setState({type:kind,numPage:1,hasMoreItems:true,data:[]},);
        this.getListMovie();
    }

    componentDidMount() {
        
        const myRequestGenres = getListGenres();
        fetch(myRequestGenres)
        .then(x=>{return x.json();})
        .then(dataJson=>{            
           this.setState({genres: dataJson.genres});    
                   
        })
        this.getListMovie();
        this.setState({hasMoreItems:true})
        
    }


    render() {
        return(
            <div className="container-fluid">
               <Filter                
                    getListMovieKind={this.getListMovieKind}           
                    genres={this.state.genres}
                    getMovieGenre={this.getMovieGenre}
                ></Filter>           

                <div className="movies">  
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={this.getListMovie}
                            hasMore={this.state.hasMoreItems}
                            loader={
                                <div className="loading-container">
                                    <div className="loading-more ">
                                        <span className="s-1"></span>
                                        <span className="s-2"></span>
                                        <span className="s-3"></span>
                                        <span className="s-4"></span>
                                        <span className="s-3"></span>
                                        <span className="s-1"></span>        
                                    </div>
                                    <h4>LOADING</h4>                    
                                </div>
                            }
                        >
                                                  
                            <div className="row"> 
                                    {this.state.data}
                            </div>
                        </InfiniteScroll>
                        
            
                    
                </div>     
            </div>
        )
    }
}