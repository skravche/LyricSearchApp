import React, { Component } from 'react';
import axios from 'axios';
import music_id from '../api';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import StarRatingComponent from 'react-star-rating-component';

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

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
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
            <div class="card-body">
              <h5 className="card-title">Lyrics:</h5>
              <p className="card-text">{lyrics}</p>
            </div>
            <ul className="list-group mt-3">
              <li className="list-group-item">
                <strong>Song Genre: </strong>
                {track.primary_genres.music_genre_list.length === 0 ||
                track.primary_genres.music_genre_list.length === undefined
                  ? 'NO GENRE AVAILABLE'
                  : track.primary_genres.music_genre_list[0].music_genre
                      .music_genre_name}
              </li>
              <li className="list-group-item">
                <strong>Release Data: </strong>
                <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
              </li>
              <li className="list-group-item">
                <div className="stars-box">
                  <strong>Track Raiting: </strong>
                  <StarRatingComponent
                    className="stars"
                    name="rate2"
                    editing={false}
                    renderStarIcon={() => <span>☆</span>}
                    starCount={10}
                    value={Math.floor(track.track_rating / 10)}
                  />
                </div>
              </li>
              <li className="list-group-item">
                <strong>Album ID: </strong>
                {track.album_id}
              </li>
            </ul>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
