import Button from './Button';
import CheckBox from './CheckBox';

export default function TableBody(props) {
  return (
    <div data-test-id="guest">
      <ul>
        <li>
          <CheckBox
            id={props.id}
            firstName={props.firstName}
            lastName={props.lastName}
            onClick={props.check}
            onChange={props.onChange}
            attending={props.attending}
            readOnly={props.readOnly}
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
