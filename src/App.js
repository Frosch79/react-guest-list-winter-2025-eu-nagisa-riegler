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
    await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: first, lastName: last }),
    });

    apiFetch().catch((error) => console.log(error));
  }

  const keyHandle = (event) => {
    /* If in the input form click return */
    if (event.key !== 'Enter') {
      return;
    } else if (firstName !== '' && lastName !== '') {
      return (
        createGuest(firstName, lastName), setFirstName(''), setLastName('')
      );
    }
  };

  async function removeGuest(event) {
    /* Remove a guest */
    const user = event.target.getAttribute('name');
    await fetch(`${baseUrl}/guests/${Number(user)}`, {
      method: 'DELETE',
    });

    apiFetch().catch((error) => console.log(error));
  }

  const checkFilter = async (event) => {
    /* To check the attending */
    const id = event.target.getAttribute('name');

    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        guestList.find((obj) => obj.id === id).attending
          ? { attending: false }
          : { attending: true },
      ),
    });
    apiFetch().catch((error) => console.log(error));
  };

  const removeAllGuests = async () => {
    const attendingGuest = guestList.filter((obj) => obj.attending === true);

    for (let i = 0; i < attendingGuest.length; i++) {
      const id = attendingGuest[i].id;

      await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });
    }
    apiFetch().catch((error) => console.log(error));
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="App">
          <Form
            className="Form"
            readOnly={isLoading}
            getList={keyHandle}
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
            check={(event) => checkFilter(event)}
            readOnly={isLoading}
          />
        </div>
      )}
    </div>
  );
}
