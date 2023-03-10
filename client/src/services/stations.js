import axios from "axios";
const baseUrl = '/api/stations'

/**
 * Get all stations
 * @returns Array of station-objects
 */
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
}

const getStats = (id) => {
  const request = axios.get(`${baseUrl}/${id}/stats`);
  return request.then(res => res.data);
}

const getCounts = (id) => {
  const request = axios.get(`${baseUrl}/${id}/counts`);
  return request.then(res => res.data);
}

export default { getAll, getStats, getCounts }
