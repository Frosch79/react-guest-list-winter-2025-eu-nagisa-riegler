import Input from './Input';

export default function Form(props) {
  return (
    <div className={props.className}>
      <p>Guest list</p>
      {/* by returning on last name input form submit both */}
      <form id="new-guest" type="submit">
        <Input
          className={props.className}
          label="First name"
          id="first-name"
          onChange={props.getFirstName}
          value={props.first}
          readOnly={props.readOnly}
        />
        <Input
          className={props.className}
          label="Last name"
          id="last-name"
          onKeyDown={props.getList}
          onChange={props.getLastName}
          value={props.last}
          readOnly={props.readOnly}
        />
      </form>
    </div>
  );
}
