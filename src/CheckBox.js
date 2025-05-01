export default function CheckBox(props) {
  return (
    <div>
      <input
        type="checkbox"
        name={props.name}
        aria-label={`${props.firstName} ${props.lastName} attending status`}
        onClick={props.onClick}
        defaultChecked={props.attending}
        readOnly={props.readOnly}
      />
    </div>
  );
}
