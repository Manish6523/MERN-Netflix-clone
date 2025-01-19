import axios from 'axios'
import { ENV_VARS } from '../config/envVars.js';
import { config } from '../../Frontend/src/utils/constants.js';

export const fetchFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    };
    const response = await axios.get(url, options)

    if (response.status !== 200) {
        throw new Error(`Error fetching data from TMDB: ${response.status} - ${response.statusText}`);
    }


    return response.data;
}