import React from 'react'
import Trailer from './Trailer'
import { Col } from 'react-bootstrap'

export default function TrailerList({data}) {
    let trailers = data.map(function(trailer) {
      return(
        <Col className="md-auto" key={trailer.id} >
          <Trailer trailer={trailer.key} />
        </Col>
      );
    });

    const style = {
      marginTop: '15px',
    };

    const titleStyle = {
      paddingLeft: '20px',
      width:"100%"
    };

    if (trailers.length !== 0){
      return(
        <div style={{paddingTop:"20px", textAlign:"center"}}>
          <h3 style={titleStyle}>Trailers</h3>
          <hr />
          <div style={style}>{trailers}</div>
        </div>
      );
    } else
      return null;
}
