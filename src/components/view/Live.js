import React, { Component } from 'react';
import { ActionButtons, Checkbox, Divider, Card, Container, Heading, Columns, InputField, Text, Autosuggest, Input, Button, FieldStack, SelectMenuField } from 'bumbag';
function Live() {
    var state = {
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
    return (
        <Container isFluid padding="major-4">
            <Heading use="h4" marginBottom="30px">Live tracker</Heading> 
            <Columns>
                <Columns.Column>
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <Card.Header display="block">
                            <Card.Title>Europe</Card.Title>
                        </Card.Header>
                        <Card.Content>

                        </Card.Content>
                    </Card>
                </Columns.Column>
                <Columns.Column>
                    <Card standalone variant="shadowed" marginBottom="15px">
                        <Card.Header display="block">
                            <Card.Title>North America</Card.Title>
                        </Card.Header>
                        <Card.Content>

                        </Card.Content>
                    </Card>
                </Columns.Column>
            </Columns>
        </Container>
    );
};

export default Live;
