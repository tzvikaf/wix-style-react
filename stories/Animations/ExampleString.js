import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const ExampleString = ({show}) => {
  return (
    <div className={css.basicWrapper}>
      <Animator opacity scale>
        {show && 'I am a simple string'}
      </Animator>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <ExampleString/>
  </AnimationTemplate>

