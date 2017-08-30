import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/GoogleAddressInput/README.md';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleControlledWithFooter from './ExampleControlledWithFooter';

storiesOf('Core', module)
  .add('GoogleAddressInput', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>
      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>
      <CodeExample title="Controlled input - with a footer" code={ExampleControlledRaw}>
        <ExampleControlledWithFooter/>
      </CodeExample>
    </div>
  ));
