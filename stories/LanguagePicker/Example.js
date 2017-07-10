import React from 'react';
import {LanguagePicker} from 'wix-style-react';

const Example = () => (
  <div style={{display: 'flex', alignItems: 'center', marginLeft: '30px'}}>
    <LanguagePicker dataHook="story-languagePicker" onSelect={locale => console.log('locale: ', locale)}>
      <LanguagePicker.Option languageKey="en">English</LanguagePicker.Option>
      <LanguagePicker.Option languageKey="fr">French</LanguagePicker.Option>
      <LanguagePicker.Option languageKey="tr">Turkish</LanguagePicker.Option>
    </LanguagePicker>
  </div>
);


export default Example;
