import React, { useEffect, useState } from 'react';
import { Flex, Set, OptionButtons, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu, Label } from 'bumbag';
import { toast } from 'react-toastify';
import { getAllCities, getAllJobs, createJob, deleteJob, getAllCargo, getAllCompanies } from '../../api';
import ReactLargeDatalist from 'react-large-datalist';
import { useAuth0 } from '@auth0/auth0-react';
import Select from 'react-select'
// import Discord from '../../providers/DiscordWebhook';


function Submit() {
    const [cities, setCities] = useState([]);
    const [cargo, setCargo] = useState([]);
    const [sourceCityData, setSourceCityData] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [after, setAfter] = useState();
    const [companies, setCompanies] = useState([]);


    const [state, setState] = useState({});
    const hasConfirmed = state.confirm || false;
  
    const {
      isLoading,
      isAuthenticated,
      error,
      user,
      loginWithRedirect,
      logout,
    } = useAuth0();
  
  

    const update = (name, value) => {
        let data = state;
        data[name] = value;
        setState(data);
        console.log(data);
    };

    const handleSubmit = () => {
        let data = state;
        data.user = user.sub;
        setState(data);
        createJob(state, user.name).then((res) => {
            if (res === true) {
                toast.success('Job submitted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(`An error occurred!\n${res.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }

    useEffect(() => {
        document.title ="Submit | Legacy Freight Services";
        getAllCities.then((result) => {
            var data = result.data.map(city => ({ value: city[0], label: city[0]}))
            console.log(data)
            return setCities(data); // sorted alphabetically
        })
        getAllCargo.then((result) => {
            var data = result.data.map(cargo => ({ value: cargo[0], label: cargo[0]}))
            // console.log(data)
            return setCargo(data); // sorted alphabetically
        })
        getAllCompanies.then((result) => {
            var data = result.data.map(company => ({ value: company.data.name, label: company.data.name}))
            console.log(data)
            return setCompanies(data);
        })
      }, []);
  
    
    return (
        <Container isFluid padding="major-4">
            <Flex marginBottom="30px">
                <Heading use="h4" alignX="left" alignY="center">Submit job</Heading> 
            </Flex>
            <Columns>
                <Columns.Column>    
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <FieldStack>
                            <Heading use="h5" marginBottom="30px">Route</Heading> 
                            <FieldStack orientation="horizontal">
                                <Columns.Column style={{padding: 0}}>  
                                    <Label>Start city</Label>
                                    <Select 
                                        options={cities}
                                        onChange={(value) => update("start_city", value.value)} />
                                    {/* <ReactLargeDatalist
                                        id="start_city"
                                        options={cities}
                                        disabled={false}
                                        onChange={(value) => update("start_city", value)}
                                        // onCreate={(newValue)=>{console.log("Created value", newValue)}}
                                        createButtonStyle={{display: "none", opacity: 0}}
                                        label="Start city"
                                        className="bb-Input"
                                    /> */}
                                </Columns.Column>  
                                <Columns.Column style={{padding: 0}}>  
                                    <Label>Destination city</Label>
                                    <Select options={cities}
                                        onChange={(value) => update("end_city", value.value)} />
                                </Columns.Column>
                            </FieldStack>              
                            <FieldStack orientation="horizontal">
                                <Columns.Column style={{padding: 0}}>  
                                    <Label>Start company</Label>
                                    <Select options={companies}
                                        onChange={(value) => update("start_company", value.value)} />
                                </Columns.Column>  
                                <Columns.Column style={{padding: 0}}>  
                                    <Label>Destination company</Label>
                                    <Select options={companies}
                                        onChange={(value) => update("end_company", value.value)} />
                                </Columns.Column>
                            </FieldStack>                         
                        <InputField
                            name="distance" 
                            type="number"
                            label="Route distance"
                            placeholder="Enter distance..."
                            addonAfter={<Button isStatic>miles</Button>}
                            onChange={(e) => update("distance", e.target.value)}
                            />

                        </FieldStack>
                    </Card>
                </Columns.Column>
                <Columns.Column>  
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <FieldStack>
                            <Heading use="h5" marginBottom="30px">Cargo</Heading> 
                            <FieldStack orientation="horizontal">
                                <Columns.Column style={{paddingLeft: 0}}>  
                                    <Label>Cargo</Label>
                                    <Select options={cargo}
                                        onChange={(value) => update("cargo", value.value)} />
                                </Columns.Column>
                                <InputField
                                    type="number"
                                    label="Cargo mass"
                                    placeholder="Enter mass..."
                                    addonAfter={<Button isStatic>T</Button>} 
                                    onChange={(e) => update("mass", e.target.value)}
                                    />
                                <InputField type="number" label="Cargo damage" placeholder="Enter damage..." addonAfter={<Button isStatic>%</Button>} 
                                    onChange={(e) => update("damage", e.target.value)}
                                    name="damage"
                                    />

                            </FieldStack> 
                            <FieldStack orientation="horizontal">
                                <InputField type="number" label="Income" placeholder="Enter income..."addonBefore={<Button isStatic>£</Button>}
                                    onChange={(e) => update("income", e.target.value)}
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
                            onChange={(e) => update("notes", e.target.value)}
                            name="notes"
                        />
                    </FieldStack>
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
                </FieldStack>
            </Card>
            <Columns>
                <Columns.Column>
                    <Button palette="primary" width="100%" color="white" type="submit"
                        onClick={handleSubmit} 
                    >Submit Job</Button>
                </Columns.Column>
            </Columns>
        </Container>
    );
};

export default Submit;
