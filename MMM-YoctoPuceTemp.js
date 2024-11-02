/* MMM-YoctoPuceTemp
 * A module for MagicMirror to display temperature data from a YoctoPuce sensor.
 */
Module.register("MMM-YoctoPuceTemp", {

    // Default module configuration
    defaults: {
        apiUrl: "http://192.168.132.201:4444/bySerial/TMPSENS1-1178BE/api",
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

    if (this.currentValue === null) {
        wrapper.innerHTML = "Loading temperature data...";
        return wrapper;
    }

    // Create elements with specific classes for CSS targeting
    const currentTemp = document.createElement("div");
    currentTemp.className = "currentTemp";
    currentTemp.innerHTML = `Current Temperature: ${this.currentValue}°F`;

    const lowestTemp = document.createElement("div");
    lowestTemp.className = "lowestTemp";
    lowestTemp.innerHTML = `Lowest Temperature: ${this.lowestValue}°F`;

    const highestTemp = document.createElement("div");
    highestTemp.className = "highestTemp";
    highestTemp.innerHTML = `Highest Temperature: ${this.highestValue}°F`;

    wrapper.appendChild(currentTemp);
    wrapper.appendChild(lowestTemp);
    wrapper.appendChild(highestTemp);

    return wrapper;
}

});
