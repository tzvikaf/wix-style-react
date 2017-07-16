import React from 'react';
import {Button} from 'wix-style-react/Backoffice';
import Animator from '../../src/Animations/Animator';
import * as css from './Example.scss';
import AnimationTemplate from './AnimationTemplate';

const Item = () => 'I am an item from the Server';
const items = new Array(5).fill(1).map(() => <Item />);
const ExampleMockServer = ({show}) => {

  return (
    <div className={css.basicWrapper}>
      <Animator opacity scale className={`${css.flexParent} ${css.absolute}`}>
        {!show && 'The casual spinner...'}
      </Animator>
      <Animator opacity sequence translate="top" className={css.flexParent}>
        {items.map(item =>
          show && <div className={css.basicDiv}>item</div>
        )}
      </Animator>
    </div>
  )
};

export default () =>
  <AnimationTemplate>
    <ExampleMockServer/>
  </AnimationTemplate>

