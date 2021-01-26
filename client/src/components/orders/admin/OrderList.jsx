import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import {Link} from '@material-ui/core'

const rows = [
    {
        id: 1, //Order id from db.
        user_id: "carlos91",
        status: "confirmado",
        createdAt: "2021-01-25 08:57:15.119-03",
        total: "$1350,75"
    },
    {
        id: 3,
        user_id: "diego87",
        status: "cancelado",
        createdAt: "2021-01-26 12:27:15.118-03",
        total: "$380,00"
    },
    {
        id: 5,
        user_id: "luladasilva",
        status: "cancelado",
        createdAt: "2021-01-26 21:27:15.118-03",
        total: "$380,00"
    }
]

const columns = [
    { field: 'id', headerName: 'Pedido', flex: 0.5, renderCell: (params) => <Link href={`orders/:${params.row.id}`}>#{params.row.id} {params.row.user_id}</Link>  },
    { field: 'status', headerName: 'Estado', flex: 0.75 },
    {
      field: 'createdAt',
      headerName: 'Fecha',
      type: 'dateTime',
      flex: 1,
    },
    { field: 'total', headerName: 'Total', flex: 0.75}
  ];

const OrderList = () => {
    return (
        <div style={{ height: 480, width: '90%', margin: 'auto' }}>
          <DataGrid
            checkboxSelection
            onSelectionChange={(newSelection) => {
                console.log(newSelection.rowIds); //ToDo something with this. 
              }}
            columns={columns}
            rows={rows}
          />
        </div>
      );
}

export default OrderList; 