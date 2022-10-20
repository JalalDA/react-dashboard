import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from 'react-router-dom';

export default function BasicBreadcrumbs({ detail = false, whId='Retail' }) {
  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link underline='hover' color='blue' to='/'>
          Home
        </Link>
        <Link underline='hover' color='blue' to='/'>
          Warehouse
        </Link>
        {detail && <Link underline='hover' color='blue' to={`/warehouse/${whId}`}>Detail Location Warehouse - {whId}</Link>}{' '}
      </Breadcrumbs>
    </div>
  );
}
