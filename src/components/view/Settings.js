import React, { useEffect, useState } from 'react';
import { Flex, Set, OptionButtons, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu, Label } from 'bumbag';
import DataTable from 'react-data-table-component';
import Skeleton from "react-loading-skeleton";
import { FaTemperatureHigh } from 'react-icons/fa';
var numeral = require("numeral");

function Settings() {
    const [state, setState] = useState({});

    useEffect(() => {
        document.title ="Settings | Legacy Freight Services";
    }, [])

    const update = (name, value) => {
        let data = state;
        data[name] = value;
        setState(data);
        console.log(data);
    };

    return (
        <Container isFluid padding="major-4">
            <Heading use="h4" marginBottom="30px">Settings</Heading>

            <FieldStack orientation="vertical" paddingTop="2vmin">
                        <Checkbox label="I drove on TruckersMP / Official Multiplayer" 
                            onChange={(e) => update("multiplayer", e.target.checked)}
                            name="truckersmp" />
                        <Checkbox label="I drove with another LFS driver" 
                            onChange={(e) => update("convoy", e.target.checked)}
                            name="convoy" />
                        <Checkbox label="I confirm that all the above information is correct" 
                            onChange={(e) => update("confirm", e.target.checked)}
                            name="confirm" />
                    </FieldStack>
        </Container>
    );
};

export default Settings;
