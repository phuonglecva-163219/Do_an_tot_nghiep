import React, {Component} from 'react'
import { Navbar, Image, Button, Nav } from 'react-bootstrap/lib'
import TMDBlogo from '../images/themoviedb_green.svg'
import {Form, FormControl} from 'react-bootstrap'
import logo from '../images/logo_square.svg'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import Autosuggest from 'react-autosuggest'
import './search.css'
import { URL_SEARCH, API_KEY_ALT, URL_IMG, IMG_SIZE_XSMALL} from '../const';
import {fetch_recommend_movies_for_users, logout} from '../actions'
import { Link } from 'react-bootstrap/lib/Navbar'

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      suggestions:[]
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      return this.handleSubmit(this.state.value);
    }
  }

  handleSubmit = (searchText) => {
    this.props.dispatch(push('/search/'+ searchText));
    this.setState({ value: ''});
  }
  handleRecommend = async ()=>{
    const {userDetail, dispatch} = this.props
    // const data = await fetch('http://localhost:5000/api/users/'+userDetail.id+'/recommend/'+ num_movies)
    // .then(data=>data.json())
    dispatch(fetch_recommend_movies_for_users(userDetail.id))
    dispatch(replace('recommend/' + userDetail.id))
    // console.log(data)
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  onSuggestionsFetchRequested = ({ value }) => {
      const trimmedValue = value.trim();

      if (trimmedValue.length > 0) {
          let url = URL_SEARCH + trimmedValue + API_KEY_ALT;
            fetch(url)
              .then(response => response.json())
              .then(json => json.results)
              .then(data => {
                const results = data.map(movie => {
                  let temp = {}
                  temp.id = movie.id
                  temp.title = movie.title
                  temp.img = movie.poster_path
                  temp.year = (movie.release_date === "") ? "0000" : movie.release_date.substring(0,4)
                  return temp
                });
                this.setState({
                  suggestions: results
                });
              }).catch(error => console.log('Exception to get Suggestions'))
      }
      else {
        this.setState({
          suggestions: []
        })
      }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  handleLogout = ()=>{
    console.log(this.props)
    this.props.dispatch(logout())
    localStorage.clear()
    this.props.dispatch(replace('/'))
  }
  renderSuggestion = (suggestion) => {
    return (
      <div>
      <img alt="" className="searchResult-image" src= {suggestion.img == null ? logo: URL_IMG+IMG_SIZE_XSMALL+suggestion.img } />
        <div className="searchResult-text">
          <div className="searchResult-name">
            {suggestion.title}
          </div>
          {suggestion.year}
        </div>
      </div>
    );
  };

  onSuggestionSelected = (event, { suggestion, method }) => {
    if (method === 'enter')
      event.preventDefault();
    this.props.dispatch(push('/movie/'+ suggestion.id));
    this.setState({ value: ''});
  };

  render(){
  const brandStyle = {
    fontWeight: 'bold',
    textTransform: 'caplitalize',
    paddingLeft: 10,
    fontSize: '1.2em',
    fontFamily: "fantasy"
  };

  const imgStyle = {
    height: '200%',
    width: 'auto',
    paddingLeft: '10px',
    marginTop: '-8px',
    display: 'inline-block'
  };

  const {value, suggestions} = this.state;
  const inputProps = {
    value,
    onChange: this.onChange,
    onKeyPress: this.handleKeyDown,
    placeholder: 'Search Movie Title...'
  };
  
  return (
    <Navbar bsStyle='inverse'>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#/"><span style={brandStyle}>{this.props.brand}</span>
          {/* <Image style={imgStyle} src={TMDBlogo}/> */}
          </a>
          <Link onClick={()=>this.handleRecommend()} style={{
            color:"white",
            fontWeight:"lighter",
            display:"inline",
            paddingLeft:"20px",
            cursor:"pointer",

            fontFamily: "fantasy"
          }}>Recommend</Link>
        </Navbar.Brand>
      </Navbar.Header>

      <Form  inline> 
        <Autosuggest className='mr-sm-2'
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
        <Link onClick={()=> this.handleLogout()} style={{
          color:"white",
          fontWeight:"bolder",
          marginLeft:"20px",
          cursor:"pointer",
          fontWeight:"lighter",
          fontFamily: "fantasy"

        }}>Log out</Link>
        </Form>

    </Navbar>
  );

  }
}
const mapStateToProps = (state) => {
  const {userDetail, recommend_movieList} = state
  return {userDetail,recommend_movieList}
}
export default connect(mapStateToProps)(SearchBar);
