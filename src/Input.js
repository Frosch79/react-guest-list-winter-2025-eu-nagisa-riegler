export default function Input(props) {
  return (
    <div className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
        value={props.value}
        readOnly={props.readOnly}
      />
    </div>
  );
}
