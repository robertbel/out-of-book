import axios from 'axios';

export default defineEventHandler(async () => {

  try {
    const response = await axios.get('https://random-word-api.herokuapp.com/word');
    const data = response.data;
    console.log(data);
    return {
      data: data
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});

