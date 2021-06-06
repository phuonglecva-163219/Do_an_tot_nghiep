import { combineReducers } from 'redux'
import { routerActions, routerReducer } from 'react-router-redux'
//import merge from 'lodash/merge'
import {
  FETCH_MOVIES, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE,
  FETCH_MOVIE, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE,
  FETCH_STAR_SUCCESS, FETCH_STAR_FAILURE,
  FETCH_CASTS, FETCH_CASTS_SUCCESS, FETCH_CASTS_FAILURE,
  FETCH_TRAILERS, FETCH_TRAILERS_SUCCESS, FETCH_TRAILERS_FAILURE,
  SEARCH_MOVIE, SEARCH_MOVIE_SUCCESS, SEARCH_MOVIE_FAILURE, FETCH_MOVIES_FOR_USER, FETCH_RECOMMENDED_MOVIES
} from '../actions'

const defaultStateList = {
  isFetching: false,
  items: [],
  error: {}
};
const initUser = {
  'id': localStorage.getItem('id'),
  'username': localStorage.getItem('username'),
  'password': '',
  'isLogged': (localStorage.getItem('accessToken')) ? true : false
}

const genres =
  { "data": [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }] }

const genres_state = (state = genres, action) => {
  switch (action.type) {
    default:
      return state
  }
}
const userDetail = (state = initUser, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const userInfo = action.data
      return {
        ...userInfo,
        'isLogged': true
      }
    }
    case 'LOGOUT': {
      return initUser
    }
    case 'RESTORE': {
      return action.data
    }
    default:
      return state
  }
}

const movieList = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
    case SEARCH_MOVIE:
      return { ...state, isFetching: true };
    case FETCH_MOVIES_SUCCESS:
    case SEARCH_MOVIE_SUCCESS:
      return { ...state, isFetching: false, items: action.data };
    case FETCH_MOVIES_FAILURE:
    case SEARCH_MOVIE_FAILURE:
      return { ...state, isFetching: false, error: action.data };
    default:
      return state;
  }
};
const movieList1 = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_MOVIES_FOR_USER:
      return { ...state, isFetching: false, items: action.data }
    default:
      return state;
  }
}

const recommend_movieList = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_RECOMMENDED_MOVIES:
      return { ...state, isFetching: false, items: action.data }
    default:
      return state
  }
}

const castList = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_CASTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_CASTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data
      });
    case FETCH_CASTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      });
    default:
      return state;
  }
};

const trailerList = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_TRAILERS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_TRAILERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data
      });
    case FETCH_TRAILERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      });
    default:
      return state;
  }
};

const defaultState = {
  isFetching: false,
  item: {},
  error: {}
};

const movieDetail = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.data
      });
    case FETCH_MOVIE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      });
    default:
      return state;
  }
};

const starDetail = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_STAR_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.data
      });
    case FETCH_STAR_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      });
    default:
      return state;
  }
};

const input = (state = '', action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
};

const movieApp = combineReducers({
  movieList,
  castList,
  trailerList,
  movieDetail,
  starDetail,
  input,
  routing: routerReducer,
  userDetail,
  movieList1,
  recommend_movieList,
  genres_state
});

export default movieApp;
