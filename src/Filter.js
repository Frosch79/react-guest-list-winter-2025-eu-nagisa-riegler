import Button from './Button';

export default function Filter(props) {
  return (
    <div>
      <select
        defaultValue={(event) => event.target.option.value}
        onChange={props.onChange}
        id="guest-filter"
      >
        <option selected value="default">
          ---select filter---
        </option>
        <option value="non-attending">non-attending guests</option>
        <option value="attending">attending guests</option>
      </select>
      <Button
        onClick={() =>
          (document.getElementById('guest-filter').selectedIndex = 0)
        }
        value="reset"
      />
    </div>
  );
}
