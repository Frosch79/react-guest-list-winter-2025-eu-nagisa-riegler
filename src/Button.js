export default function Button(props) {
  return (
    <div>
      <button
        id={props.id}
        onClick={props.onClick}
        type="button"
        name={props.name}
      >
        {props.value}
      </button>
    </div>
  );
}
