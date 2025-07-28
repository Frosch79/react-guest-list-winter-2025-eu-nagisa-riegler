export default function CheckBox(props) {
  console.log('testcheck', props.testCheck);
  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="checkbox"
          id={props.id}
          aria-label={`${props.firstName} ${props.lastName} attending status`}
          onChange={props.change}
          checked={props.testCheck}
          readOnly={props.readOnly}
        />
      </form>
    </div>
  );
}
