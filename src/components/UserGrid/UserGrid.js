import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function UserGrid({ users }) {
  const [pageSize, setPageSize] = React.useState(5);

  const columns = [
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'first_name', headerName: 'First name', width: 150 },
    { field: 'last_name', headerName: 'Last name', width: 150 },
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