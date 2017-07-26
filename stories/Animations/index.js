import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/Animator/README.md';

import ExampleOpacity from './ExampleOpacity';
import ExampleOpacityRaw from '!raw-loader!./ExampleOpacity';

import ExampleOpacityAndScale from './ExampleOpacityAndScale';
import ExampleOpacityAndScaleRaw from '!raw-loader!./ExampleOpacityAndScale';

import ExampleHeight from './ExampleHeight';
import ExampleHeightRaw from '!raw-loader!./ExampleHeight';

import ExampleString from './ExampleString';
import ExampleStringRaw from '!raw-loader!./ExampleString';

import ExampleWidth from './ExampleWidth';
import ExampleWidthRaw from '!raw-loader!./ExampleWidth';

import ExampleTranslate from './ExampleTranslate';
import ExampleTranslateRaw from '!raw-loader!./ExampleTranslate';

import ExampleTranslateSize from './ExampleTranslateSize';
import ExampleTranslateSizeRaw from '!raw-loader!./ExampleTranslateSize';

import ExampleMockServer from './ExampleMockServer';
import ExampleMockServerRaw from '!raw-loader!./ExampleMockServer';

import ExampleTranslateDirection from './ExampleTranslateDirection';
import ExampleTranslateDirectionRaw from '!raw-loader!./ExampleTranslateDirection';

import ExampleTiming from './ExampleTiming';
import ExampleTimingRaw from '!raw-loader!./ExampleTiming';

import ExampleClasses from './ExampleClasses';
import ExampleClassesRaw from '!raw-loader!./ExampleClasses';

import ExampleSequence from './ExampleSequence';
import ExampleSequenceRaw from '!raw-loader!./ExampleSequence';

import ExampleDebug from './ExampleDebug';
import ExampleDebugRaw from '!raw-loader!./ExampleDebug';

import ExampleByInProp from './ExampleByInProp';
import ExampleByInPropRaw from '!raw-loader!./ExampleByInProp';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

storiesOf('Common', module)
  .add('Animations', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>

      <CodeExample title="Opacity Animation" code={ExampleOpacityRaw}>
        <ExampleOpacity/>
      </CodeExample>

      <CodeExample title="Opacity and Scale Animation" code={ExampleOpacityAndScaleRaw}>
        <ExampleOpacityAndScale/>
      </CodeExample>

      <CodeExample title="Animator can take a simple text" code={ExampleStringRaw}>
        <ExampleString/>
      </CodeExample>

      <CodeExample title="Height Animations" code={ExampleHeightRaw}>
        <ExampleHeight/>
      </CodeExample>

      <CodeExample title="Width Animations" code={ExampleWidthRaw}>
        <ExampleWidth/>
      </CodeExample>

      <CodeExample title="Translate Animation - All of these can work" code={ExampleTranslateRaw}>
        <ExampleTranslate/>
      </CodeExample>

      <CodeExample title="Translate Sizes" code={ExampleTranslateSizeRaw}>
        <ExampleTranslateSize/>
      </CodeExample>

      <CodeExample title="Translate Directions" code={ExampleTranslateDirectionRaw}>
        <ExampleTranslateDirection/>
      </CodeExample>

      <CodeExample title="Different Timing" code={ExampleTimingRaw}>
        <ExampleTiming/>
      </CodeExample>

      <CodeExample title="Adding Custom Classes & Styles" code={ExampleClassesRaw}>
        <ExampleClasses/>
      </CodeExample>

      <CodeExample title="Sequence" code={ExampleSequenceRaw}>
        <ExampleSequence/>
      </CodeExample>

      <CodeExample title="Combination of both mount and unmount in the same Animator (requires to set unique 'key' prop for every child" code={ExampleMockServerRaw}>
        <ExampleMockServer/>
      </CodeExample>

      <CodeExample title="Animating with 'in' prop when components exists by default" code={ExampleByInPropRaw}>
        <ExampleByInProp/>
      </CodeExample>

      <CodeExample title="Debug - Emulates animation stages - Inspect element in devtools to see class & Style changes" code={ExampleDebugRaw}>
        <ExampleDebug/>
      </CodeExample>

      <CodeExample title="Playground" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>
    </div>
  ));
