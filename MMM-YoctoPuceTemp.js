/* MMM-YoctoPuceTemp
 * A module for MagicMirror to display temperature data from a YoctoPuce sensor.
 */
Module.register("MMM-YoctoPuceTemp", {

    // Default module configuration
    defaults: {
         apiUrl: "http://<changeIP>:<port>/bySerial/<yourserialnumber>/api", //or you can just use the default URL: <changeIP>:<port>/api
        updateInterval: 60000 // Update every 60 seconds
    },

    // Define required styles
    getStyles: function() {
        return ["MMM-YoctoPuceTemp.css"];
    },

    // Define start sequence
    start: function() {
        this.currentValue = null;
        this.lowestValue = null;
        this.highestValue = null;

        // Start fetching data
        this.getData();
        this.scheduleUpdate();
    },

    // Schedule the next update
    scheduleUpdate: function() {
        const self = this;
        setInterval(function() {
            self.getData();
        }, this.config.updateInterval);
    },

    // Fetch and parse data from YoctoPuce API (HTML)
    getData: function() {
        const self = this;
        const url = this.config.apiUrl;

        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Extract temperature values by element names
                self.currentValue = doc.querySelector("div[name='currentValue'] dd").textContent;
                self.lowestValue = doc.querySelector("div[name='lowestValue'] dd").textContent;
                self.highestValue = doc.querySelector("div[name='highestValue'] dd").textContent;

                self.updateDom(); // Update the display with new data
            })
            .catch(error => {
                console.error("Error fetching temperature data:", error);
            });
    },

    // Override DOM generator to display the temperature data
    getDom: function() {
        const wrapper = document.createElement("div");

        // Show loading if data is not yet available
        if (this.currentValue === null) {
            wrapper.innerHTML = "Loading temperature data...";
            return wrapper;
        }

        // Create elements for current, lowest, and highest temperatures
        const currentTemp = document.createElement("div");
        currentTemp.innerHTML = `Current Temperature: ${this.currentValue}°F`;

        const lowestTemp = document.createElement("div");
        lowestTemp.innerHTML = `Lowest Temperature: ${this.lowestValue}°F`;

        const highestTemp = document.createElement("div");
        highestTemp.innerHTML = `Highest Temperature: ${this.highestValue}°F`;

        // Append to wrapper
        wrapper.appendChild(currentTemp);
        wrapper.appendChild(lowestTemp);
        wrapper.appendChild(highestTemp);

        return wrapper;
    }
});

       


