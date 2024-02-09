import React, { useEffect, useState } from 'react';
import './Main.css'
//import 'bootstrap/dist/css/bootstrap.min.css'; 


const Profile = () => {
  const [userdata, setUserData] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    contact: '',
    address: '',
    age: '',
    profession: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const URL = 'https://655500aa63cafc694fe75243.mockapi.io/aman';
    const userid = sessionStorage.getItem('userid');

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${URL}/${userid}`);
        const data = await res.json();
        setUserData(data);
        if (data && !data.name) {
          setFormValues({
            name: data.name || '',
            contact: data.contact || '',
            address: data.address || '',
            age: data.age || '',
            profession: data.profession || ''
          });
        }
        // Check if userdata.name exists and form has not been submitted
        if (data && data.name && !isSubmitted) {
          setIsSubmitted(true);
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    if (userid) {
      fetchUserProfile();
    }
  }, [isSubmitted]);
  useEffect(() => {
    // Check if userdata is available before checking if userdata.name exists
    if (userdata) {
      if (userdata.name) {
        console.log('ok');
      } else {
        alert('Complete your profile!');
      }
    }
  }, [userdata]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = 'https://655500aa63cafc694fe75243.mockapi.io/aman';
      const userid = sessionStorage.getItem('userid');

      const res = await fetch(`${URL}/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: formValues.newPassword })
      });

      if (res.ok) {
        alert('Password changed successfully!');
        setShowPasswordForm(false)
        setFormValues({ ...formValues, newPassword: '' });
      } else {
        alert('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = 'https://655500aa63cafc694fe75243.mockapi.io/aman';
      const userid = sessionStorage.getItem('userid');

      const res = await fetch(`${URL}/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (userdata && userdata.name && isSubmitted) {
    return (
      <div className='duser'>
       <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Email:</th>
            <td>{userdata.email}</td>
          </tr>
          <tr>
            <th>Name:</th>
            <td>{userdata.name}</td>
          </tr>
          <tr>
            <th>Contact:</th>
            <td>{userdata.contact}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{userdata.address}</td>
          </tr>
          <tr>
            <th>Age:</th>
            <td>{userdata.age}</td>
          </tr>
          <tr>
            <th>Profession:</th>
            <td>{userdata.profession}</td>
          </tr>
        </tbody>
      </table>

        {showPasswordForm ? (
            <form onSubmit={handlePasswordChangeSubmit}>
              <label>
                New Password:
                <input type="password" name="newPassword" value={formValues.newPassword} onChange={handleChange} required />
              </label>
              <button className='cbtn' type="submit">Change Password</button>
              <button type="button" className='cbtn' onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </form>
          ) : (
            <button className='cbtn' onClick={() => setShowPasswordForm(true)}>Change Password</button>
          )}
      </div>
    );
  } else {
    return (
      <form className='cform' onSubmit={handleSubmit}>
      
     
          <input type="text" name="name" placeholder='Enter name' value={formValues.name} onChange={handleChange} required/>
   
       
          
          <input type="text" name="contact" placeholder='Enter contact' value={formValues.contact} onChange={handleChange} required/>
     
        
          
          <input type="text" name="address" placeholder='Enter address' value={formValues.address} onChange={handleChange} required/>
       
        
        
          <input type="text" name="age" placeholder='Enter age' value={formValues.age} onChange={handleChange} required/>
       
        
          
          <input type="text" name="profession" placeholder='Enter Profession' value={formValues.profession} onChange={handleChange} required/>
    
        <button className='cbtn' type="submit" >Submit</button>
      </form>
    );
  }
};

export default Profile;
