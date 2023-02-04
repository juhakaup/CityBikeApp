import axios from "axios";
const baseUrl = 'http://localhost:3001/api/journeys'

const getJourneys = (page, pageSize, field, order) => {
  const request = axios.get(`${baseUrl}?page=${page}&size=${pageSize}&field=${field}&order=${order}`)
  return request.then(res => res.data);
}

export default { getJourneys }