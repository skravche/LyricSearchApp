import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
  state = {
    title: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card card-body md-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" />
                Search Track{' '}
              </h1>
              <p className="lead text-center">etxt//////</p>
              <form>
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
