import faunadb from 'faunadb';
const client = new faunadb.Client({
  secret: "fnAEF0Lh_wACAX3zy5osqhfBhe7mwelrOoIKoiUf"
});
const q = faunadb.query;
export { client, q };