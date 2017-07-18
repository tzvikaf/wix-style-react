import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const OpacityExample = ({show}) => {
  return (
    <div className={css.basicWrapper}>
      <Animator opacity scale>
        {show && <div className={css.basicDiv}>I am animating opacity AND SCALE </div>}
      </Animator>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <OpacityExample/>
  </AnimationTemplate>

