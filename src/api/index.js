import { client, q } from '../config/db';

export const getAllJobs = (rowsPerPage, after) => client
  .query(
    q.Map(
      q.Paginate(
        q.Match(q.Index("deliveries")),
        {size: rowsPerPage, after: after},
        ), 
        q.Lambda("X", q.Get(q.Var("X")))
    )
  )
  .then(response => {
    // console.log(response)
    return response;
  })
  .catch(error => console.error('Error: ', error));

export const countJobs = client
  .query(
    q.Count(q.Match(q.Index("deliveries")))
  )
  .then(response => {
    // console.log(response)
    return response
  })
  .catch(error => console.error('Error: ', error));



export const createJob = name =>
    client
    .query(
        q.Create(q.Collection('jobs'), {
        data: {
            id: 0,
            date: 1617039104,
            steam_id: 76561198880376940,
            start_city: "Start city",
            end_city: "End city",
            distance: 500,
            cargo: "Cargo name",
            weight: 5,
            damage: 0,
            start_company: "Start company",
            end_company: "End company",
            income: 10000,
            late: false,
            notes: "Notes"
        }
        })
    )
    .then(ret => ret)
    .catch(error => console.error('Error: ', error.message));

export const deleteExpenseItem = jobId =>
    client
        .query(q.Delete(q.Ref(q.Collection('jobs'), jobId)))
        .then(ret => ret)
        .catch(error => console.error('Error: ', error.message));