const axios = require('axios');

const lpC = async (prompt) => {
  try {
    const res = await axios.post('https://api.meta.ai/', {
      prompt: prompt
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10-second timeout
    });

    console.log(res.data);
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`);
  }
}

lpC('Create a paragraph on coding within 10 lines.');