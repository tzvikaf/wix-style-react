import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/TimeInput/README.md';

import ExampleUncontrolled from './ExampleUncontrolled';
import ExampleUncontrolledRaw from '!raw-loader!./ExampleUncontrolled';
import ExampleUncontrolled24h from './ExampleUncontrolled24h';
import ExampleUncontrolledRaw24h from '!raw-loader!./ExampleUncontrolled24h';
import moment from 'moment';

storiesOf('Core', module)
  .add('TimeInput', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>

      <CodeExample title="Uncontrolled input" code={ExampleUncontrolledRaw}>
        <ExampleUncontrolled startTime={moment('2016-04-03 13:42')}/>
      </CodeExample>

      <CodeExample title="Uncontrolled input 24h" code={ExampleUncontrolledRaw24h}>
          <ExampleUncontrolled24h startTime={moment('2016-04-03 13:42')}/>
      </CodeExample>
    </div>
  ));
