import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/DatePicker/README.md';
import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';
import ExampleControlledRtl from './ExampleControlledRtl';
import ExampleControlledRawRtl from '!raw-loader!./ExampleControlledRtl';
import ExampleControlledExcludePast from './ExampleControlledExcludePast';
import ExampleControlledRawExcludePast from '!raw-loader!./ExampleControlledExcludePast';
import ExampleDisabled from './ExampleDisabled';
import ExampleDisabledRaw from '!raw-loader!./ExampleDisabled';

storiesOf('Core', module)
  .add('DatePicker', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>

      <CodeExample title="Controlled input - RTL" code={ExampleControlledRawRtl}>
        <ExampleControlledRtl/>
      </CodeExample>

      <CodeExample title="Controlled input - exclude past dates" code={ExampleControlledRawExcludePast}>
        <ExampleControlledExcludePast/>
      </CodeExample>

      <CodeExample title="Disabled input" code={ExampleDisabledRaw}>
        <ExampleDisabled/>
      </CodeExample>
    </div>
  ));
