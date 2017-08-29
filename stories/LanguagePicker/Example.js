import React from 'react';
import {LanguagePicker} from 'wix-style-react';

const mockDictionary = {
  en: 'Hello',
  fr: 'Bonjour',
  tr: 'Merhaba'
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {languageKey: 'en'};
  }
  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', marginLeft: '30px'}} className="ltr">
        <LanguagePicker dataHook="story-languagePicker" onSelect={languageKey => this.setState({languageKey})}>
          <LanguagePicker.Option languageKey="en">English</LanguagePicker.Option>
          <LanguagePicker.Option languageKey="fr">French</LanguagePicker.Option>
          <LanguagePicker.Option languageKey="tr">Turkish</LanguagePicker.Option>
        </LanguagePicker>
        <h1>{mockDictionary[this.state.languageKey]}</h1>
      </div>
    );
  }
}
