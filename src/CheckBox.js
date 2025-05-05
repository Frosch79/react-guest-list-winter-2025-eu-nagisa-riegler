export default function CheckBox(props) {
  return (
    <div>
      <input
        type="checkbox"
        id={props.id}
        aria-label={`${props.firstName} ${props.lastName} attending status`}
        onClick={props.onClick}
        defaultChecked={props.attending}
        readOnly={props.readOnly}
      />
    </div>
  );
}
