import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/Input/README.md';
import ReadmeTestkit from '../../src/Input/README.TESTKIT.md';

import TabbedView from '../utils/Components/TabbedView';
import Examples from './Examples';

import ExamplePaneltitleStyle from './ExamplePaneltitleStyle';
import ExamplePaneltitleStyleRaw from '!raw-loader!./ExamplePaneltitleStyle';

storiesOf('Core', module)
  .add('Input', () => (
    <TabbedView tabs={['API', 'Themes', 'Testkit']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Usage examples</h1>
        <Examples/>
      </div>
      <div>
        <TabbedView tabs={['normal', 'material', 'amaterial', 'paneltitle']}>

          <Examples theme="normal"/>

          <Examples theme="material"/>

          <Examples theme="amaterial"/>

          <CodeExample title="PaneltitleStyle" code={ExamplePaneltitleStyleRaw}>
            <ExamplePaneltitleStyle/>
          </CodeExample>

        </TabbedView>
      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
    </TabbedView>
  ));
