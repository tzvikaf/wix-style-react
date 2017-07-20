import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const WidthExample = ({show}) => {
  return (
    <div style={{width: 'auto', height: '70px', border: '1px solid black', display: 'flex'}}>
      <Animator width>
        {show && <div style={{whiteSpace: 'nowrap', fontSize: '40px', padding:'0 20px 0 0', border: '1px solid orange'}}>I am animating Width </div>}
      </Animator>
      <div>I am some casual text here</div>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <WidthExample/>
  </AnimationTemplate>

