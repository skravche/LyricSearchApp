import React, { Component } from 'react';
import axios from 'axios';
import music_id from './components/api';

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Result',
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Track',
    dispatch: action => this.setState(state => reducer(state, action)),
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=ua&f_has_lyrics=1%20&apikey=${music_id}`
      )
      .then(response => {
        // console.log(response.data);
        this.setState({
          track_list: response.data.message.body.track_list,
          heading: 'Top 10 Tracks',
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
