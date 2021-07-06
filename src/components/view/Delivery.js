import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu } from 'bumbag';
import firebase from "firebase";
import DataTable from 'react-data-table-component';
import Skeleton from "react-loading-skeleton";
import { FaTemperatureHigh } from 'react-icons/fa';
var numeral = require("numeral");

const columns = [
  {
    name: 'User',
    selector: 'user',
    sortable: true,
  },
  {
    name: 'Origin',
    selector: 'startCity',
    sortable: true,
  },
  {
    name: 'Destination',
    selector: 'endCity',
    sortable: true,
  },
  {
    name: 'Game',
    selector: 'game',
    sortable: true,
  },
  {
    name: 'Distance',
    selector: 'distance',
    sortable: true,
  },
  {
    name: 'Mass',
    selector: 'mass',
    sortable: true,
  },
  {
    name: 'Damage',
    selector: 'damage',
    sortable: true,
  },
  {
    name: 'Income',
    selector: 'income',
    sortable: true,
  },
  {
    name: 'Multiplayer',
    selector: 'truckersmp',
    sortable: true,
  },
  {
    name: 'Convoy',
    selector: 'convoy',
    sortable: true,
  },
];

class Deliveries extends React.Component {

  constructor(){
    super();
    this.state = {
        jobs: []
    }
  }

  componentDidMount(){
    document.title ="Delivery | Legacy Freight Services";
  }

  render() {
    return (
        <Container isFluid padding="major-4">
          <Heading use="h4" marginBottom="30px">Deliveries</Heading>

          {
            this.state.jobs.length > 0 ?
                <DataTable 
                  title="Jobs"
                  columns={columns}
                  data={this.state.jobs}
                /> 
            : <Skeleton height={"30vh"} width={"100%"} />
          }
        </Container>
    );
  }
};

export default Deliveries;
