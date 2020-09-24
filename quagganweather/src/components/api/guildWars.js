import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.guildwars2.com/v2'
});