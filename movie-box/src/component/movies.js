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
            nextHref:'',
            type:'popular',
            hasMoreItems:true
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
        document.getElementById("watting").style.display="block";

        const type = this.state.type;
        var num =this.state.numPage;
        var listMovie= this.state.data;
        const myRequest = getData(type,num);   

        fetch(myRequest)
        .then(x=>{return x.json();})
        .then(dataJson=>{                         
                                            
                if(this.state.hasMoreItems && dataJson.page===this.state.numPage){  
                    let id=listMovie.length;
                    let dt=dataJson.results.map(x=>{
                        id++;
                            listMovie.push(    
                            <Movie key={"id_"+x.id+id}
                                original_title={x.original_title}
                                release_date={x.release_date}
                                genres={this.listGenres(x.genre_ids)}
                                vote_average={x.vote_average}
                                poster_path={x.poster_path}
                            ></Movie>
                            );
                    })  
                    // alert(dataJson.page===this.state.numPage)

                    this.setState({data: listMovie})                         
                    this.setState({numPage:dataJson.page+1});  
                    if(dataJson.page===dataJson.total_pages){
                        this.setState({hasMoreItems:false});                        
                    }
                }else{
                    listMovie=[];
                }

            
        })
        .catch(error=>{
            console.log(error)
        })

        document.getElementById("watting").style.display="none";
    }
    
    getMovieGenre(num,e){
        if(e){e.preventDefault();}
        
        this.setState({type:'',numPage:1,hasMoreItems:false,data:[]},);

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
        
        var header = document.getElementById("listGenres");
        var btns = header.getElementsByClassName("dropdown-item");

        for (var i = 0; i < btns.length; i++) {  
                btns[i].className="dropdown-item";  
        }
          
        e.target.className += " active";  
    }
    
    getListMovieKind(kind,e){
        if(e){e.preventDefault();}
        this.setState({type:kind,numPage:1,hasMoreItems:true,data:[]});
            
        var header = document.getElementById("filter");
        var btns = header.getElementsByClassName("nav-link");

        for (var i = 0; i < btns.length; i++) {  
            if(btns[i].classList[0] === "dropdown-toggle" ){
                btns[i].className="dropdown-toggle nav-link";  
            }              
            else{
                btns[i].className="nav-link";  
            }
        }
          
        e.target.className += " active";  

    }

    componentDidMount() {
        
        const myRequestGenres = getListGenres();
        fetch(myRequestGenres)
        .then(x=>{return x.json();})
        .then(dataJson=>{            
           this.setState({genres: dataJson.genres});    
                   
        })
        this.getListMovie();
        
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
                            pageStart={0}
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