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
        // console.log(response.data);
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
          // console.log(value);
          const { dispatch } = value;
          return (
            <div className="card card-body md-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" />
                Search Track{' '}
              </h1>
              <p className="lead text-center">etxt//////</p>
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
