import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';


const ExampleTranslate = ({show}) => {
  return (
    <div className={css.basicWrapper}>
      <Animator opacity translate="top">
        {show && <div className={css.basicDiv}>translate="top" </div>}
      </Animator>
      <Animator opacity translate={{to: 'top'}}>
        {show && <div className={css.basicDiv}>{`translate={{to: 'top'}}`} </div>}
      </Animator>
      <Animator opacity translate={{to: 'top', size: 100}}>
        {show && <div className={css.basicDiv}>{`translate={{to: 'top', size: 100}}`} </div>}
      </Animator>
      <Animator opacity translate={{to: 'top', size: {in: 100, out: 100}}}>
        {show && <div className={css.basicDiv}>{`translate={{to: 'top', size: {in: 100, out: 100}}}`} </div>}
      </Animator>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <ExampleTranslate/>
  </AnimationTemplate>

