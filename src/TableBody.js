import { useState } from 'react';
import Button from './Button';
import CheckBox from './CheckBox';

export default function TableBody(props) {
  const [checkBox, setCheckBox] = useState(props.attending || false);
  const control = props.checkControl;

  function controlledCheckBox(checked) {
    setCheckBox(checked.target.checked);
    control(checked.target.checked, props.id);
  }

  return (
    <div data-test-id="guest">
      <ul>
        <li>
          <CheckBox
            firstName={props.firstName}
            lastName={props.lastName}
            readOnly={props.readOnly}
            checked={checkBox}
            change={(event) => controlledCheckBox(event)}
          />
        </li>
        <li>{props.firstName}</li>
        <li>{props.lastName}</li>
        <li>
          <Button
            name={props.id}
            onClick={props.onClick}
            id={`Remove ${props.firstName} ${props.lastName}`}
            value="Remove"
          />
        </li>
      </ul>
    </div>
  );
}
