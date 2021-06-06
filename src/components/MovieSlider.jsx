import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import { Poster } from './Poster'
import { URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_SMALL, IMG_SIZE_XSMALL } from '../const'
import { replace } from 'react-router-redux';

class MovieSlider extends React.Component {
    render() {
        
        let movies = this.props.movies.filter(function (movie) {
            return movie.poster_path != null;
        })
        let movies_html = movies.map(function (movie) {
            return (
                <div style={{textAlign:"center"}}>
                    <Link to={'/movie/'+movie.id}>
                    <img style={{height:"400px", width:"350px", textAlign:"center", cursor:"pointer"}} src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path} className="img-thumbnail"/>
                    </Link>
                </div>
            );
        });
        return (
            <Carousel onClickItem={(id, item)=>{
                console.log(movies[id].id)
                this.props.dispatch(replace('/movie/' + movies[id].id))
            }} thumbWidth={160} showThumbs="true" autoPlay="true" interval="2000">
                {movies_html}
            </Carousel>
        )
    }
};
function mapStateToProps(state) {
    const { movieList, userDetail, movieList1, recommend_movieList, genres_state } = state;
    const { items: movies } = movieList;
    console.log(genres_state)
    const { items: movies_1 } = movieList1
    const { items: re_movies } = recommend_movieList
    return { movies, userDetail, movies_1, re_movies }
}

export default connect(mapStateToProps)(MovieSlider);
