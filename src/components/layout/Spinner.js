import React from 'react';
import spinnerd from '../../stuff/spinnerd.gif';
import './app.css';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinnerd}
        alt="Loading... "
        style={{ width: '200px', margin: '40px auto', display: 'block' }}
      />
    </div>
  );
};

export default Spinner;
