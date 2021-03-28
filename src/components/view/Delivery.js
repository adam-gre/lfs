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
    const ref = firebase.database().ref("jobs/");

    ref.once("value")
    .then(function(snapshot) {
        var jobs = [];

        //LOOPING EACH CHILD AND PUSHING TO ARRAY
        let i = 0;
        snapshot.forEach(item => {

            var temp = item.val();
            // firebase.auth().getUser(temp.user).then((userRecord) => {
            //   console.log(userRecord.toJSON())
            // })
            // temp.income = numeral(temp.income)
            var getUser = firebase.functions().httpsCallable('getUser');
            // console.log(temp.user)
            getUser({ uid: temp.user })
              .then((result) => {
                // Read result of the Cloud Function.
                temp.user = result.email
                console.log(result)
              })
              .catch((error) => {
                // Getting the Error details.
                var code = error.code;
                var message = error.message;
                var details = error.details;
                console.log(`Error: ${code} ${message} ${details}`)
                // ...
              });
            // temp.user = getUser({uid: temp.user}).email
            temp.truckersmp ? temp.truckersmp = "✅" : temp.truckersmp = "❌"
            temp.convoy ? temp.convoy = "✅" : temp.convoy = "❌"
            temp.id = i;
            jobs.push(temp);
            i++;
            return false;
        });

        this.setState( {    //PASSING VARIABLE TO STATE
            jobs
        })
    }.bind(this)).then(() =>{
      // console.log(this.state.jobs)
    }); //BINDING TO SET STATE
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
