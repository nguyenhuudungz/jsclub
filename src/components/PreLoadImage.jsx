import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from './Loader';

import img1 from '../img/hackathon-avatar.jpg';
import img2 from '../img/ci-avatar.jpg';
import img3 from '../img/cp-avatar.png';
import img4 from '../img/prom-avatar.jpg';
import img5 from '../img/tb-avatar.jpg';

const mobileImages = [img1, img2, img3, img4, img5];
const desktopImages = [];
const otherImages = [];

class PreLoadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    console.log('React call componentDidMount', this.state);
    window.onload = () => {
      setTimeout(() => {
        this.setState(prevState => ({ loaded: !prevState.loaded }), () => console.log('window.onload', this.state));
        console.log('%cAll images loaded', 'color: green');
      }, 500);
    };
  }

  render() {
    const mobile = () => (
      <div>
        {mobileImages.map((value, index) => (
          <img src={value} alt={index} key={index} />
        ))}
      </div>
    );

    const desktop = () => (
      <div>
        {desktopImages.map((value, index) => (
          <img src={value} alt={index} key={index} />
        ))}
      </div>
    );

    const other = () => (
      <div>
        {otherImages.map((value, index) => (
          <img src={value} alt={index} key={index} />
        ))}
      </div>
    );

    const getMobileOrDesktop = () => (this.props.isMobile ? mobile() : desktop());

    const renderLoader = () => (!this.state.loaded ? <Loader /> : <div />);

    return (
      <div>
        {renderLoader()}
        <div style={{ display: 'none' }}>
          {getMobileOrDesktop()}
          {other()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { mobile, scroll } = state;
  return {
    // this.props.isMobile this.props.isScroll
    isMobile: mobile,
    isScroll: scroll
  };
}

export default connect(
  mapStateToProps,
  null
)(PreLoadImage);
