import ReactDOM from 'react-dom';

class DomManager {
  getHeight(ref, isHeight) {
    return isHeight ? `${ReactDOM.findDOMNode(ref).clientHeight}px` : 'inherit';
  }
}

export default DomManager;
