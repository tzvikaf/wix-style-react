import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import ShowHideControls from './ShowHideControls';


const OpacityExample = ({show}) => {
  return (
  <div>
    <Animator opacity>
      {show && <div className={css.basicDiv}>This is a basic div</div>}
    </Animator>
  </div>
  )
}

const AnimatedExample = () => {

  return (
    <ShowHideControls>
      <OpacityExample />
    </ShowHideControls>
  )
};

export default () =>
  <AnimatedExample/>

