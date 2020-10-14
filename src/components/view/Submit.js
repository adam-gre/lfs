import React, { Component } from 'react';
import { ActionButtons, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu } from 'bumbag';
import { FixedSizeList as List } from 'react-window';

function Submit() {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         error: null,
    //         isLoaded: false, 
    //         items: []
    //     }
    // }
    // componentDidMount() {
    //     fetch("https://api.truckyapp.com/v2/map/cities/all")
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //             let cities = Object.values(result.response).map((city, index) => ({key: index, label: city.realName, value: city.realName}))

    //             this.setState({
    //                 isLoaded: true,
    //                 items: cities
    //             });
    //           console.log(this.state.items)
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //           this.setState({
    //             isLoaded: true,
    //             error
    //           });
    //         }
    //       )
    //   }

        // const { error, isLoaded, items } = this.state;
        const [value, setValue] = React.useState();
        const getOptions = React.useCallback(async () => {
            return fetch(`https://api.truckyapp.com/v2/map/cities/ets2`)
              .then(res => res.json())
              .then(({ response }) => ({
                options: response.map(city => ({ key: city._id, label: city.realName, value: city.realName }))
              }))
              .catch(err => ({ options: [] }));
          }, [])
        return (
            <Container isFluid padding="major-4">
                <Heading use="h4" marginBottom="30px">Submit job</Heading> 
                    <Columns>
                        <Columns.Column>    
                            <Card standalone variant="shadowed" marginBottom="15px">
                                <FieldStack>
                                    <Heading use="h5" marginBottom="30px">Route</Heading> 
                                    <FieldStack orientation="horizontal">
                                        <SelectMenu
                                            hasSearch
                                            cacheKey="basic"
                                            onChange={setValue}
                                            loadOptions={getOptions}
                                            placeholder="Select a fruit..."
                                            value={value}
                                        />
                                        <SelectMenuField
                                            label="Destination city"
                                            // options={items}
                                            placeholder="Select city..."
                                        />    
                                        </FieldStack>                         
                                        <InputField type="number" label="Route distance" placeholder="Enter distance..." addonAfter={<Button isStatic>miles</Button>} />

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
                                            placeholder="Select cargo..."
                                        />
                                        <InputField type="number" label="Cargo mass" placeholder="Enter mass..." addonAfter={<Button isStatic>T</Button>} />
                                        <InputField type="number" label="Cargo damage" placeholder="Enter damage..." addonAfter={<Button isStatic>%</Button>} />

                                    </FieldStack> 
                                    <FieldStack orientation="horizontal">
                                        <InputField type="number" label="Income" placeholder="Enter income..."addonBefore={<Button isStatic>£</Button>} />
                                    </FieldStack>
                                </FieldStack>
                            </Card>
                        </Columns.Column>
                    </Columns>
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <FieldStack>
                            <Heading use="h5" marginBottom="30px">Additional</Heading> 
                            <FieldStack orientation="horizontal">
                                <InputField type="text" label="Notes" placeholder="Enter any additional details..." />
                            </FieldStack>
                            <FieldStack orientation="vertical" paddingTop="2vmin">
                                <Checkbox label="I drove on TruckersMP" />
                                <Checkbox label="I drove with another LFS driver" />
                                <Checkbox label="I confirm that all the above information is correct" />
                            </FieldStack>
                        </FieldStack>
                    </Card>
                    <Columns>
                        <Columns.Column>
                        <Button palette="primary" width="100%" color="white">Submit Job</Button>
                        </Columns.Column>
                    </Columns>
            </Container>
        );
};

export default Submit;
