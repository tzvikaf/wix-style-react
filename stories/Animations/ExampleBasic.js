import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import ShowHideControls from './ShowHideControls';


const OpacityExample = ({show}) => {
  return (
  <div className={css.basicWrapper}>
    <Animator opacity>
      {show && <div className={css.basicDiv}>I am animating OPACITY</div>}
    </Animator>
  </div>
  )
};

const ScaleAndOpacityExample = ({show}) => {
  return (
    <div className={css.basicWrapper}>
      <Animator opacity scale>
        {show && <div className={css.basicDiv}>I am animating opacity AND SCALE </div>}
      </Animator>
    </div>
  )
};

const AnimatedExample = () => {

  return (
  <div>
    <ShowHideControls interval>
      <OpacityExample />
    </ShowHideControls>
    <ShowHideControls>
      <ScaleAndOpacityExample />
    </ShowHideControls>
  </div>
  )
};

export default () =>
  <AnimatedExample/>

