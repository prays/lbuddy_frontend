import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function UserGrid({ users }) {
  const [pageSize, setPageSize] = React.useState(5);

  const columns = [
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'full_name', headerName: 'Full name', width: 150 },
    { field: 'birthdate', headerName: 'Birthdate', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 75 },
    { field: 'education', headerName: 'Education', width: 150 },
    { field: 'job', headerName: 'Job', width: 150 },
    { field: 'year_joined', headerName: 'Year Joined', width: 150 },
    { field: 'group_id', headerName: 'Group ID', width: 150 },
    { field: 'joined', headerName: 'Joined', width: 150 }
  ];

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 20]}
        rows={users}
        columns={columns}
      />
    </div>
  );
}