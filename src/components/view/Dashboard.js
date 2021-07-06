import React, { Component, useEffect, useState } from 'react';
import { ProgressBar, Avatar, Divider, Box, Columns, Card, Container, Heading, Text } from 'bumbag';
import Skeleton from "react-loading-skeleton";
import { FaTrophy, FaTruck, FaCalendar } from 'react-icons/fa';
import { MdAnnouncement } from 'react-icons/md';
import EventCalendar from '../Calendar.js';
import { getJobsByUser, getUserById} from '../../api';
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

    const [userData, setUserData] = useState({
        auth: null,
        username: null,
        discord: null,
        steam: null,
        tmp: null
    });

    const [stats, setStats] = useState({
        income: 0,
        incomeUnit: "£",
        distance: 0,
        distanceUnit: "miles",
        events: 0
    });

    const [state, setState] = useState({
        activity: [
            {
                type: "job",
                title: "Panda",
                content: "Fresh Fish delivered to Lyon from Paris for £10,532"
            },
            {
                type: "event",
                title: "Drive for Life",
                content: "Fresh Fish delivered to Lyon from Paris for £10,532"
            },
            {
                type: "announcement",
                title: "AAAAAAAAAAAAA",
                content: "I AM BEING CHASED HELP"
            }
        ],
        staffPicks:  [
            {
                steamId: "76561198183828141",
                reason: "For being an exceptional [REDACTED] and stealing [REDACTED] from the NSA HQ.",
                addedBy: "76561198183828141"
            },
            {
                steamId: "76561198183828141",
                image: "",
                addedBy: "76561198183828141"
            }
        ],
        weekWinner: null
        // weekWinner: {
        //     name: "aa",
        //     income: 0,
        //     jobs: 0
        // }
    });

    useEffect(() => {
        document.title = "Dashboard | Legacy Freight Services";

        // console.log(state)
        getUserById(user.sub).then((result) => {
            let stats = {};
            stats = result.data[0].data.stats;
            console.log(stats);
            return setStats(stats);
        })
    }, [])

    return (
        <Container isFluid padding="major-4">
            <Heading use="h4" marginBottom="30px">Dashboard</Heading>
            
            <Columns>
                <Columns.Column>
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <Card.Header>
                            <Card.Title>Your statistics</Card.Title>
                        </Card.Header>
                        <Card.Content>
                        <Columns>
                            <Columns.Column>
                                <Box padding="0.5rem" textAlign="center">
                                    <Text fontSize="150">JOB INCOME</Text>
                                    <br />
                                    {'£' + stats.income.toLocaleString(undefined, {maximumFractionDigits:2}) || <Skeleton count={2} />}
                                </Box>
                            </Columns.Column>
                            <Divider orientation="vertical" />
                            <Columns.Column>
                                <Box padding="0.5rem" textAlign="center">
                                    <Text fontSize="150">DISTANCE DRIVEN</Text>
                                    <br />
                                    {stats.distance.toLocaleString(undefined, {maximumFractionDigits:0}) + " miles" || <Skeleton count={2} />}
                                </Box>
                            </Columns.Column>
                            <Divider orientation="vertical" />
                            <Columns.Column>
                                <Box padding="0.5rem" textAlign="center">
                                    <Text fontSize="150">EVENTS ATTENDED</Text>
                                    <br />
                                    {stats.events.toLocaleString(undefined, {maximumFractionDigits:2}) || <Skeleton count={2} />}
                                </Box>
                            </Columns.Column>
                            </Columns>
                        </Card.Content>
                    </Card>
                    {state.weekWinner != null ? 
                    <Card standalone variant="shadowed" marginBottom="15px" className="winner">
                        <Card.Header display="block">
                            <Avatar margin="auto" initials="🏆" variant="circle" palette="#008aff" size="medium" marginBottom="2vmin" />
                            <Card.Title alignX="center" margin="auto">Congratulations, {user.username}!</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Text fontSize="200" alignX="center" textAlign="center">{state.weekWinner.name} completed {state.weekWinner.jobs} jobs this week and earned £{state.weekWinner.income.toLocaleString(undefined, {maximumFractionDigits:2})}!</Text>
                        </Card.Content>
                    </Card>
                    : 
                    <Card standalone variant="shadowed" marginBottom="15px" className='no-winner'>
                        <Card.Header display="block">
                            <Card.Title alignX="center" margin="auto">There's no winner for this week!</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Text fontSize="200" alignX="center" textAlign="center">Log your completed deliveries and claim the crown!</Text>
                        </Card.Content>
                    </Card>}
                    <Card standalone variant="shadowed">
                        <Card.Header>
                            <Card.Title>Staff picks</Card.Title>
                        </Card.Header>
                        <Card.Content>
                        <Columns>
                            <Columns.Column>
                                <Box padding="0.5rem" textAlign="center">
                                    <Text fontSize="150">DRIVER SPOTLIGHT</Text>
                                    <br />
                                    <Skeleton circle={true} height={100} width={100} style={{marginTop: "10px", marginBottom: "10px"}}/>
                                    <br />
                                    {<Text fontWeight="bold">{state.staffPicks[0].steamId}</Text> || <Skeleton count={1} />}
                                    <br />
                                    {state.staffPicks[0].reason || <Skeleton count={1} />}
                                    <br />
                                    <Text fontSize="150">Added by {state.staffPicks[0].addedBy || <Skeleton count={1} />}</Text>
                                </Box>
                            </Columns.Column>
                            <Divider orientation="vertical" />
                            <Columns.Column>
                                <Box padding="0.5rem" textAlign="center">
                                    <Text fontSize="150" style={{marginBottom: "20px"}}>BEST PICTURE</Text>
                                    <br />
                                    {state.staffPicks[1].image || <Skeleton width={300} height={170} />}
                                    <br />
                                    <Text fontSize="150" style={{marginTop: "20px"}}>Added by {state.staffPicks[1].addedBy || <Skeleton count={1} />}</Text>
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
                            <Box padding="0.5rem" marginBottom="5px">
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
                            <Box padding="0.5rem" marginBottom="5px">
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
                            <Box padding="0.5rem" marginBottom="5px">
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
