import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const HeightExample = ({show}) => {
  return (
    <div style={{height: 'auto', border: '1px solid black', padding: '10px 20px 20px'}}>
      <div>I am some casual text here</div>
      <Animator opacity height>
        {show && <div style={{fontSize: '40px', border: '1px solid purple', padding: '20px'}}>I am animating Height (No Height specified!!)</div>}
      </Animator>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <HeightExample/>
  </AnimationTemplate>

