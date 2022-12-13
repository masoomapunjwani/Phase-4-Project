import { useEffect, useState } from 'react';
import { Table, Button } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

export const Transaction = ({data}) => {
    const [transactions, setTransactions] = useState([])

    useEffect(()=>{
        data?.map(card=>{
            fetch(`https://mopay-production.up.railway.app/card/${card.id}`)
            .then(res =>res.json)
            .then(data => setTransactions(data.payments))
        })
    })
    return (
        <Table
          height={400}
          data={transactions}
          onRowClick={rowData => {
            console.log(rowData);
          }}
        >
          <Column width={60} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
    
          <Column width={150}>
            <HeaderCell>Card Number</HeaderCell>
            <Cell dataKey="card_number" />
          </Column>
    
          <Column width={150}>
            <HeaderCell>Card Name</HeaderCell>
            <Cell dataKey="card_name" />
          </Column>
    
          <Column width={100}>
            <HeaderCell>Ammount</HeaderCell>
            <Cell dataKey="ammount" />
          </Column>
    
          <Column width={100}>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>
    
    
          <Column width={300}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="receiver_email" />
          </Column>
          
        </Table>
  );
};