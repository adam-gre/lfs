import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu } from 'bumbag';
import DataTable from 'react-data-table-component';
import Skeleton from "react-loading-skeleton";
import { FaTemperatureHigh } from 'react-icons/fa';
import { getAllJobs, countJobs, createJob, deleteJob } from '../../api';
var numeral = require("numeral");

const columns = [
  {
    name: 'Date',
    selector: 'job.ts',
    sortable: true,
  },
  {
    name: 'User',
    selector: 'user.data.user.username',
    sortable: true,
  },
  {
    name: 'Start Company',
    selector: `job.data.start_company`,
    sortable: true,
  },
  {
    name: 'Start City',
    selector: `job.data.start_city`,
    sortable: true,
  },
  {
    name: 'End Company',
    selector: 'job.data.end_company',
    sortable: true,
  },
  {
    name: 'End City',
    selector: 'job.data.end_city',
    sortable: true,
  },
  {
    name: 'Distance',
    selector: 'job.data.distance',
    sortable: true,
  },
  {
    name: 'Mass',
    selector: 'job.data.mass',
    sortable: true,
  },
  {
    name: 'Damage',
    selector: 'job.data.damage',
    sortable: true,
  },
  {
    name: 'Income',
    selector: 'job.data.income',
    sortable: true,
  },
  {
    name: 'Multiplayer',
    selector: 'job.data.truckersmp',
    sortable: true,
  },
  {
    name: 'Convoy',
    selector: 'job.data.convoy',
    sortable: true,
  },
];


function Deliveries() {
  const [jobs, setJobs] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [after, setAfter] = useState();


  useEffect(() => {
    document.title ="Deliveries | Legacy Freight Services";
    
    getAllJobs(rowsPerPage, after).then((result) => {
      console.log(result)
      return setJobs(result);
    })
    countJobs.then((result) => {
      setTotalRows(result)
    })
  }, [rowsPerPage, after]);

  return (
      <Container isFluid padding="major-4">
        <Heading use="h4" marginBottom="30px">Deliveries</Heading>
        
        <Card standalone variant="shadowed">
            <Card.Content>
              {
                jobs.data ?
                    <DataTable 
                      columns={columns}
                      data={jobs.data}
                      pagination={true}
                      onChangeRowsPerPage={setRowsPerPage}
                      paginationServer={true}
                      paginationTotalRows={totalRows}
                      onChangePage={() => {
                        setAfter(jobs.after);
                      }}
                    /> 
                : <Skeleton height={"30vh"} width={"100%"} />
              }
            </Card.Content>
        </Card>
      </Container>
  );
};

export default Deliveries;
