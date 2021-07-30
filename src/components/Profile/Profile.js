import React from 'react';
import Container from 'react-bootstrap/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { WEBSITE_LINK } from '../../constants.js';
import AdminStepper from '../AdminStepper/AdminStepper.js';

const Profile = ({ users }) => {
    const [email, setEmail] = React.useState('');
    const [userSelected, setUserSelected] = React.useState({});
    const [WCS, setWCS] = React.useState('');


    const handleComboBox = (event) => {
        setEmail(event?.target?.textContent);
    }

    React.useEffect(() => {
        if (email) {
            users.forEach((user) => {
                if (user.email === email) {
                    setUserSelected(user);
                }
            })
            const fetchDataWCS = async () => {
                try {
                    const data = await fetch(`${WEBSITE_LINK}/get-wcs`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': window.sessionStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            email: email
                        })
                    });
                    const wcs = await data.json();
                    if (wcs.length === 0) {
                        setWCS('No WCS yet.')
                    } else {
                        setWCS(wcs[0].statement);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchDataWCS();
        }
    }, [email]);

    return (
        <Container fluid="true">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'end'}}>
                <h2 style={{justifySelf: 'start', alignSelf: 'center'}}>Users Profile</h2>
                <ComboBoxEmail required users={users} handleComboBox={handleComboBox} />
            </div>
            <hr style={{border: '2px solid black', marginTop: '10px'}} />
            { email ?
            (<div style={{fontSize: '1.2rem', display: 'grid'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 7fr'}}>
                    <p>First name:</p>
                    <p>{userSelected.first_name}</p>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 7fr'}}>
                    <p>Last name:</p>
                    <p>{userSelected.last_name}</p>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 7fr'}}>
                    <p>Email:</p>
                    <p>{userSelected.email}</p>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 7fr'}}>
                    <p>Group ID:</p>
                    <p>{userSelected.group_id}</p>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 7fr'}}>
                    <p>Joined:</p>
                    <p>{userSelected.joined}</p>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 7fr'}}>
                    <p>Last WCS:</p>
                    <p>{WCS}</p>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 7fr'}}>
                    <p>Current Step:</p>
                    <AdminStepper />
                </div>
            </div>)
            : (<></>)
            }
        </Container>
    );
}

function ComboBoxEmail({ users, handleComboBox }) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={users}
      getOptionLabel={(option) => option.email}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search email" variant="outlined" />}
      onChange={handleComboBox}
    />
  );
}

export default Profile;