import React, {Component} from 'react';
import Input from '../../../src/TPA/Input';
import styles from './styles.scss';

const style = {};


export const InputValidationErrorExample = () => {
  return (
    <div style={{width: '300px'}}>
      <Input error placeholder="Input in error state"/>
    </div>
  );
};

export const InputWithCustomStyleExample = () => {
  return (
    <div style={{width: '300px'}}>
      <Input inputClassName={styles.customInput} placeholder="Input with custom style"/>
    </div>
  );
};

export const InputWithCustomErrorExample = () => {
  return (
    <div style={{width: '300px'}}>
      <Input error errorClassName={styles.customError} placeholder="Input with custom error style"/>
    </div>
  );
};

const InputExample = () => {
  return (
    <div style={{width: '300px'}}>
      <Input placeholder="Default place holder" type="number"/>
    </div>
  );
}

export default InputExample;

