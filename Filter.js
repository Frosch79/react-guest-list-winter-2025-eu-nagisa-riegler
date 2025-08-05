import { useRef } from 'react';
import Button from './Button';

export default function Filter(props) {
  const selectRef = useRef(null);

  return (
    <div>
      <select
        ref={selectRef}
        defaultValue={(event) => event.target.option.value}
        onChange={props.onChange}
        id="guest-filter"
        selected
      >
        <option value="default">---select filter---</option>
        <option value="non-attending">non-attending guests</option>
        <option value="attending">attending guests</option>
      </select>
      <Button
        onClick={() => (selectRef.current.selectedIndex = 0)}
        value="reset"
      />
    </div>
  );
}
