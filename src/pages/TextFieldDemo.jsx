import React from 'react';

import { TextField, Slider } from '../components';
import { banners, defaultBannerImage } from '../config/constants';
import { Div } from '../components/TextField/style';

const TextFieldDemo = () => (

  <Div>
    <div>
      <Slider altText="No Image" duration="2000" height="200" random banner={banners} defaultbanner={defaultBannerImage} />
    </div>
    <p><b>This is a Disabled Input</b></p>
    <TextField disabled value="disabled input" />
    <p><b> A Valid Input</b></p>
    <TextField value="accessible" />
    <p><b>An input with Errors </b></p>
    <TextField error="Could not be more than" value="101" />
  </Div>
);
export default TextFieldDemo;
