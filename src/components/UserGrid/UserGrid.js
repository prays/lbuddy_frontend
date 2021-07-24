import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { WEBSITE_LINK } from '../../constants.js';

export default function UserGrid() {
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const columns = [
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'first_name', headerName: 'First name', width: 150 },
    { field: 'last_name', headerName: 'Last name', width: 150 },
    { field: 'group_id', headerName: 'Group ID', width: 150 },
    { field: 'joined', headerName: 'Joined', width: 150 }
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${WEBSITE_LINK}/get-particular`);
        const particular = await data.json();
        const newParticular = particular.map((item, id) => {
          const idObject = { id: id }
          return Object.assign({}, item, idObject);
        })
        console.log(newParticular);
        await setRows(newParticular);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 20]}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}