import { useState } from 'react';
import Filter from './Filter';
import TableBody from './TableBody';

export default function ListTable(props) {
  const [selectFilter, setSelectFilter] = useState('default');

  return (
    <div>
      <Filter onChange={(event) => setSelectFilter(event.target.value)} />

      {props.guestsList
        .filter((list) => {
          if (selectFilter === 'attending') {
            return list.attending === true;
          } else if (selectFilter === 'non-attending') {
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
              attending={guest.attending}
              onClick={props.onClick}
            />
          );
        })}
    </div>
  );
}
