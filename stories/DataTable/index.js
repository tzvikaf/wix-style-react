import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/DataTable/README.md';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/DataTable/README.TESTKIT.md';

import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';

import ExampleCallingServer from './ExampleCallingServer';
import ExampleCallingServerRaw from '!raw-loader!./ExampleCallingServer';

storiesOf('Core', module)
  .add('DataTable', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Usage examples</h1>
        <CodeExample title="With infinite scroll" code={ExampleRaw}>
          <Example/>
        </CodeExample>
        <CodeExample title="With server calling (up to 100 items)" code={ExampleCallingServerRaw}>
          <ExampleCallingServer/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestKit}/>
      </div>
    </TabbedView>
  ));
