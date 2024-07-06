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
                <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                        <div class="flex-grow-1">
                            <h3 class="mb-0"><a href="${tool.url}">${tool.title}</a></h3>
                            <div class="subheading mb-3">${tool.subtitle}</div>
                            <p>${tool.description}</p>
                        </div>
                        <div class="flex-shrink-0"><span class="text-primary">${tool.date}</span></div>
                    </div>
            `;

            // Append the tool element to the container
            toolsContainer.appendChild(toolElement);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
