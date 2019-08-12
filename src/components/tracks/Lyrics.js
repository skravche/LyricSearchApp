import React, { Component } from 'react';
import axios from 'axios';
import music_id from '../api';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

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
        // console.log(response.data.message.body.lyrics.lyrics_body);
        this.setState({
          lyrics: response.data.message.body.lyrics.lyrics_body,
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${music_id}`
        );
      })
      .then(response => {
        this.setState({
          track: response.data.message.body.track,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;
    console.log(track);
    console.log(lyrics);

    // console.log(
    //   track.primary_genres.music_genre_list[0].music_genre.music_genre_name
    // );

    if (
      // track === undefined ||
      // lyrics === undefined ||
      // Object.keys(track) === 0 ||
      // Object.keys(lyrics) === 0
      Object.entries(track).length === 0 &&
      track.constructor === Object &&
      Object.entries(lyrics).length === 0 &&
      lyrics.constructor === Object
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by
              <span className="text-secondary"> {track.artist_name}</span>
            </h5>
            <label>Lyrics:</label>
            <br />
            <p>{this.lyrics}</p>

            <ul className="list-group mt-3">
              <li className="list-group-item">
                <strong>Album ID: {track.album_id}</strong>
              </li>
              {
                <li className="list-group-item">
                  <strong>Genre: </strong>
                  {/* {
                    track.primary_genres.music_genre_list[0].music_genre
                      .music_genre_name
                  }{' '} */}
                </li>
              }
              <li className="list-group-item">
                <strong>Explicit: </strong>
                {track.explicit ? 'No' : 'Yes'}
              </li>
              <li className="list-group-item">
                <strong>Release Data: </strong>
                <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
              </li>
              <li className="list-group-item">
                <strong>Track Raiting: </strong>
                {track.track_rating}
              </li>
            </ul>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
