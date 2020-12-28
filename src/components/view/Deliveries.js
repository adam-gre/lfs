import React, { Component } from 'react';
import { Table, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu } from 'bumbag';
import firebase from "firebase";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import DataTable from 'react-data-table-component';

var jobData;
var columns;

class Deliveries extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {};

      this.updateJobList = this.updateJobList.bind(this);
    }

    componentDidMount() {
        var jobRef = firebase.database().ref('jobs/');
        jobRef.on('value', (snapshot) => {
            var data = snapshot.val();
            this.setState(data)
            // console.log(Object.entries(this.state)[0][1])
        });

        columns = [
            {
              name: 'User',
              selector: 'user',
              sortable: true
            },
            {
              name: 'Source',
              selector: 'source',
              sortable: true
            },
            {
              name: 'Destination',
              selector: 'destination',
              sortable: true
            },
            {
              name: 'Cargo',
              selector: 'cargo',
              sortable: true
            },
            {
              name: 'Mass',
              selector: 'mass',
              sortable: true
            },
            {
              name: 'Distance',
              selector: 'distance',
              sortable: true
            },
            {
              name: 'Damage',
              selector: 'damage',
              sortable: true
            },
            {
              name: 'Income',
              selector: 'income',
              sortable: true
            }
          ];
    }

    updateJobList(data) {
        this.setState({data})
        // console.log(this.state.data)
    }

    render () {
        return (
            <Container isFluid padding="major-4">
                <Heading use="h4" marginBottom="30px">Deliveries</Heading>
                <Table isStriped>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell textAlign="right">Quantity</Table.HeadCell>
                            <Table.HeadCell textAlign="right">Price</Table.HeadCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                    {   
                        Object.entries(this.state).forEach(job => {
                            var jobId = job[0];
                            var jobData = job[1];
                            console.log(jobData)
                            return (
                                <Table.Row>
                                    <Table.Cell>{jobData.user}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    </Table.Body>
                </Table>
            </Container>
        );
    };
};

export default Deliveries;
