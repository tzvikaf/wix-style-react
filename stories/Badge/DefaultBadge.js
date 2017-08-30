import React from 'react';

import {Badge} from 'wix-style-react';

export default () => (
  <div>
    <Badge>Default</Badge>&nbsp;
    <Badge type="primary">Primary</Badge>&nbsp;
    <Badge type="success">Success</Badge>&nbsp;
    <Badge type="info">Info</Badge>&nbsp;
    <Badge type="warning">Warning</Badge>&nbsp;
    <Badge type="danger">Danger</Badge>
  </div>
);
