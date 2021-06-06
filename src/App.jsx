import React, { Component } from 'react';
import SearchBar from './containers/SearchBar';
import './App.css';
import { Login } from './containers';
import Porfolio from './containers/Portfolio';
import resumeData from './resumeData'
import MovieSlider from './components/MovieSlider';
import { Jumbotron, Button } from 'react-bootstrap'
export default class App extends Component {
  render() {
    const accessToken = localStorage.getItem('accessToken')
    { console.log(accessToken) }
    if (accessToken) {
      return (
        <div>
          <SearchBar brand="BK Movie" searchText={''} />
          <hr style={{
            height: "2px",
            border: "0",
            backgroundColor:"blue",
            backgroundImage:"linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"
          }} />
          <Jumbotron style={{ textAlign: 'center', color: "white", paddingTop: "0px", paddingBottom: "0px", marginTop:"0",
            backgroundColor:"inherit", backgroundImage:"inherit",
            fontFamily:"fantasty"
        }}>
            <h1>Welcome to my recommender system</h1>
          </Jumbotron>
          <hr style={{
            height: "2px",
            border: "0",
            backgroundColor:"blue",
            backgroundImage:"linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"
          }}/>
          <MovieSlider />
          <hr style={{ boxShadow: "0 0 10px 1px black"}} />
          {this.props.children}
        </div>
      );
    } else {
      return (
        <Login />
      )
    }
  }
}
