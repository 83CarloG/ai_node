document.getElementById('queryForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const userQuery = document.getElementById('userQuery').value.trim();
  const responseBox = document.getElementById('response-box');
  const spinner = document.getElementById('spinner');
  const URL = 'http://localhost:3001/query'; // Update this URL to match your server

  if (userQuery === "") {
      responseBox.innerHTML = `<p>Please enter a valid query.</p>`;
      responseBox.classList.add('show');
      return;
  }

  // Show spinner and hide previous response
  spinner.style.display = 'block';
  responseBox.classList.remove('show');
  responseBox.innerHTML = '';

  try {
      const response = await axios.get(URL, { params: { userQuery } });

      if (response && response.data && response.data.results) {
          let resultText = response.data.results;

          // Limit the response to 250 characters if necessary
          if (resultText.length > 250) {
              resultText = resultText.substring(0, 250) + "...";
          }

          responseBox.innerHTML = `
              <h2>Response:</h2>
              <div class="response-content">
                  <pre>${resultText}</pre>
              </div>
          `;
      } else {
          responseBox.innerHTML = `<p>No valid response from server.</p>`;
      }
  } catch (error) {
      responseBox.innerHTML = `<p>An error occurred while processing your request. Please try again later.</p>`;
      console.error('Error fetching data:', error);
  } finally {
      // Hide spinner and show response
      spinner.style.display = 'none';
      responseBox.classList.add('show');
  }
});