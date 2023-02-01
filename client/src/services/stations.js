import axios from "axios";
const baseUrl = 'http://localhost:3001/api/stations'

/**
 * Get all stations
 * @returns Array of station-objects
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const getStats = (id) => {
  const request = axios.get(`${baseUrl}/${id}/stats`)
  return request.then(res => res.data)
}


export default { getAll, getStats }
