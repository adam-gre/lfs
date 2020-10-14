import React, { Component } from 'react';
import { ProgressBar, Avatar, Divider, Box, Columns, Card, Container, Heading, Text } from 'bumbag';
import Skeleton from "react-loading-skeleton";
import { FaTrophy, FaTruck, FaCalendar } from 'react-icons/fa';
import { MdAnnouncement } from 'react-icons/md';
import EventCalendar from '../Calendar.js';

class Dashboard extends Component {
    state = {
        income: 2000,
        incomeUnit: "£",
        distance: 5500,
        distanceUnit: "miles",
        events: 1200,
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
        staffPicks: [
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
        weekWinner: [
            {
                steamId: "76561198183828141",
                name: "Panda",
                jobs: 15,
                income: 425100
            }
        ]
    };

    render() {
        var { income, incomeUnit, distance, distanceUnit, events, activity, staffPicks, weekWinner } = this.state;
        return (
            <Container isFluid padding="major-4">
                <Heading use="h4" marginBottom="30px">Dashboard</Heading>
                    <Columns>
                        <Columns.Column>
                            <Card standalone variant="shadowed" marginBottom="15px" className="winner">
                                <div className="winner-flags">
                                    <Card.Header display="block">
                                        <Avatar margin="auto" initials="🏆" variant="circle" palette="#008aff" size="medium" marginBottom="2vmin" />
                                        <Card.Title alignX="center" margin="auto">Congratulations, {weekWinner[0].name}!</Card.Title>
                                    </Card.Header>
                                    <Card.Content>
                                        <Text color="white" fontSize="200" alignX="center" textAlign="center">{weekWinner[0].name} completed {weekWinner[0].jobs} jobs this week and earned £{weekWinner[0].income.toLocaleString(undefined, {maximumFractionDigits:2})}!</Text>
                                    </Card.Content>
                                </div>
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
                                            {incomeUnit + income.toLocaleString(undefined, {maximumFractionDigits:2}) || <Skeleton count={2} />}
                                        </Box>
                                    </Columns.Column>
                                    <Divider orientation="vertical" />
                                    <Columns.Column>
                                        <Box backgroundColor="white" padding="0.5rem" textAlign="center">
                                            <Text color="text100" fontSize="150">DISTANCE DRIVEN</Text>
                                            <br />
                                            {distance.toLocaleString(undefined, {maximumFractionDigits:0}) + " " + distanceUnit || <Skeleton count={2} />}
                                        </Box>
                                    </Columns.Column>
                                    <Divider orientation="vertical" />
                                    <Columns.Column>
                                        <Box backgroundColor="white" padding="0.5rem" textAlign="center">
                                            <Text color="text100" fontSize="150">EVENTS ATTENDED</Text>
                                            <br />
                                            {events.toLocaleString(undefined, {maximumFractionDigits:2}) || <Skeleton count={2} />}
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
                                            {<Text fontWeight="bold">{staffPicks[0].steamId}</Text> || <Skeleton count={1} />}
                                            <br />
                                            {staffPicks[0].reason || <Skeleton count={1} />}
                                            <br />
                                            <Text color="text100" fontSize="150">Added by {staffPicks[0].addedBy || <Skeleton count={1} />}</Text>
                                        </Box>
                                    </Columns.Column>
                                    <Divider orientation="vertical" />
                                    <Columns.Column>
                                        <Box backgroundColor="white" padding="0.5rem" textAlign="center">
                                            <Text color="text100" fontSize="150" style={{marginBottom: "20px"}}>BEST PICTURE</Text>
                                            <br />
                                            {staffPicks[1].image || <Skeleton width={300} height={170} />}
                                            <br />
                                            <Text color="text100" fontSize="150" style={{marginTop: "20px"}}>Added by {staffPicks[1].addedBy || <Skeleton count={1} />}</Text>
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
                                                    activity[0].type === "job" && 
                                                        <FaTruck style={{height: "auto", width: "5vmin"}} />
                                                }
                                                {
                                                    activity[0].type === "announcement" && 
                                                        <MdAnnouncement style={{height: "auto", width: "5vmin"}} />
                                                }
                                                {
                                                    activity[0].type === "event" && 
                                                        <FaCalendar style={{height: "auto", width: "5vmin"}} />
                                                }
                                            </Columns.Column>
                                            <Columns.Column spread={9}>
                                                {<Text use="strong"> {activity[0].title}</Text> || <Skeleton count={1} />}
                                                <br />
                                                {<Text use="italic">{activity[0].content}</Text> || <Skeleton count={1} />}
                                            </Columns.Column>
                                        </Columns>
                                    </Box>
                                    <Box backgroundColor="default" padding="0.5rem" marginBottom="5px">
                                        <Columns>
                                            <Columns.Column spread={1}>
                                                {
                                                    activity[1].type === "job" && 
                                                        <FaTruck style={{height: "auto", width: "5vmin"}} />
                                                }
                                                {
                                                    activity[1].type === "announcement" && 
                                                        <MdAnnouncement style={{height: "auto", width: "5vmin"}} />
                                                }
                                                {
                                                    activity[1].type === "event" && 
                                                        <FaCalendar style={{height: "auto", width: "5vmin"}} />
                                                }
                                            </Columns.Column>
                                            <Columns.Column spread={9}>
                                                {<Text use="strong"> {activity[1].title}</Text> || <Skeleton count={1} />}
                                                <br />
                                                {<Text use="italic">{activity[1].content}</Text> || <Skeleton count={1} />}
                                            </Columns.Column>
                                        </Columns>
                                    </Box>
                                    <Box backgroundColor="default" padding="0.5rem" marginBottom="5px">
                                        <Columns>
                                            <Columns.Column spread={1}>
                                                {
                                                    activity[2].type === "job" && 
                                                        <FaTruck style={{height: "auto", width: "5vmin"}} />
                                                }
                                                {
                                                    activity[2].type === "announcement" && 
                                                        <MdAnnouncement style={{height: "auto", width: "5vmin"}} />
                                                }
                                                {
                                                    activity[2].type === "event" && 
                                                        <FaCalendar style={{height: "auto", width: "5vmin"}} />
                                                }
                                            </Columns.Column>
                                            <Columns.Column spread={9}>
                                                {<Text use="strong"> {activity[2].title}</Text> || <Skeleton count={1} />}
                                                <br />
                                                {<Text use="italic">{activity[2].content}</Text> || <Skeleton count={1} />}
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
    }
};

export default Dashboard;
