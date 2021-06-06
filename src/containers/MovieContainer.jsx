import React, { Component } from 'react';
import { MovieList, DisplayMsg } from '../components';
import { connect } from 'react-redux';
import { fetchMovieList, fetch_movies_for_user, searchMovieList } from '../actions';
import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap/lib/Tab';
import { URL_LIST, URL_SEARCH, URL_DETAIL, URL_PERSON, URL_CAST, URL_VIDEO, API_KEY, API_KEY_ALT } from '../const';
import { result } from 'lodash';

class MovieContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show_all: false,
      movie_by_genres: {}
    }
  }

  componentDidMount() {
    if (!this.props.params.keyword) {
      const { dispatch } = this.props;
      dispatch(fetchMovieList());
      console.log(this.props.userDetail)
      dispatch(fetch_movies_for_user(this.props.userDetail.id))
      this.fetchMoviesByGenres()
    }
  }

  async fetchMoviesByGenres() {
    // console.log()
    const genre_list = this.props.genres_state.data
    let result = {}
    for (let i = 0; i < genre_list.length; i++) {
      let genre_code = genre_list[i]['id']
      let genre_name = genre_list[i]['name']
      let url = URL_LIST + '?with_genres=' + genre_code + API_KEY_ALT
      let data = await fetch(url).then(data => data.json())
        .then(data => data.results)
      result[genre_name] = data
    }
    console.log(result)
    this.setState({
      movie_by_genres: result
    })
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.params.keyword && this.props.params.keyword !== nextProps.params.keyword) {
      dispatch(searchMovieList(nextProps.params.keyword));
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    // if (this.state.show_all !== nextState.show_all) {
    //   return true
    // }
    // if (this.props.params.user_id) {
    //   return true;
    // }
    // if(this.props.movies_1 !== nextProps.movies_1) {
    //   return true;
    // }
    // return false;
    if (this.props !== nextProps) {
      return true
    }
    if (this.state !== nextState) {
      return true
    }
    return false
  }

  render() {
    const { movies, movies_1, re_movies } = this.props;
    const { movie_by_genres } = this.state
    console.log(movie_by_genres['Action'])
    const genre_names = Object.keys(movie_by_genres)

    const genre_html = genre_names.map((name, id) => {
      console.log(movie_by_genres[name])
      return (
        <div className={name}>
          <div>
            <h4 style={{ display: "flex", float: "left", marginLeft: "108px", color: "white", fontFamily: "fantasy", cursor: "pointer" }} >{name}</h4>
            <a onClick={() => {
              this.setState({
                show_all: !this.state.show_all
              })
              // console.log(this.state)
            }} style={{
              display: "flex", float: "right", marginRight: "108px", color: "white", cursor: "pointer",
              fontFamily: "Comic Sans, Comic Sans MS, cursive"
            }} >
              {(!this.state.show_all) ? 'Show all' : 'Hide'}
            </a>
            <hr style={{ display: "block", clear: "both", boxShadow: "0 0 10px 1px black" }} />
          </div>
          {(this.state.show_all) ? <MovieList movies={movie_by_genres[name]} /> :
            <MovieList movies={movie_by_genres[name].slice(1, 9)} />
          }
          <hr style={{ boxShadow: "0 0 10px 1px black" }} />
        </div>
      )
    })


    if (this.props.params.user_id) {
      return (
        <div className="recommend">
          <div>
            <h4 style={{ display: "flex", float: "left", marginLeft: "108px", color: "white", fontFamily: "fantasy" }}>Recommend</h4>
          </div>
          <hr style={{ display: "block", clear: "both", boxShadow: "0 0 10px 1px black" }} />
          <MovieList movies={re_movies.slice(1, 9)} />
          <hr style={{ boxShadow: "0 0 10px 1px black" }} />
        </div>
      )
    }
    if (movies_1.length > 0) {
      console.log(genre_names)
      return (
        <div>
          <div className='like movies'>
            <div>
              <h4 style={{ display: "flex", float: "left", marginLeft: "108px", color: "white", fontFamily: "fantasy", cursor: "pointer" }} >Movies</h4>
              <a onClick={() => {
                this.setState({
                  show_all: !this.state.show_all
                })
                // console.log(this.state)
              }} style={{
                display: "flex", float: "right", marginRight: "108px", color: "white", cursor: "pointer",
                fontFamily: "Comic Sans, Comic Sans MS, cursive"
              }} >
                {(!this.state.show_all) ? 'Show all' : 'Hide'}
              </a>
              <hr style={{ display: "block", clear: "both", boxShadow: "0 0 10px 1px black" }} />
            </div>
            {(this.state.show_all) ? <MovieList movies={movies_1} /> :
              <MovieList movies={movies_1.slice(1, 9)} />
            }
            <hr style={{ boxShadow: "0 0 10px 1px black" }} />
          </div>
          {genre_html}
        </div>
      )
    } else {
      return (<DisplayMsg />);
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { movieList, userDetail, movieList1, recommend_movieList, genres_state } = state;
  const { items: movies } = movieList;
  console.log(genres_state)
  const { items: movies_1 } = movieList1
  const { items: re_movies } = recommend_movieList
  const keyword = ownProps.params.keyword;
  return { movies, keyword, userDetail, movies_1, re_movies, genres_state }
}

export default connect(mapStateToProps)(MovieContainer);
