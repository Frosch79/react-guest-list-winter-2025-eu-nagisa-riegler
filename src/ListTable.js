import { useState } from 'react';
import Filter from './Filter';
import TableBody from './TableBody';

export default function ListTable(props) {
  const [filter, setFilter] = useState('default');

  return (
    <div>
      <Filter onChange={(event) => setFilter(event.target.value)} />

      {props.guestList
        .filter((obj) => {
          if (filter === 'attending') {
            return obj.attending === true;
          } else if (filter === 'non-attending') {
            return obj.attending === false;
          } else {
            return obj;
          }
        })
        .map((name) => (
          <TableBody
            key={`${name.id}`}
            name={name.id}
            firstName={name.firstName}
            lastName={name.lastName}
            onClick={props.onClick}
            check={props.check}
            attending={name.attending}
            readOnly={props.readOnly}
          />
        ))}
    </div>
  );
}
