import { useState } from 'react';
import Filter from './Filter';
import TableBody from './TableBody';

export default function ListTable(props) {
  const [filter, setFilter] = useState('default');

  return (
    <div>
      <Filter onChange={(event) => setFilter(event.target.value)} />

      {props.guestList
        .filter((list) => {
          if (filter === 'attending') {
            return list.attending === true;
          } else if (filter === 'non-attending') {
            return list.attending === false;
          } else {
            return list;
          }
        })
        .map((guest) => {
          return (
            <TableBody
              key={`${guest.id}`}
              id={guest.id}
              firstName={guest.firstName}
              lastName={guest.lastName}
              readOnly={props.readOnly}
              checkControl={props.checkControl}
            />
          );
        })}
    </div>
  );
}
