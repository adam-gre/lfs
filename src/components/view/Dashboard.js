import React, { Component, useEffect, useState } from 'react';
import { ProgressBar, Avatar, Divider, Box, Columns, Card, Container, Heading, Text } from 'bumbag';
import Skeleton from "react-loading-skeleton";
import { FaTrophy, FaTruck, FaCalendar } from 'react-icons/fa';
import { MdAnnouncement } from 'react-icons/md';
import EventCalendar from '../Calendar.js';
import { getJobsByUser} from '../../api';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
      } = useAuth0();
    const {state, setState} = useState({
        income: 0,
        incomeUnit: "£",
        distance: 0,
        distanceUnit: "miles",
        events: 0,
        activity: [],
        staffPicks: [],
        weekWinner: [{
            name: "aa",
            income: 0,
            jobs: 0
        }]
    });
    useEffect(() => {
        document.title = "Dashboard | Legacy Freight Services";

        console.log(state)
        getJobsByUser(user.sub).then((result) => {
            console.log(result)
            // return this.state = result;
        })
    })

    return (
        <Container isFluid padding="major-4">
            <Heading use="h4" marginBottom="30px">Dashboard</Heading>
            
            <Columns>
                <Columns.Column>
                    <Card standalone variant="shadowed" marginBottom="15px" className="winner">
                        <Card.Header display="block">
                            <Avatar margin="auto" initials="🏆" variant="circle" palette="#008aff" size="medium" marginBottom="2vmin" />
                            <Card.Title alignX="center" margin="auto">Congratulations, {state.incomeUnit}!</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Text color="white" fontSize="200" alignX="center" textAlign="center">{state.weekWinner.name} completed {state.weekWinner.jobs} jobs this week and earned £{state.weekWinner.income.toLocaleString(undefined, {maximumFractionDigits:2})}!</Text>
                        </Card.Content>
                    </Card>
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <Card.Header>
                            <Card.Title>Your statistics</Card.Title>
                        </Card.Header>
                        <Card.Content>
                        <Columns>
                            <Columns.Column>
                                <Box backgroundColor="white" padding="0.5rem" textAlign="center">
                                    <Text color="text100" fontSize="150">JOB INCOME</Text>
                                    <br />
                                    {state.incomeUnit + state.income.toLocaleString(undefined, {maximumFractionDigits:2}) || <Skeleton count={2} />}
                                </Box>
                            </Columns.Column>
                            <Divider orientation="vertical" />
                            <Columns.Column>
                                <Box backgroundColor="white" padding="0.5rem" textAlign="center">
                                    <Text color="text100" fontSize="150">DISTANCE DRIVEN</Text>
                                    <br />
                                    {state.distance.toLocaleString(undefined, {maximumFractionDigits:0}) + " " + state.distanceUnit || <Skeleton count={2} />}
                                </Box>
                            </Columns.Column>
                            <Divider orientation="vertical" />
                            <Columns.Column>
                                <Box backgroundColor="white" padding="0.5rem" textAlign="center">
                                    <Text color="text100" fontSize="150">EVENTS ATTENDED</Text>
                                    <br />
                                    {state.events.toLocaleString(undefined, {maximumFractionDigits:2}) || <Skeleton count={2} />}
                                </Box>
                            </Columns.Column>
                            </Columns>
                        </Card.Content>
                    </Card>
                    <Card standalone variant="shadowed">
                        <Card.Header>
                            <Card.Title>Staff picks</Card.Title>
                        </Card.Header>
                        <Card.Content>
                        <Columns>
                            <Columns.Column>
                                <Box backgroundColor="white" padding="0.5rem" textAlign="center">
                                    <Text color="text100" fontSize="150">DRIVER SPOTLIGHT</Text>
                                    <br />
                                    <Skeleton circle={true} height={100} width={100} style={{marginTop: "10px", marginBottom: "10px"}}/>
                                    <br />
                                    {<Text fontWeight="bold">{state.staffPicks[0].steamId}</Text> || <Skeleton count={1} />}
                                    <br />
                                    {state.staffPicks[0].reason || <Skeleton count={1} />}
                                    <br />
                                    <Text color="text100" fontSize="150">Added by {state.staffPicks[0].addedBy || <Skeleton count={1} />}</Text>
                                </Box>
                            </Columns.Column>
                            <Divider orientation="vertical" />
                            <Columns.Column>
                                <Box backgroundColor="white" padding="0.5rem" textAlign="center">
                                    <Text color="text100" fontSize="150" style={{marginBottom: "20px"}}>BEST PICTURE</Text>
                                    <br />
                                    {state.staffPicks[1].image || <Skeleton width={300} height={170} />}
                                    <br />
                                    <Text color="text100" fontSize="150" style={{marginTop: "20px"}}>Added by {state.staffPicks[1].addedBy || <Skeleton count={1} />}</Text>
                                </Box>
                            </Columns.Column>
                            </Columns>
                        </Card.Content>
                    </Card>
                </Columns.Column>
                <Columns.Column>
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <Card.Header>
                            <Card.Title>Activity feed</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Box backgroundColor="default" padding="0.5rem" marginBottom="5px">
                                <Columns>
                                    <Columns.Column spread={1}>
                                        {
                                            state.activity[0].type === "job" && 
                                                <FaTruck style={{height: "auto", width: "5vmin"}} />
                                        }
                                        {
                                            state.activity[0].type === "announcement" && 
                                                <MdAnnouncement style={{height: "auto", width: "5vmin"}} />
                                        }
                                        {
                                            state.activity[0].type === "event" && 
                                                <FaCalendar style={{height: "auto", width: "5vmin"}} />
                                        }
                                    </Columns.Column>
                                    <Columns.Column spread={9}>
                                        {<Text use="strong"> {state.activity[0].title}</Text> || <Skeleton count={1} />}
                                        <br />
                                        {<Text use="italic">{state.activity[0].content}</Text> || <Skeleton count={1} />}
                                    </Columns.Column>
                                </Columns>
                            </Box>
                            <Box backgroundColor="default" padding="0.5rem" marginBottom="5px">
                                <Columns>
                                    <Columns.Column spread={1}>
                                        {
                                            state.activity[1].type === "job" && 
                                                <FaTruck style={{height: "auto", width: "5vmin"}} />
                                        }
                                        {
                                            state.activity[1].type === "announcement" && 
                                                <MdAnnouncement style={{height: "auto", width: "5vmin"}} />
                                        }
                                        {
                                            state.activity[1].type === "event" && 
                                                <FaCalendar style={{height: "auto", width: "5vmin"}} />
                                        }
                                    </Columns.Column>
                                    <Columns.Column spread={9}>
                                        {<Text use="strong"> {state.activity[1].title}</Text> || <Skeleton count={1} />}
                                        <br />
                                        {<Text use="italic">{state.activity[1].content}</Text> || <Skeleton count={1} />}
                                    </Columns.Column>
                                </Columns>
                            </Box>
                            <Box backgroundColor="default" padding="0.5rem" marginBottom="5px">
                                <Columns>
                                    <Columns.Column spread={1}>
                                        {
                                            state.activity[2].type === "job" && 
                                                <FaTruck style={{height: "auto", width: "5vmin"}} />
                                        }
                                        {
                                            state.activity[2].type === "announcement" && 
                                                <MdAnnouncement style={{height: "auto", width: "5vmin"}} />
                                        }
                                        {
                                            state.activity[2].type === "event" && 
                                                <FaCalendar style={{height: "auto", width: "5vmin"}} />
                                        }
                                    </Columns.Column>
                                    <Columns.Column spread={9}>
                                        {<Text use="strong"> {state.activity[2].title}</Text> || <Skeleton count={1} />}
                                        <br />
                                        {<Text use="italic">{state.activity[2].content}</Text> || <Skeleton count={1} />}
                                    </Columns.Column>
                                </Columns>
                            </Box>
                        </Card.Content>
                    </Card>
                    <Card standalone variant="shadowed">
                        <Card.Header>
                            <Card.Title>Upcoming events</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <EventCalendar />
                        </Card.Content>
                    </Card>
                </Columns.Column>
            </Columns>
        </Container>
    );
};

export default Dashboard;
