import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu } from 'bumbag';
import DataTable from 'react-data-table-component';
import Skeleton from "react-loading-skeleton";
import { FaTemperatureHigh } from 'react-icons/fa';
import { getAllJobs, countJobs, createJob, deleteJob } from '../../api';
import { client, q } from '../../config/db';
var numeral = require("numeral");

const columns = [
  {
    name: 'User',
    selector: 'data.steam_id',
    sortable: true,
  },
  {
    name: 'Origin',
    selector: 'data.start_city',
    sortable: true,
  },
  {
    name: 'Destination',
    selector: 'data.end_city',
    sortable: true,
  },
  {
    name: 'Game',
    selector: 'data.game',
    sortable: true,
  },
  {
    name: 'Distance',
    selector: 'data.distance',
    sortable: true,
  },
  {
    name: 'Mass',
    selector: 'data.weight',
    sortable: true,
  },
  {
    name: 'Damage',
    selector: 'data.damage',
    sortable: true,
  },
  {
    name: 'Income',
    selector: 'data.income',
    sortable: true,
  },
  {
    name: 'Multiplayer',
    selector: 'data.truckersmp',
    sortable: true,
  },
  {
    name: 'Convoy',
    selector: 'data.convoy',
    sortable: true,
  },
];


function Deliveries() {
  const [jobs, setJobs] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [after, setAfter] = useState();


  useEffect(() => {
    getAllJobs(rowsPerPage, after).then((result) => {
      // console.log(result.data.length)
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
