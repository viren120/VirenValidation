import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTableRow } from '../app/tableSlice';

export default function Form() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const tableData = useSelector((state) => state.table.data);
  const [formError, setFormError] = useState({});

  const [formData, setFormData] = useState({
    location: '',
    email: '',
    password: '',
    cpassword: '',
    desc: '',
    country: '',
    state: '',
    city: '',
  });

  useEffect(() => {
    setRows(tableData);
  }, [tableData]);

  const dispatch = useDispatch();

  const validateForm = () => {
    let err = {};

    if (formData.location === '') {
      err.location = 'Location is required!';
    } else if (formData.location.length < 3) {
      err.location = 'Location must be 3 characters or more!';
    }
    if (formData.email === '') {
      err.email = 'Email required!';
    } else {
      let regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(formData.email)) {
        err.email = 'Email not valid!';
      }
    }

    if (formData.password === '' || formData.cpassword === '') {
      err.password = 'Password and Confirm Password required!';
    } else {
      if (formData.password !== formData.cpassword) {
        err.password = 'Password not matched!';
      } else {
        if (formData.password.length < 6) {
          err.password = 'Password should greater than 6 characters!';
        }
      }
    }
    if (formData.desc === '') {
      err.desc = 'Description is required!';
    } else if (formData.desc.length < 5) {
      err.desc = 'Description must be 5 characters or more!';
    }
    if (formData.country === '') {
      err.country = 'Country is required!';
    }
    if (formData.state === '') {
      err.state = 'State is required!';
    }
    if (formData.city === '') {
      err.city = 'City is required!';
    }
    setFormError({ ...err });
    return Object.keys(err).length === 0;
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = validateForm();
    console.log('isValid', isValid);
    if (isValid) {
      const newTableData = {
        location: formData.location,
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
        desc: formData.desc,
        country: formData.country,
        state: formData.state,
        city: formData.city,
      };
      dispatch(addTableRow(newTableData));
      setFormData({
        location: '',
        email: '',
        password: '',
        cpassword: '',
        desc: '',
        country: '',
        state: '',
        city: '',
        tag: '',
      });
      navigate('/');
    }
  };
  function formBtnOpenTable() {
    navigate('/');
  }

  const handleBlur = () => {
    console.log('onblur fireee');
    validateForm();
  };

  return (
    <>
      <div id='header-id'>
        <h4>ClickUp Functionality Clone</h4>
      </div>
      <div id='main-form-div' onBlur={handleBlur}>
        <button
          type='button'
          className='btnCloseForm'
          onClick={formBtnOpenTable}
        >
          X
        </button>
        <form id='form' onSubmit={handleSubmit}>
          <div id='location-main-div'>
            <label htmlFor='' className='form-label-location'>
              Location
            </label>
            <input
              autoFocus
              id='location'
              onChange={handleFormChange}
              value={formData.location}
              name='location'
              type='text'
              autoComplete='off'
              // ref={inputRef}
              // onFocus={handleFocusLocation}
              // onBlur={handleBlurLocation}
            />
            <span style={{ color: 'red', fontSize: '16px' }}>
              {formError.location}
            </span>
          </div>
          <div id='desc-main-div'>
            <label htmlFor='' className='form-label-description'>
              Description
            </label>
            <input
              id='desc'
              type='text'
              name='desc'
              onChange={handleFormChange}
              value={formData.desc}
              className='desc'
              autoComplete='off'
              // ref={inputRef}
            />
            <span style={{ color: 'red', fontSize: '16px' }}>
              {formError.desc}
            </span>
          </div>
          <div id='desc-main-div'>
            <label htmlFor='' className='form-label-description'>
              EMail
            </label>
            <input
              id='desc'
              type='text'
              name='email'
              onChange={handleFormChange}
              value={formData.email}
              className='desc'
              autoComplete='off'
              // ref={inputRef}
            />
            <span style={{ color: 'red', fontSize: '16px' }}>
              {formError.email}
            </span>
          </div>
          <div id='desc-main-div'>
            <label htmlFor='' className='form-label-description'>
              Password
            </label>
            <input
              id='desc'
              type='text'
              name='password'
              onChange={handleFormChange}
              value={formData.password}
              className='desc'
              autoComplete='off'
              // ref={inputRef}
            />
            <span style={{ color: 'red', fontSize: '16px' }}>
              {formError.password}
            </span>
          </div>
          <div id='desc-main-div'>
            <label htmlFor='' className='form-label-description'>
              Confirm Password
            </label>
            <input
              id='desc'
              type='text'
              name='cpassword'
              onChange={handleFormChange}
              value={formData.cpassword}
              className='desc'
              autoComplete='off'
              // ref={inputRef}
            />
          </div>
          <div id='country-main-div'>
            <label htmlFor='' className='form-label-country'>
              Country
            </label>
            <select
              name='country'
              onChange={handleFormChange}
              value={formData.country}
              id='country'
            >
              <option value=''>--Select--</option>
              <option value='India'>India</option>
            </select>
            <span style={{ color: 'red', fontSize: '16px' }}>
              {formError.country}
            </span>
          </div>
          <div id='state-main-div'>
            <label htmlFor='' className='form-label-state'>
              State
            </label>
            <select
              name='state'
              onChange={handleFormChange}
              value={formData.state}
              id='state'
            >
              <option value=''>--Select--</option>
              <option value='Gujarat'>Gujarat</option>
              <option value='South Australia'>South Australia</option>
              <option value='California'>California</option>
            </select>
            <span style={{ color: 'red', fontSize: '16px' }}>
              {formError.state}
            </span>
          </div>
          <div id='city-main-div'>
            <label htmlFor='' className='form-label-city'>
              City
            </label>
            <select
              name='city'
              onChange={handleFormChange}
              value={formData.city}
              id='city'
            >
              <option value=''>--Select--</option>
              <option value='Ahmedabad'>Ahmedabad</option>
              <option value='Adelaide'>Adelaide</option>
              <option value='Los Angeles'>Los Angeles</option>
            </select>
            <span style={{ color: 'red', fontSize: '16px' }}>
              {formError.city}
            </span>
          </div>
          <button id='submit' type='submit' value='submit' placeholder='Submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
