import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTableRow } from '../app/tableSlice';

export default function Form() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [validationLocation, setValidationLocation] = useState(false);
  const [validationCountry, setValidationCountry] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const tableData = useSelector((state) => state.table.data);
  const [formData, setFormData] = useState({
    location: '',
    country: '',
  });
  useEffect(() => {
    setRows(tableData);
  }, [tableData]);
  const dispatch = useDispatch();
  const validateForm = () => {
    if (formData.location.length <= 3) {
      setValidationLocation(true);
    } else {
      setValidationLocation(false);
    }
    if (formData.country === '') {
      setValidationCountry(true);
    } else {
      setValidationCountry(false);
    }
  };
  useEffect(() => {
    setIsFormValid(!(validationLocation || validationCountry));
  }, [validationLocation, validationCountry]);
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateForm();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTableData = {
      location: formData.location,
      country: formData.country,
    };
    dispatch(addTableRow(newTableData));
    setFormData({
      location: '',
      country: '',
    });
    setIsFormValid(false);
    navigate('/');
  };

  return (
    <>
      <div id='main-form-div'>
        <form id='form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='' className='form-label-location'>
              {' '}
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
            />
            {validationLocation ? (
              <span
                style={{ color: 'red', marginTop: '15px', fontSize: '13px' }}
              >
                Location must be 3 character or more
              </span>
            ) : (
              ''
            )}
          </div>
          <div>
            <label htmlFor='' className='form-label-country'>
              Country{' '}
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
            {validationCountry ? (
              <span style={{ color: 'red', fontSize: '15px' }}>
                Country is not Define
              </span>
            ) : (
              ''
            )}
          </div>
          <button
            id='submit'
            type='submit'
            value='submit'
            placeholder='Submit'
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
