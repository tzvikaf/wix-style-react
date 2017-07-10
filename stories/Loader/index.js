import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/Loader/README.md';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/Loader/README.TESTKIT.md';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw-loader!./ExampleSizes';

import ExampleWithText from './ExampleWithText';
import ExampleWithTextRaw from '!raw-loader!./ExampleWithText';

storiesOf('Core', module)
  .add('Loader', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Sizes" code={ExampleSizesRaw}>
          <ExampleSizes/>
        </CodeExample>

        <CodeExample title="WithText" code={ExampleWithTextRaw}>
          <ExampleWithText/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestKit}/>
      </div>
    </TabbedView>
  ));
