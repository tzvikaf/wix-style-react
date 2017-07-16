import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const ExampleDebug = () => {
  return (
    <div className={css.basicWrapper} style={{height: '70px'}}>
      <Animator translate="top" scale debug="enter">
        <div className={css.basicDiv}>emulates enter class: 'enter'</div>
      </Animator>

      <Animator translate="top" scale debug="entering">
        <div className={css.basicDiv}>emulates entering classes: 'enter enter-active'</div>
      </Animator>

      <Animator translate="top" scale debug="leave">
        <div className={css.basicDiv}>emulates leave class: 'leave'</div>
      </Animator>

      <Animator translate="top" scale debug="leaving">
        <div className={css.basicDiv}>emulates leaving classes: 'leave leave-active'</div>
      </Animator>
    </div>
  )
};

export default () =>
  <ExampleDebug/>

