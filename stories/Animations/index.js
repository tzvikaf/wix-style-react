import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/Animations/README.md';

import ExampleOpacity from './ExampleOpacity';
import ExampleOpacityRaw from '!raw-loader!./ExampleOpacity';
import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

storiesOf('Common', module)
  .add('Animations', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>
      <CodeExample title="Basic Examples" code={ExampleOpacityRaw}>
        <ExampleOpacity/>
      </CodeExample>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>
    </div>
  ));
