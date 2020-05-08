import React from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>

export class Maps extends React.Component {

  static defaultProps = {
    center: {
      lat: 50.006762,
      lng: 36.231929
    },
    zoom: 15
  };

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDYJpIykrgcUwCTnqC3D7DZ26AqQs70ANQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/*<AnyReactComponent
            lat={50.006762}
            lng={36.231929}
            text="My Marker"
          />*/}
        </GoogleMapReact>
      </div>
    )
  }
}


