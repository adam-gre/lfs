import firebase from "firebase";

const axios = require("axios");


const hookUrl = "https://discord.com/api/webhooks/656526533913214977/wJcNEw3ZyGEveVp1xzaNOupfgXOIaUj7TyPzitqoqsPqFUw8HFIFnFqBfh4EjdpY4xwf";
const user = firebase.auth().currentUser;

class Discord {
    SendJob = async function(type, job) {
        await axios(this, {
            method: "POST",
            hookUrl,
            headers: {
              "Content-Type": "application/json"
            },
            data: {
                "embeds": [
                  {
                    "title": "title ~~(did you know you can have markdown here too?)~~",
                    "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
                    "url": "https://discordapp.com",
                    "color": hexToDecimal("#008aff"),
                    "timestamp": "2021-01-06T21:47:03.774Z",
                    "footer": {
                      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                      "text": "footer text"
                    },
                    "thumbnail": {
                      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    },
                    "image": {
                      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    },
                    "author": {
                      "name": "author name",
                      "url": "https://discordapp.com",
                      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    },
                    "fields": [
                      {
                        "name": "🤔",
                        "value": "some of these properties have certain limits..."
                      },
                      {
                        "name": "😱",
                        "value": "try exceeding some of them!"
                      },
                      {
                        "name": "🙄",
                        "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
                      },
                      {
                        "name": "<:thonkang:219069250692841473>",
                        "value": "these last two",
                        "inline": true
                      },
                      {
                        "name": "<:thonkang:219069250692841473>",
                        "value": "are inline fields",
                        "inline": true
                      }
                    ]
                  },
                  {
                    "title": "Woah",
                    "description": "You can also have multiple embeds!\n**NOTE**: The color picker does not work with multiple embeds (yet)."
                  }
                ]
              }
        }).then(() => {
            return true;
        })
    }
}

function hexToDecimal(hex) {
    return parseInt(hex.replace("#",""), 16)
}

export default Discord;