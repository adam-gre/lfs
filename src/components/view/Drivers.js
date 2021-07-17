import React, { useEffect, useState } from 'react';
import { DropdownMenu, Set, Image, Tag, ActionButtons, Box, Table, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField, SelectMenu } from 'bumbag';
import DataTable from 'react-data-table-component';
import Skeleton from "react-loading-skeleton";
import { FaTemperatureHigh } from 'react-icons/fa';
import { getAllUsers } from '../../api';
var numeral = require("numeral");


function Drivers() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    document.title ="Drivers | Legacy Freight Services";
    
    getAllUsers().then((result) => {
      console.log(result)
      result.data.forEach(driver => {
        return setUsers([...users, <Columns.Column spread={6}>
          <Card standalone variant="shadowed" marginBottom="15px">
              <Card.Content>
                  <Box padding="0.5rem" marginBottom="5px"alignY="center" >
                    <Columns>
                        <Columns.Column spread={2}>
                          <Image src="https://via.placeholder.com/75" alt="Bean" width="100%" />
                        </Columns.Column>
                        <Columns.Column spread={10} spacing='major-2'>
                          <Set alignY="center" >
                            <Heading use="h4">{driver.data.user.username}</Heading>
                            {driver.data.roles.map(rank => {
                              return <Tag color={rank.id} backgroundColor='white600' variant='shadowed'>{rank.name}</Tag>;
                            })}
                          </Set>
                          <Text>Driver since 2017</Text>
                          <DropdownMenu
                            menu={
                              <React.Fragment>
                                <DropdownMenu.Item iconBefore="solid-pen">
                                  Edit user
                                </DropdownMenu.Item>
                                <DropdownMenu.Item iconBefore="solid-share">
                                  Copy profile link
                                </DropdownMenu.Item>
                                <DropdownMenu.Item iconBefore="solid-trash-alt" color="danger">
                                  Delete user
                                </DropdownMenu.Item>
                              </React.Fragment>
                            }
                          >
                            <Button iconAfter="chevron-down">Manage user</Button>
                          </DropdownMenu>
                        </Columns.Column>
                    </Columns>
                </Box>
              </Card.Content>
            </Card>
        </Columns.Column>]);
      });
    })
  }, []);

  return (
      <Container isFluid padding="major-4">
        <Heading use="h4" marginBottom="30px">Drivers</Heading>
        <Columns>
          {users}
        </Columns>
      </Container>
  );
};

export default Drivers;
