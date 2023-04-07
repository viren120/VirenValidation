import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTableRow } from '../app/tableSlice';
// import { useFormik  } from 'formik';

export default function Form() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  console.log(rows);
  const [formValidationError, setFormValidationError] = useState(false);
  const tableData = useSelector((state) => state.table.data);

  //   const Formik = useFormik({
  //     // initialValues: initialValues,
  //     handleSubmit: (values) => {
  //       console.log(values);
  //     },
  //   });
  // console.log(Formik);

  // const initialValues = {
  //   location: '',
  //   desc: '',
  //   pass: '',
  //   conpass: '',
  //   country: '',
  //   state: '',
  //   city: '',
  // };
  const ValidationError = () => {
    let errorsForValidation = {};

    if (!formData.location) {
      errorsForValidation.location = 'Location is Required';
    } else if (formData.location.length <= 4) {
      errorsForValidation.location = 'Location must be more then 3 character';
    }

    if (!formData.desc) {
      errorsForValidation.desc = 'description is Required';
    } else if (formData.desc.length <= 5) {
      errorsForValidation.desc = 'description must be more then 4 character';
    }

    if (!formData.pass) {
      errorsForValidation.pass = 'Location is Required';
    } else if (formData.pass.length <= 5) { 
      errorsForValidation.pass = 'Location must be 5 character';
    }
    if (!formData.conpass) {
      errorsForValidation.conpass = 'Location is Required';
    } else if (formData.conpass.length <= 5) {
      errorsForValidation.conpass = 'Location must be 5 character';
    }

    return errorsForValidation;
  };

  const [formData, setFormData] = useState({
    location: '',
    desc: '',
    pass: '',
    conpass: '',
    country: '',
    state: '',
    city: '',
  });
  useEffect(() => {
    setRows(tableData);
  }, [tableData]);

  const dispatch = useDispatch();
  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // if (event.target.value.length <= 3) {
    //   setFormValidationError(true);
    // } else {
    //   setFormValidationError(false);
    // }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = ValidationError(formData);
    setFormValidationError(Object.keys(errors).length > 0);

    // setFormValidationError(ValidationError(formData));
    const newTableData = {
      location: formData.location,
      desc: formData.desc,
      pass: formData.pass,
      conpass: formData.conpass,
      country: formData.country,
      state: formData.state,
      city: formData.city,
    };
    dispatch(addTableRow(newTableData));
    setFormData({
      location: '',
      desc: '',
      pass: '',
      conpass: '',
      country: '',
      state: '',
      city: '',
      tag: '',
    });
    navigate('/');
  };
  function formBtnOpenTable() {
    navigate('/');
  }

  return (
    <>
      <div id='header-id'>
        <h4>ClickUp Functionality Clone</h4>
      </div>
      <div id='main-form-div'>
        <button
          type='button'
          className='btnCloseForm'
          onClick={formBtnOpenTable}
        >
          X
        </button>
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
            />
            {formValidationError && (
              <div style={{ color: 'red', fontSize: '13px' }}>
                {formValidationError.location}
              </div>
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
            />
            {/* {formValidationError ? <span>Password is not valid</span> : ''} */}
          </div>
          <label htmlFor='' className='form-label-description'>
            password
          </label>
          <input
            id='desc'
            type='password'
            name='pass'
            onChange={handleFormChange}
            value={formData.pass}
            className='desc'
            autoComplete='off'
          />
          <label htmlFor='' className='form-label-description'>
            Confirm Password
          </label>
          <input
            id='desc'
            type='password'
            name='conpass'
            onChange={handleFormChange}
            value={formData.conpass}
            className='pass'
            autoComplete='off'
          />
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
            <option value='Australia'>Australia</option>
            <option value='Usa'>Usa</option>
          </select>
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
          <button id='submit' type='submit' value='submit' placeholder='Submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
