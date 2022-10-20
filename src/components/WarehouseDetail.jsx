import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Box, Typography} from '@mui/material';
import BasicBreadcrumbs from '../components/BasicBreadcrumbs';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
    { field: 'whID', headerName: 'ID', width: 150 },
    { field: 'branch', headerName: 'Branch', width: 150 },
    { field: 'active', headerName: 'Active', width: 100 },
    { field: 'desc', headerName: 'Desc', width: 150 },
    { field: 'sync', headerName: 'Last Sync', width: 100 },
    { field: 'modified', headerName: 'Last Modified', width: 500 },
];


const WarehouseDetail = () => {
    const [data, setData] = useState(false);
    let { id } = useParams();    
    const fetchHandler = async () => {
        try {
          const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`);
        //   console.log(result);
          const dataRows = {
            id: 0,
            whID: result.data.WarehouseID,
            branch: result.data.Branch,
            active: result.data.Active,
            desc: result.data.Description,
            sync: result.data.LastSync.split('T')[0],
            modified: new Date( result.data.LastModifiedDateTime)
          };
          setData([dataRows]);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
      fetchHandler();
      document.title = `Warehouse - ${id}`
    }, [id]);

  return (
    <Box sx={{ display: 'flex', width:'100%'}} >
        <Box display='flex' width="100%" alignItems='center' flexDirection={'column'} gap={1}>
            <BasicBreadcrumbs />
            <Typography fontWeight={500} fontSize={30}>
                Detail Location Warehouse - {id}
            </Typography>
            <Box sx={{width:{xs : "400px", sm : "90%"}, height:400 }}>
                <DataGrid rows={Array.isArray(data) && data } columns={columns} rowsPerPageOptions={[5, 10, 25, 100]} />
            </Box>
        </Box>
    </Box>
  )
}

export default WarehouseDetail
  