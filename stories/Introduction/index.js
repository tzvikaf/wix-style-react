import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import Readme from '../../README.md';
import TestsReadme from '../../TESTS.md';
import Contribution from '../../CONTRIBUTION.md';
import TPA from '../../src/TPA/README.md';
import AutoDocsReadme from '../../docs/AutoDocs.md';

storiesOf('Introduction', {})
  .add('Getting started', () => (
    <div>
      <Markdown source={Readme}/>
    </div>
  )).add('Testing', () => (
    <div>
      <Markdown source={TestsReadme}/>
    </div>
  )).add('Contribution', () => (
    <div>
      <Markdown source={Contribution}/>
    </div>
  )).add('TPA', () => (
    <div>
      <Markdown source={TPA}/>
    </div>
  )).add('AutoDocs', () => (
    <div>
      <Markdown source={AutoDocsReadme}/>
    </div>
  ));
