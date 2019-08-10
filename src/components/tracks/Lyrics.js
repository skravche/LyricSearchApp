import React, { Component } from 'react';
import axios from 'axios';
import music_id from '../api';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${music_id}`
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          lyrics: response.data.message.body.lyrics.lyrics_body,
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${music_id}`
        );
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Lyrcis</h1>
      </div>
    );
  }
}

export default Lyrics;
