import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Input from './Input';
import {tpaInputTestkitFactory as inputTestkitFactory} from '../../../testkit';

describe('Input', () => {
  it('should exist', () => {
    const div = document.createElement('div');
    const dataHook = 'input-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Input dataHook={dataHook}/>
      </div>
    ));
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.exists()).toBeTruthy();
  });

  it('should contain default value', () => {
    const div = document.createElement('div');
    const dataHook = 'input-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Input defaultValue="some default value" dataHook={dataHook}/>
      </div>
    ));
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.getValue()).toEqual('some default value');
  });
  it('should return passed value', () => {
    const div = document.createElement('div');
    const dataHook = 'input-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Input value="the value" defaultValue="some default value" dataHook={dataHook}/>
      </div>
    ));
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.getValue()).toEqual('the value');
  });

  it('should have input class', () => {
    const div = document.createElement('div');
    const dataHook = 'input-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Input styles={{locals: {input: 'input'}}} dataHook={dataHook}/>
      </div>
    ));
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.hasClass('input')).toBeTruthy();
    expect(inputTestkit.hasClass('error')).toBeFalsy();
  });

  it('should be in error state', () => {
    const div = document.createElement('div');
    const dataHook = 'input-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Input error={true} styles={{locals: {input: 'input', error: 'error'}}} dataHook={dataHook}/>
      </div>
    ));
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.hasClass('error')).toBeTruthy();
  });

  it('should be able to pass error class name', () => {
    const div = document.createElement('div');
    const dataHook = 'input-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Input error={true} errorClassName="customErrorClassName" styles={{locals: {input: 'input', error: 'error'}}} dataHook={dataHook}/>
      </div>
    ));
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.hasClass('customErrorClassName')).toBeTruthy();
  });

  it('should be able to pass custom input css class name', () => {
    const div = document.createElement('div');
    const dataHook = 'input-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Input error={true} inputClassName="customInputClassName" styles={{locals: {input: 'input', error: 'error'}}} dataHook={dataHook}/>
      </div>
    ));
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.hasClass('customInputClassName')).toBeTruthy();
  });

});
