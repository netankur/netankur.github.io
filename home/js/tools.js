// Fetch the JSON file
fetch('https://ankurdxx.github.io/home/json/tools.json')
    .then(response => response.json()) // Parse the JSON data
    .then(data => {
        // Select the container where the data will be displayed
        const toolsContainer = document.getElementById('tools-container');

        // Iterate through each item in the JSON data
        data.forEach(tool => {
            // Create an HTML element for each tool
            const toolElement = document.createElement('div');
            toolElement.classList.add('tool');

            // Add the tool's title, subtitle, description, and date
            toolElement.innerHTML = `
                <h2>${tool.title}</h2>
                <h3>${tool.subtitle}</h3>
                <p>${tool.description}</p>
                <p>Date: ${tool.date}</p>
            `;

            // Append the tool element to the container
            toolsContainer.appendChild(toolElement);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });