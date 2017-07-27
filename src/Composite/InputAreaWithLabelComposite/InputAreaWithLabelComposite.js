import React, {Children} from 'react';
import {any, bool} from 'prop-types';
import last from 'lodash/last';
import WixComponent from '../../BaseComponents/WixComponent';
import styles from './InputAreaWithLabelComposite.scss';
import FieldLabelAttributes from '../../FieldLabelAttributes/FieldLabelAttributes';

class InputAreaWithLabelComposite extends WixComponent {
  render() {
    const children = Children.toArray(this.props.children);
    return (
      <div>
        { children.length === 2 ?
          <div className={styles.label}>
            {children[0]}
            { this.props.required || this.props.info ? <FieldLabelAttributes required={this.props.required} info={this.props.info}/> : null }
          </div> : null
        }
        { last(children) }
      </div>
    );
  }
}

InputAreaWithLabelComposite.propTypes = {
  children: any,
  required: bool
};

InputAreaWithLabelComposite.displayName = 'InputAreaWithLabelComposite';

export default InputAreaWithLabelComposite;
