import React, { Component, Async } from 'react';
import { Flex, Set, OptionButtons, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu } from 'bumbag';
import firebase from "firebase";
import { toast } from 'react-toastify';
var Parse = require('parse/node');
// import Discord from '../../providers/DiscordWebhook';

class Submit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            game: '',
            startCity: '',
            endCity: '',
            distance: 0,
            cargo: '',
            mass: 0,
            damage: 0,
            income: 0,
            notes: '',
            truckersmp: false,
            convoy: false,
            confirm: false
        };
  
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        const {name , value, checked, type} = e.target   
        this.setState(prevState => ({
            ...prevState,
            [name] : type === "checkbox" ? checked : value
        }))

        // console.log(this.state)
    }

    handleSubmit = (e) => {
        const Job = Parse.Object.extend("Deliveries");
        const job = new Job();

        job.set("user", "User");
        job.set("game", this.state.game);
        job.set("startCity", this.state.startCity);
        job.set("endCity", this.state.endCity);
        job.set("distance", this.state.distance);
        job.set("cargo", this.state.cargo);
        job.set("mass", this.state.mass);
        job.set("damage", this.state.damage);
        job.set("income", this.state.income);
        job.set("notes", this.state.notes);
        job.set("truckersmp", this.state.truckersmp);
        job.set("convoy", this.state.convoy);
        job.set("confirm", this.state.confirm);

        job.save()
            .then((job) => {
                // Success
                toast.success(`Job submitted!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }, (error) => {
                // Save fails
                toast.error(`An error occurred!<br>${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    render () {
        // const [source, setSource] = React.useState();
        // const [destination, setDestination] = React.useState();
        // const [game, setGame] = React.useState('ets2');
        // const getCities = React.useCallback(async () => {
        //     if (game === "ets2") {
        //         return fetch(`https://api.truckyapp.com/v2/map/cities/ets2`)
        //             .then(res => res.json())
        //             .then(({ response }) => ({
        //                 options: response.map(city => ({ key: city._id, label: city.realName, value: city.realName }))
        //             }))
        //             .catch(err => ({options: "error"}));
        //     } else if (game === "ats") {
        //         return fetch(`https://api.truckyapp.com/v2/map/cities/ats`)
        //             .then(res => res.json())
        //             .then(({ response }) => ({
        //                 options: response.map(city => ({ key: city._id, label: city.realName, value: city.realName }))
        //             }))
        //             .catch(err => ({options: "error"}));
        //     } else {
        //         return console.log("error");
        //     }
        //   }, [game])

        return (
            <Container isFluid padding="major-4">
                <Flex marginBottom="30px">
                    <Heading use="h4" alignX="left" alignY="center">Submit job</Heading> 
                    <Set marginLeft="auto">
                        <OptionButtons
                            alignX="right"
                            onChange={this.handleChange}
                            // value={game}
                            type="radio"
                            name="game"
                            options={[
                                { label: 'ETS2', value: 'ets2' },
                                { label: 'ATS', value: 'ats' }
                            ]}
                        />
                    </Set>
                </Flex>
                <Columns>
                    <Columns.Column>    
                        <Card standalone variant="shadowed" marginBottom="15px">
                            <FieldStack>
                                <Heading use="h5" marginBottom="30px">Route</Heading> 
                                <FieldStack orientation="horizontal">
                                    <SelectMenuField
                                        defer
                                        name="startCity"
                                        cacheKey="basic"
                                        label="Source city"
                                        onChange={this.handleChange}
                                        // loadOptions={getCities}
                                        placeholder="Select a fruit..."
                                        // value={source}
                                    />    
                                    {/* <Async loadOptions={getCities}/> */}
                                    <SelectMenuField
                                        defer
                                        name="endCity"
                                        label="Destination city"
                                        onChange={this.handleChange}
                                        // value={destination}
                                        // loadOptions={getCities}
                                        placeholder="Select city..."
                                    />    
                                    </FieldStack>                         
                                    <InputField type="number" label="Route distance" placeholder="Enter distance..." addonAfter={<Button isStatic>miles</Button>}
                                        onChange={this.handleChange}
                                        name="distance" />

                            </FieldStack>
                        </Card>
                    </Columns.Column>
                    <Columns.Column>  
                        <Card standalone variant="shadowed" marginBottom="15px">
                            <FieldStack>
                                <Heading use="h5" marginBottom="30px">Cargo</Heading> 
                                <FieldStack orientation="horizontal">
                                    <SelectMenuField
                                        label="Cargo"
                                        options={[
                                            { key: 1, label: 'Apples', value: 'apples' },
                                            { key: 2, label: 'Bananas', value: 'bananas' },
                                            { key: 3, label: 'Oranges', value: 'oranges' },
                                            { key: 4, label: 'Mangos', value: 'mangos' }
                                        ]}
                                        onChange={this.handleChange}
                                        name="cargo"
                                        placeholder="Select cargo..."
                                    />
                                    <InputField type="number" label="Cargo mass" placeholder="Enter mass..." addonAfter={<Button isStatic>T</Button>} 
                                        onChange={this.handleChange}
                                        name="mass" />
                                    <InputField type="number" label="Cargo damage" placeholder="Enter damage..." addonAfter={<Button isStatic>%</Button>} 
                                        onChange={this.handleChange}
                                        name="damage"
                                        />

                                </FieldStack> 
                                <FieldStack orientation="horizontal">
                                    <InputField type="number" label="Income" placeholder="Enter income..."addonBefore={<Button isStatic>£</Button>} 
                                        onChange={this.handleChange}
                                        name="income"
                                        />
                                </FieldStack>
                            </FieldStack>
                        </Card>
                    </Columns.Column>
                </Columns>
                <Card standalone variant="shadowed" marginBottom="15px">
                    <FieldStack>
                        <Heading use="h5" marginBottom="30px">Additional</Heading> 
                        <FieldStack orientation="horizontal">
                            <InputField type="text" label="Notes" placeholder="Enter any additional details..." 
                                        onChange={this.handleChange}
                                        name="notes"
                                        />
                        </FieldStack>
                        <FieldStack orientation="vertical" paddingTop="2vmin">
                            <Checkbox label="I drove on TruckersMP" 
                                        onChange={this.handleChange}
                                        name="truckersmp" />
                            <Checkbox label="I drove with another LFS driver" 
                                        onChange={this.handleChange}
                                        name="convoy" />
                            <Checkbox label="I confirm that all the above information is correct" 
                                        onChange={this.handleChange}
                                        name="confirm" />
                        </FieldStack>
                    </FieldStack>
                </Card>
                <Columns>
                    <Columns.Column>
                        <Button palette="primary" width="100%" color="white" type="submit"
                            onClick={this.handleSubmit}
                        >Submit Job</Button>
                    </Columns.Column>
                </Columns>
            </Container>
        );
    };
}

export default Submit;
