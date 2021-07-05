import { client, q } from '../config/db';

const webhook = require("webhook-discord")
 
const Hook = new webhook.Webhook("https://canary.discord.com/api/webhooks/656526533913214977/wJcNEw3ZyGEveVp1xzaNOupfgXOIaUj7TyPzitqoqsPqFUw8HFIFnFqBfh4EjdpY4xwf")

// Get all jobs
export const getAllJobs = (rowsPerPage, after) => client
  .query(
    // q.Map(
    //   q.Paginate(
    //     q.Match(q.Index("deliveries")),
    //     {size: rowsPerPage || 10, after: after || []},
    //     ), 
    //     q.Lambda("X", q.Get(q.Var("X")))
    // )
    q.Map(
      q.Paginate(
        q.Match(q.Index("deliveries")),
        {size: 10, after: []},
        ), 
        q.Lambda("X", q.Let(
            {
              job: q.Get(q.Var('X')),
              user: q.Get(q.Match(q.Index('user_by_id'), q.Select(['data','user'], q.Var('job')))),
              ts: q.Epoch(q.Select(['ts'], q.Var('job')), "microsecond")
            },
            {
              job: q.Var('job'),
              user: q.Var('user'),
              ts: q.Format('%tm/%td/%ty %tH:%tM', q.Var('ts'), q.Var('ts'), q.Var('ts'), q.Var('ts'), q.Var('ts'))
            }
          )
        )
    )
    
    // {
    //   "ref": Ref(Collection("jobs"), "300589065983492613"),
    //   "ts": 1622922922080000,
    //   "data": {
    //     "start_city": "Blonduos",
    //     "end_city": "Cambridge",
    //     "start_company": "ACC",
    //     "end_company": "Subse",
    //     "distance": "123",
    //     "income": "123",
    //     "cargo": "Balti ",
    //     "mass": "22",
    //     "damage": "2",
    //     "notes": "2",
    //     "convoy": true,
    //     "user": "auth0|6060ae14c4d79100687138f9"
    //   }
    // }
  )
  .then(response => {
    return response;
  })
  .catch(error => console.error('Error: ', error));


  // Cities
  export const getAllCities = client
  .query(
    q.Paginate(q.Match(q.Index("cities_alphabetical")), {size: 10000})
  )
  .then(response => {
    // console.log(response)
    return response;
  })
  .catch(error => console.error('Error: ', error));

  // Companies
export const getAllCompanies = client
  .query(
    q.Map(
      q.Paginate(
        q.Match(q.Index("all_companies")),
        {size: 10000},
        ), 
        q.Lambda("X", q.Get(q.Var("X")))
    )
  )
  .then(response => {
    console.log(response)
    return response;
  })
  .catch(error => console.error('Error: ', error));
  

  // Cargo
export const getAllCargo = client
  .query(
    q.Paginate(q.Match(q.Index("cities_alphabetical")), {size: 10000})
  )
  .then(response => {
    // console.log(response)
    return response;
  })
  .catch(error => console.error('Error: ', error));



  // Job count
export const countJobs = client
  .query(
    q.Count(q.Match(q.Index("deliveries")))
  )
  .then(response => {
    // console.log(response)
    return response
  })
  .catch(error => console.error('Error: ', error));


// Create job
export const createJob = (data, username) =>
    client
      .query(
          q.Create(q.Collection('jobs'), {
            data: data
          })
      )
      .then(ret => {

        const msg = new webhook.MessageBuilder()
          .setName("Legacy Freight Services")
          .setAvatar("https://i.imgur.com/QaOLEr5.png")
          .setColor("#008aff")
          .setTitle("Delivery Notification")
          .addField("Source", `${data.start_company}, ${data.start_city}`, true)
          .addField("Destination", `${data.end_company}, ${data.end_city}`, true)
          .addField("Distance", data.distance, true)
          .addField("Cargo", data.cargo, true)
          .addField("Mass", data.mass, true)
          .addField("Income", data.income, true)
          .addField("Notes", data.notes, false)
          .addField("Multiplayer", data.multiplayer ? "Yes" : "No", true)
          .addField("Convoy", data.convoy ? "Yes" : "No", true)
          .setFooter(`${username} • Legacy Freight Services`, "https://i.imgur.com/QaOLEr5.png")
        Hook.send(msg);
        console.log(msg)
        return true;
      })
    .catch(error => {
      console.error('Error: ', error.message)
      return error;
    });


    // Delete job
export const deleteJob = jobId =>
    client
        .query(q.Delete(q.Ref(q.Collection('jobs'), jobId)))
        .then(ret => ret)
        .catch(error => console.error('Error: ', error.message));


export const getJobsByUser = (userId, rowsPerPage, after) => 
    client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('deliveries_by_user'), userId)), 
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then(ret => ret)
    .catch(error => console.error('Error: ', error.message));

    
export const getUserById = userId => 
  client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('user_by_id'), userId)), 
      q.Lambda("X", q.Get(q.Var("X")))
    )
  )
  .then(ret => ret)
  .catch(error => console.error('Error: ', error.message));

