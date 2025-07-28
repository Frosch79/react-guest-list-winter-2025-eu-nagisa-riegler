import './App.css';
import { useEffect, useState } from 'react';
import Button from './Button';
import Form from './Form';
import ListTable from './ListTable';

export default function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /* const baseUrl = 'https://frosch-79-express-gue-19.deno.dev'; */
  const baseUrl = 'http://localhost:4000';

  const apiFetch = async () => {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuestList(allGuests);
    setIsLoading(false);
  };

  useEffect(() => {
    /* fetch API data */

    apiFetch().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.title = 'Loading...';
    } else {
      document.title = 'GUEST LIST';
    }
  }, [isLoading]);

  async function createGuest(first, last) {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: first, lastName: last }),
    });

    const createdGuest = await response.json();
    setGuestList((state) => [...state, createdGuest]);
  }

  const keyHandle = (event) => {
    /* If in the input form click return */
    if (event.key === 'Enter' && firstName !== '' && lastName !== '') {
      createGuest(firstName, lastName).catch((error) => console.log(error));
      setFirstName('');
      setLastName('');
      return;
    }
  };

  async function removeGuest(event) {
    /* Remove a guest */
    const user = event.currentTarget.name;
    const response = await fetch(`${baseUrl}/guests/${Number(user)}`, {
      method: 'DELETE',
    });
    const deleteGuest = await response.json();
    setGuestList(
      guestList.filter((removeUser) => removeUser.id !== deleteGuest.id),
    );
  }

  const checkBoxHandle = async (attend, id) => {
    /* To check the attending */
    console.log('id', id);

    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: attend }),
    });

    const updateGuest = await response.json();

    setGuestList(
      guestList.map((obj) =>
        obj.id === updateGuest.id ? updateGuest : { ...obj },
      ),
    );
  };

  const removeAllGuests = async () => {
    const attendingGuest = guestList.filter((obj) => obj.attending === true);

    for (let i = 0; i < attendingGuest.length; i++) {
      const id = attendingGuest[i].id;

      await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });
    }
    setGuestList(guestList.filter((obj) => obj.attending === false));
  };
  return (
    <div className={isLoading ? 'Loading' : 'App'}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Form
            className="Form"
            readOnly={isLoading}
            getList={(event) => keyHandle(event)}
            first={firstName}
            last={lastName}
            getFirstName={(event) => setFirstName(event.currentTarget.value)}
            getLastName={(event) => setLastName(event.currentTarget.value)}
          />

          <Button
            /* to delete all attending guest */
            onClick={() => removeAllGuests()}
            value="delete all attending guests"
          />
          <ListTable
            guestList={guestList}
            onClick={(event) => removeGuest(event)}
            checkControl={(attend, id) => checkBoxHandle(attend, id)}
            readOnly={isLoading}
          />
        </>
      )}
    </div>
  );
}
