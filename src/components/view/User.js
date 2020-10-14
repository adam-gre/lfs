import React, { Component } from 'react';
import { Heading, Flex, Divider, Tabs, Avatar, Card, Container, Columns, Text } from 'bumbag';
import {
    useParams
} from "react-router-dom";
import Skeleton from 'react-loading-skeleton';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    };

    componentDidMount() {
    // fetch("https://api.example.com/items")
    //     .then(res => res.json())
    //     .then(
    //     (result) => {
    //         this.setState({
    //         isLoaded: true,
    //         items: result.items
    //         });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //         this.setState({
    //         isLoaded: true,
    //         error
    //         });
    //     }
    //     )
        this.setState({
            isLoaded: true,
            data: {
                user_id: useParams,
                username: "Panda",
                driver_rank: "Veteran",
                staff_rank: "CEO",
                division: "Hazchem",
                steam_id: "76561198183828141",
                discord_id: "125337011933413376",
                truckersmp_id: "544887",
                avatar_url: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/0b/0b07b00cee8b51d33be52932fafc94eb86c3ff52_full.jpg",
                badges: [{
                    name: "1 Year Award",
                    achieved: "2020-10-14"
                }],
                posts: [{
                    posted: "2020-10-14",

                }]
            }
        });
    }
    
    render() {
        const { error, isLoaded, data } = this.state;
        return (
            <Container isFluid padding="major-4">
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <Card.Content>
                            <Columns>
                                <Columns.Column spread={3} alignX="center">
                                    { isLoaded
                                        ? <Avatar variant="circle" src={data.avatar_url} alt="Avatar" size="30vmin" border="default" />
                                        : <Skeleton width={250} height={250}/> 
                                    }
                                    <Card variant="shadowed" marginBottom="10px" marginTop="20px">
                                        <Heading use="h4" marginBottom="10px">Job Stats</Heading>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mauris libero, blandit a ante et, dignissim tristique ante. Nullam et lectus ultricies, porta nisi ornare, sodales justo. Fusce elementum egestas sodales. Ut sit amet malesuada metus, vitae maximus magna. Nunc finibus mi ut ante tempor iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras consectetur ligula sit amet felis pharetra accumsan. Nunc vel volutpat enim, ut euismod sapien.
                                    </Card>
                                </Columns.Column>
                                <Columns.Column spread={9} paddingTop="2vmin">
                                    { isLoaded
                                        ? <Text fontSize="600" fontWeight="500" marginBottom="30px">{data.username} <Text fontWeight="300">{data.staff_rank}</Text></Text> 
                                        : <Skeleton /> 
                                    }
                                    <br />
                                    { isLoaded
                                        ? <Flex><Text fontSize="500" fontWeight="400" marginBottom="30px">{data.driver_rank} Driver</Text></Flex>
                                        : <Skeleton /> 
                                    }
                                    
                                    { isLoaded
                                        ?
                                        <Tabs selectedId="posts">
                                            <Tabs.List>
                                                <Tabs.Tab tabId="posts">Posts</Tabs.Tab>
                                                <Tabs.Tab tabId="jobs">Jobs</Tabs.Tab>
                                                <Tabs.Tab tabId="achievements">Achievements</Tabs.Tab>
                                            </Tabs.List>
                                            <Tabs.Panel tabId="posts" padding="major-2">
                                                <Card variant="shadowed" marginBottom="10px">
                                                    <Flex>                                                    
                                                        <Avatar src={data.avatar_url} alt="Avatar" alignY="center" size="5vmin" marginBottom="5px"/>
                                                        <Text fontSize="400" fontWeight="500" alignY="center" marginLeft="1vmin">{data.username} {data.staff_rank}</Text>
                                                    </Flex>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mauris libero, blandit a ante et, dignissim tristique ante. Nullam et lectus ultricies, porta nisi ornare, sodales justo. Fusce elementum egestas sodales. Ut sit amet malesuada metus, vitae maximus magna. Nunc finibus mi ut ante tempor iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras consectetur ligula sit amet felis pharetra accumsan. Nunc vel volutpat enim, ut euismod sapien.
                                                </Card>
                                                <Card variant="shadowed">
                                                    <Flex>                                                    
                                                        <Avatar src={data.avatar_url} alt="Avatar" alignY="center" size="5vmin" marginBottom="5px"/>
                                                        <Text fontSize="400" fontWeight="500" alignY="center" marginLeft="1vmin">{data.username} {data.staff_rank}</Text>
                                                    </Flex>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mauris libero, blandit a ante et, dignissim tristique ante. Nullam et lectus ultricies, porta nisi ornare, sodales justo. Fusce elementum egestas sodales. Ut sit amet malesuada metus, vitae maximus magna. Nunc finibus mi ut ante tempor iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras consectetur ligula sit amet felis pharetra accumsan. Nunc vel volutpat enim, ut euismod sapien.
                                                </Card>
                                            </Tabs.Panel>
                                            <Tabs.Panel tabId="jobs" padding="major-2">
                                                Cats are alright
                                            </Tabs.Panel>
                                            <Tabs.Panel tabId="achievements" padding="major-2">
                                                Parrots are cool
                                            </Tabs.Panel>
                                        </Tabs>
                                        :
                                        <Skeleton width={"100%"} height={250}/>
                                    }
                                </Columns.Column>
                            </Columns>
                        </Card.Content>
                    </Card>
            </Container>
        );
    };
};

export default User;
