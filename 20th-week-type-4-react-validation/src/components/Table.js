import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { assignTagData } from '../app/tableSlice';

export default function Table() {
  const [rows, setRows] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.data);

  useEffect(() => {
    let filteredData = tableData;

    if (selectedCountry !== 'all') {
      filteredData = filteredData.filter(
        (row) => row.country === selectedCountry
      );
    }

    if (selectedState !== 'all') {
      filteredData = filteredData.filter((row) => row.state === selectedState);
    }

    if (selectedCity !== 'all') {
      filteredData = filteredData.filter((row) => row.city === selectedCity);
    }

    setRows(filteredData);
  }, [tableData, selectedCountry, selectedState, selectedCity]);

  const handleTableFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === 'tableCountry') {
      setSelectedCountry(value);
    } else if (name === 'tableState') {
      setSelectedState(value);
    } else if (name === 'tableCity') {
      setSelectedCity(value);
    }
  };

  function handleRowSelect(event, rowIndex) {
    const newRows = [...rows];
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      selected: event.target?.checked,
    };
    setRows(newRows);
  }
  function handleTagSubmit(event) {
    event.preventDefault();
    const newRows = rows.map((row) => {
      if (row.selected) {
        return { ...row, tag: selectedTag, selected: false };
      } else {
        return row;
      }
    });
    setRows(newRows);
    setSelectedTag('');
    dispatch(assignTagData(newRows));
  }
  function handleAddTag() {
    const newTag = prompt('Enter a new tag:');
    if (newTag) {
      setSelectedTag(newTag);
      const tagsDropdown = document.getElementById('tags');
      const newOption = document.createElement('option');
      newOption.value = newTag;
      newOption.text = newTag;
      tagsDropdown.add(newOption);
    }
  }

  function handleRemoveTag() {
    const newRows = rows.map((row) => {
      if (row.selected) {
        return {
          location: row.location,
          desc: row.desc,
          country: row.country,
          state: row.state,
          city: row.city,
          tag: '',
          selected: false,
        };
      }
      return row;
    });
    setRows(newRows);
  }
  const handleAddDataClick = () => {
    navigate('/form');
  };
  return (
    <>
      <section id='section-Tag'>
        <button
          id='open-form-btn'
          className='tag-submit-btn'
          onClick={handleAddDataClick}
          autoFocus
        >
          Add data
        </button>
        <select
          id='tags'
          className='tag-select'
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value=''>-- Select --</option>
          <option value='Home'>Home</option>
          <option value='Office'>Office</option>
          <option value='Other'>Other</option>
        </select>
        <button
          id='submit-btn'
          className='tag-submit-btn'
          onClick={handleTagSubmit}
        >
          Submit
        </button>
        <button id='add-tag-btn' className='add-tag-btn' onClick={handleAddTag}>
          Add Tag
        </button>

        <button
          id='remove-btn'
          className='remove-tag-btn'
          onClick={handleRemoveTag}
        >
          Remove
        </button>
      </section>
      {/* Table section -------------------------------------------------------------------------------*/}
      <div id='main-table-div'>
        <table id='table' border='1'>
          <thead className='table-thead'>
            <tr>
              <th></th>
              <th>Location</th>
              <th>Description</th>
              <th>
                <select
                  name='tableCountry'
                  id='table-country'
                  placeholder='Country'
                  onChange={handleTableFilterChange}
                >
                  <option value='all'>Country</option>
                  <option value='India'>India</option>
                  <option value='Australia'>Australia</option>
                  <option value='Usa'>Usa</option>
                </select>
              </th>
              <th>
                <select
                  name='tableState'
                  id='table-state'
                  placeholder='State'
                  onChange={handleTableFilterChange}
                >
                  <option value='all'>State</option>
                  <option value='Gujarat'>Gujarat</option>
                  <option value='South Australia'>South Australia</option>
                  <option value='California'>California</option>
                </select>
              </th>
              <th>
                <select
                  name='tableCity'
                  id='table-city'
                  placeholder='City'
                  onChange={handleTableFilterChange}
                >
                  <option value='all'>City</option>
                  <option value='Ahmedabad'>Ahmedabad</option>
                  <option value='Adelaide'>Adelaide</option>
                  <option value='Los Angeles'>Los Angeles</option>
                </select>
              </th>
              <th id='table-tag' value='Tag-'>
                Tags
              </th>
            </tr>
          </thead>
          <tbody className='table-tbody' id='tableBody'>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type='checkbox'
                      checked={row.selected}
                      onChange={(event) => handleRowSelect(event, index)}
                    />
                  </td>
                  <td>{row.location}</td>
                  <td>{row.desc}</td>
                  <td>{row.country}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td id='table-tag' value='Tag-'>
                    {row.tag}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='7'>No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
