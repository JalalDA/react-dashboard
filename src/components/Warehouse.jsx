import React, { useEffect, useState } from 'react'
import { Box, Typography} from '@mui/material';
import BasicBreadcrumbs from '../components/BasicBreadcrumbs';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
// import { GridCellParams } from '@mui/x-data-grid';
import axios from 'axios';

const renderId = (params) => <Link to={`/warehouse/${params.value}`}>{params.value}</Link>;

const columns = [
    { field: 'whID', headerName: 'ID', width: 150, renderCell: renderId }, // renderCell is optional key for custom rendering function
    { field: 'branch', headerName: 'Branch', width: 150 },
    { field: 'active', headerName: 'Active', width: 100 },
    { field: 'desc', headerName: 'Desc', width: 150 },
    { field: 'sync', headerName: 'Last Sync', width: 100 },
  ];

const dummyRows = [
    {
        Active: true,
        Description: 'TESTAB',
        WarehouseID: 'ABT001',
        LastSync: '2022-06-22T09:19:31.9254485',
        Branch: 'SIDOARJO',
        LastModifiedDateTime: '2022-06-22T09:19:31.9254421',
      },
      {
        Active: true,
        Description: 'AZT001',
        WarehouseID: 'AZT001',
        LastSync: '2022-09-02T11:03:41.1683689',
        Branch: 'SIDOARJO',
        LastModifiedDateTime: '2022-05-17T08:04:25.0746922',
      },
      {
        Active: true,
        Description: 'JKT Centre',
        WarehouseID: 'JKT-CT',
        LastSync: '2022-09-02T11:03:41.1851781',
        Branch: 'JAKARTA',
        ReplenishmentClass: 'PURCHASE',
        LastModifiedDateTime: '2022-03-04T17:23:01.0728808',
      }
]

const Warehouse = () => {
    const [data, setData] = useState([])
    
    const fetchHandler = async () => {
        try {
          const result = await axios.get(`${process.env.REACT_APP_BASE_URL}`);
            // console.log(result);
          const dataRows = result.data.map((element, index) => {
            return {
              id: index,
              whID: element.WarehouseID,
              branch: element.Branch,
              active: element.Active,
              desc: element.Description,
              sync: element.LastSync.split('T')[0],
            };
          });
          setData(dataRows);
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        fetchHandler()
      }, [])
  return (
    <Box sx={{ display: 'flex', width:'100%'}} >
    <Box display='flex' width="100%" alignItems='center' flexDirection={'column'} gap={1}>
      <BasicBreadcrumbs />
      <Typography fontWeight={500} fontSize={30}>Warehouse</Typography>
      <Box sx={{width:{xs : "400px", sm : "90%"}, height:400 }}>
        <DataGrid rows={Array.isArray(data) ? data : dummyRows} columns={columns} rowsPerPageOptions={[5, 10, 20, 50, 100]} />
      </Box>
    </Box>
  </Box>
  )
}

export default Warehouse