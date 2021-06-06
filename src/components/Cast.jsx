import React from 'react';
import { Col, Image, Row, Thumbnail } from 'react-bootstrap/lib';
import { URL_IMG, IMG_SIZE_SMALL, IMG_SIZE_LARGE } from '../const';

export default function Cast({cast}) {
  return (
    <Thumbnail src={URL_IMG+IMG_SIZE_LARGE+cast.profile_path} alt={cast.name} >
      <p>{cast.name}</p>
    </Thumbnail>
  );
}

Cast.propTypes = {
  cast: React.PropTypes.shape({
    profile_path: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  })
};
