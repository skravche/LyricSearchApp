import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
export class Provider extends Component {
  state = {
    track_list: [
      // { track: { track_name: 'abc' } },
      // { track: { track_name: '12312' } },
    ],
    heading: 'Top 10 Track',
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1
        &apikey=${process.env.REACT_APP_MM_KEY}` //    773b612c98313de00ba0ce6e49068ed0
      )
      .then(response => console.log(response.data))
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
