import React from 'react';
import { Link } from 'react-router-dom';

const Track = props => {
  const { track } = props;
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              <i className="fas fa-music"> {track.track_name} </i>
            </strong>
            <br />
            <strong>
              <i className="fas fa-compact-disc"> {track.album_name} </i>
            </strong>
          </p>
          <Link
            to={`lyrics/track/${track.track_id}`}
            className="btn btn-dark btn-block"
          >
            <i className="" /> View Lyric
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
