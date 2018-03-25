
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json;charset=utf-8");
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWM2NjMxYWJmOWEzMWJiZTk4NzQ1OWNhZGM2ZDY3ZCIsInN1YiI6IjVhYjVkODEzMGUwYTI2MWZlODAwM2JhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5Hub43HEcITISf9TL5wjtGd4dx7eO53tXFeqICCCMRI");

function getData(kind,page){
    return   new Request(`https://api.themoviedb.org/3/movie/${kind}?api_key=39c6631abf9a31bbe987459cadc6d67d&language=en-US&page=${page}`, {method: 'GET', headers: myHeaders});
}

function getDataGenre(genreNum){    
    return   new Request(`https://api.themoviedb.org/3/genre/${genreNum}/movies?api_key=39c6631abf9a31bbe987459cadc6d67d&language=en-US&include_adult=false&sort_by=created_at.asc`);
}

function getListGenres(){    
    return   new Request(`https://api.themoviedb.org/3/genre/movie/list?api_key=39c6631abf9a31bbe987459cadc6d67d&language=en-US`);
}

export {getData,getDataGenre,getListGenres}