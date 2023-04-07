import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTableRow } from '../app/tableSlice';

export default function Form() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const tableData = useSelector((state) => state.table.data);

  const [validationLocation, setValidationLocation] = useState(false);
  const [validationDesc, setValidationDesc] = useState(false);
  const [validationCountry, setValidationCountry] = useState(false);
  const [validationState, setValidationState] = useState(false);
  const [validationCity, setValidationCity] = useState(false);

  const [formData, setFormData] = useState({
    location: '',
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
    if (formData.location.length <= 3) {
      console.log('errror location if');
      setValidationLocation(true);
    } else {
      console.log('error in location else');
      setValidationLocation(false);
    }
    if (formData.desc.length <= 5) {
      console.log('errror desc if');
      setValidationDesc(true);
    } else {
      console.log('error in desc else');
      setValidationDesc(false);
    }

    if (formData.country === '') {
      console.log('errror country if');
      setValidationCountry(true);
    } else {
      console.log('error in country else');
      setValidationCountry(false);
    }
    if (formData.state === '') {
      setValidationState(true);
    } else {
      setValidationState(false);
    }
    if (formData.city === '') {
      setValidationCity(true);
    } else {
      setValidationCity(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTableData = {
      location: formData.location,
      desc: formData.desc,
      country: formData.country,
      state: formData.state,
      city: formData.city,
    };
    dispatch(addTableRow(newTableData));
    setFormData({
      location: '',
      desc: '',
      country: '',
      state: '',
      city: '',
      tag: '',
    });
    navigate('/');
  };

  return (
    <>
      <div id='main-form-div'>
        <form id='form' onSubmit={handleSubmit}>
          <div>
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
              required
            />
            {validationLocation ? (
              <span style={{ color: 'red', fontSize: '15px' }}>
                Location must be 3 character or more
              </span>
            ) : (
              ''
            )}
          </div>
          <div>
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
              required
            />
            {validationDesc ? (
              <span style={{ color: 'red', fontSize: '15px' }}>
                Description must be 5 character or more
              </span>
            ) : (
              ''
            )}
          </div>
          <div>
            <label htmlFor='' className='form-label-country'>
              Country
            </label>
            <select
              name='country'
              onChange={handleFormChange}
              value={formData.country}
              id='country'
              required
            >
              <option value=''>--Select--</option>
              <option value='India'>India</option>
            </select>
            {validationCountry ? (
              <span style={{ color: 'red', fontSize: '15px' }}>
                Country is not Defined
              </span>
            ) : (
              ''
            )}
          </div>
          <div>
            <label htmlFor='' className='form-label-state'>
              State
            </label>
            <select
              name='state'
              onChange={handleFormChange}
              value={formData.state}
              id='state'
              required
            >
              <option value=''>--Select--</option>
              <option value='Gujarat'>Gujarat</option>
              <option value='South Australia'>South Australia</option>
              <option value='California'>California</option>
            </select>
            {validationState ? (
              <span style={{ color: 'red', fontSize: '15px' }}>
                State is not Defined
              </span>
            ) : (
              ''
            )}
          </div>
          <div>
            <label htmlFor='' className='form-label-city'>
              City
            </label>
            <select
              name='city'
              onChange={handleFormChange}
              value={formData.city}
              id='city'
              required
            >
              <option value=''>--Select--</option>
              <option value='Ahmedabad'>Ahmedabad</option>
              <option value='Adelaide'>Adelaide</option>
              <option value='Los Angeles'>Los Angeles</option>
            </select>
            {validationCity ? (
              <span style={{ color: 'red', fontSize: '15px' }}>
                City is not Defined
              </span>
            ) : (
              ''
            )}
          </div>
          <button id='submit' type='submit' value='submit' placeholder='Submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
