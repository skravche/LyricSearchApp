import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import music_id from '../api';

class Search extends Component {
  state = {
    title: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.title
        }&page_size=10&page=1&s_track_rating=desc&apikey=${music_id}`
      )
      .then(response => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: response.data.message.body.track_list,
        });

        this.setState({ title: '' });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body md-4 p-4">
              <h1 className="display-4 text-center">Search Track </h1>
              <h3 className="display-12 text-center">
                <span>It`s all </span>
                <i className="fas fa-music" />
                <span> about </span>
                <i className="fas fa-headphones-alt" />
                <span> music </span>
                <i className="fas fa-sliders-h" />
              </h3>
              <form onSubmit={this.searchTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block mb-5"
                >
                  Get Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
