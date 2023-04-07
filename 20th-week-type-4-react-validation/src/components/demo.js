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
  });
  useEffect(() => {
    setRows(tableData);
  }, [tableData]);
  const dispatch = useDispatch();
  const validateForm = () => {
    let err = {};
    if (formData.location === '') {
      err.location = 'location required!';
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
    };
    dispatch(addTableRow(newTableData));
    setFormData({
      location: '',
    });
    navigate('/');
  };
};
  return (
    <>
      <div id='main-form-div'>
        <form id='form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='' className='form-label-location'> Location</label>
            <input
              autoFocus
              id='location'
              onChange={handleFormChange}
              value={formData.location}
              name='location'
              type='text'
              autoComplete='off'/>
            <span style={{ color: 'red', fontSize: '15px' }}>
              {formError.location}
            </span>
          </div>
          <button id='submit' type='submit' value='submit' placeholder='Submit'>Submit </button>
        </form>
      </div>
    </>
  );
}
