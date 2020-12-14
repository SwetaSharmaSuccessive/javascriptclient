import React from 'react';
import PropTypes from 'prop-types';
import { publicImageFolder, banners, defaultBannerImage } from '../../config/constants';
import Img from './style';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

componentDidMount = () => {
  const total = banners.length;
  const {
    random, duration,
  } = this.props;
  let { current } = this.state;
  this.number = setInterval(() => {
    current = random ? getRandomNumber(total) : getNextRoundRobin(current, total);
    this.setState({ current });
  }, duration);
}

componentWillUnmount = () => {
  clearInterval(this.number);
}

render() {
  const { current } = this.state;
  const {
    altText, height, banner,
  } = this.props;

  const { defaultbanner } = this.props;

  const image = !banner.length ? `${defaultbanner}` : `${publicImageFolder}${banner[current]}`;
  return (
    <>
      <div align="center">
        <Img src={image} alt={altText} height={height} />
      </div>
    </>
  );
}
}

Slider.propTypes = {
  altText: PropTypes.string,
  banner: PropTypes.arrayOf(PropTypes.string),
  defaultbanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'DefaultBanner',
  banner: [],
  defaultbanner: defaultBannerImage,
  duration: 2000,
  height: 200,
  random: false,
};
export default Slider;
