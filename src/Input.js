export default function Input(props) {
  return (
    <div className={props.className}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        id={props.label}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
        value={props.value}
        readOnly={props.readOnly}
      />
    </div>
  );
}
