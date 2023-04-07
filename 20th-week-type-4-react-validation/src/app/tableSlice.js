import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    data: [],
    filterData: [],
  },
  reducers: {
    addTableRow: (state, action) => {
      state.data.push(action.payload);
      state.filterData.push(action.payload);
    },
    assignTagData: (state, action) => {
      state.data = [...action.payload];
    },
  },
});

export const { addTableRow, assignTagData } = tableSlice.actions;

export default tableSlice.reducer;
