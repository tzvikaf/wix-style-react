import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const OpacityExample = ({show}) => {
  return (
    <div className={css.basicWrapper}>
      <Animator opacity>
        {show && <div className={css.basicDiv}>I am animating Opacity </div>}
      </Animator>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <OpacityExample/>
  </AnimationTemplate>

