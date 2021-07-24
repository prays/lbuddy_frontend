import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({ readCourses, handleComboBox }) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={readCourses}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      onChange={handleComboBox}
    />
  );
}