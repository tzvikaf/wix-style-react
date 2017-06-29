import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/ButtonWithOptions/README.md';
import ReadmeTestkit from '../../src/ButtonWithOptions/README.TESTKIT.md';

import TabbedView from '../utils/Components/TabbedView';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw!./ExampleStandard';

import ExampleDropdownSize from './ExampleDropdownSize';
import ExampleDropdownSizeRaw from '!raw!./ExampleDropdownSize';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw!./ExampleControlled';

storiesOf('Core', module)
  .add('ButtonWithOptions', () => (
    <TabbedView tabs={['API', 'Testkit']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>

        <CodeExample title="Dropdown size" code={ExampleDropdownSizeRaw}>
          <ExampleDropdownSize/>
        </CodeExample>

        <CodeExample title="Controlled input" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
    </TabbedView>
  ));
