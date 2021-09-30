/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { buttonStyle, inputCss, mainBody, tickStyle } from './css';

const baseUrl = 'https://kalsang-guestlist.herokuapp.com';

export default function GuestList() {
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [guestList, setGuestList] = useState([]);
  const resetInputField = () => {
    setNewFirstName('');
    setNewLastName('');
  };

  async function getUser() {
    const response = await fetch('https://kalsang-guestlist.herokuapp.com');
    const allGuests = await response.json();
    console.log(allGuests);
    setGuestList(allGuests);
  }

  // to run in the first render kept []empty
  useEffect(() => {
    getUser();
  }, []);
  // if loading is not put undefined might occur because not read

  // if (!GuestList[0].firstname) {
  //   return <div>Loading</div>;
  // } else
  async function createNewGuest() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: newFirstName, lastName: newLastName }),
    });
    // it waits for the response await
    const createdGuest = await response.json();
    if (!newFirstName.trim() || !newLastName.trim()) {
      alert('Please Enter Full Name');
      return;
    } else {
      const newGuest = [...guestList];
      newGuest.push(createdGuest);
      setGuestList(newGuest);
      console.log(newGuest);
    }
  }
  async function patchGuest(userParameter) {
    const response = await fetch(`${baseUrl}/${userParameter.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: userParameter.attending }),
    });
    const updatedGuest = await response.json();
    console.log('Which guest is updated of attendance :', updatedGuest);
  }

  function isAttending(id, attendance) {
    const newUpdate = [...guestList];
    const updateNew = newUpdate.find((user) => user.id === id);
    updateNew.attending = attendance;
    patchGuest(updateNew);
    setGuestList(newUpdate);
    console.log('Guest attending after a change:', newUpdate);
  }
  async function getDeleteGuest(user) {
    const response = await fetch(`${baseUrl}/${user.id}`, { method: 'DELETE' });

    /* as the deleted guest is someone that we dont want, i used .filter and only allowed the guests to show who are not accepted (the deletedGuest) and others i have just set it as new setGuestList. */
    const deletedGuest = await response.json();

    const cancelAttendance = [...guestList].filter(
      (guest) => guest.id !== deletedGuest.id,
    );
    setGuestList(cancelAttendance);
    console.log('which guest is removed:', deletedGuest);
  }

  return (
    <div css={mainBody}>
      <h1>UpLeveled Graduation Party</h1>
      <label>
        First Name:
        <input
          css={inputCss}
          value={newFirstName}
          onChange={(event) =>
            setNewFirstName(event.currentTarget.value.toUpperCase())
          }
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          css={inputCss}
          value={newLastName}
          onChange={(event) =>
            setNewLastName(event.currentTarget.value.toUpperCase())
          }
        />
      </label>
      <br />
      <button
        css={buttonStyle}
        className="btn"
        onClick={() => createNewGuest()}
      >
        Add to List
      </button>
      {/* Reset button */}
      <button css={buttonStyle} onClick={resetInputField}>
        Reset
      </button>
      <br />
      <h2>List of Guest</h2>
      <p>
        GUEST ATTENDING
        <input css={tickStyle} checked={true} readOnly type="checkbox" />
      </p>
      <ol>
        {guestList.map((user) => {
          return (
            <li key={user.id}>
              {user.firstName} {user.lastName}
              <input
                css={tickStyle}
                checked={user.attending}
                type="checkbox"
                onChange={(e) => {
                  isAttending(user.id, e.currentTarget.checked);
                }}
              />
              {/* the onclick doesnt need e target  */}
              <button
                css={buttonStyle}
                className="btn"
                onClick={() => getDeleteGuest(user)}
              >
                <span>remove🗑</span>
              </button>
            </li>
          );
        })}
      </ol>

      <br />
    </div>
  );
}
