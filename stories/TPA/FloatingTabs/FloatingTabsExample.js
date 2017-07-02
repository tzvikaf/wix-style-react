import React from 'react';
import FloatingTabs from '../../../src/TPA/FloatingTabs';
import FloatingTabItem from '../../../src/TPA/FloatingTabItem';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px'
};

function FloatingTabsExample() {
  return (
    <div>
      <div className="ltr" style={style}>
        Floating Tabs<br/>
        <FloatingTabs>
          <FloatingTabItem onClick={() => {}} active={true}/>
          <FloatingTabItem onClick={() => {}}/>
        </FloatingTabs>
      </div>
    </div>
  );
}

FloatingTabsExample.displayName = 'FloatingTabs Example';

export default FloatingTabsExample;
