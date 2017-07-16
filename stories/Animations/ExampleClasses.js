import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const ExampleClasses = ({show}) => {
  return (
    <div className={css.basicWrapper}>
      <Animator opacity className={css.flexParent}>
        {show && <div childClassName={css.flexGrow1} className={css.basicDiv}>We are flex children</div>}
        {show && <div childClassName={css.flexGrow1} className={css.basicDiv}>We all have flex-grow:1</div>}
        {show && <div childClassName={`${css.flexGrow1} ${css.flexGrow4}`} className={css.basicDiv}>except me, I have flex-grow: 10</div>}
      </Animator>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <ExampleClasses/>
  </AnimationTemplate>

