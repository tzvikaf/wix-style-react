import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/MultiSelect/README.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';
import ExampleWithLimitedHeight from './ExampleWithLimitedHeight';
import ExampleWithLimitedHeightRaw from '!raw-loader!./ExampleWithLimitedHeight';

storiesOf('3. Inputs', module)
  .add('3.8 Tags', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>

      <CodeExample title="Limited height" code={ExampleWithLimitedHeightRaw}>
        <ExampleWithLimitedHeight/>
      </CodeExample>
    </div>
  ));
