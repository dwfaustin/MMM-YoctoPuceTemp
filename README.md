# MMM-YoctoPuceTemp


MMM-YoctoPuceTemp is a MagicMirror module designed to display temperature data from a YoctoPuce sensor https://www.yoctopuce.com/. Should be able to use in other Yotco Temp Sensors projects.  It fetches and displays the current, lowest, and highest temperature readings from the sensor using its API over URL HTTP instead of Json.  If you have a YoctoPuce or Yocto temperature device you also know the API is not in Json format but HTML.  The .js file is configure to look for the html format.  

## Features
- Displays current, lowest, and highest temperatures in Fahrenheit.
- Automatically refreshes data at a specified interval.

## Installation

1. **Clone the Repository**  
   Navigate to your MagicMirror modules folder:
   ```bash
   cd ~/MagicMirror/modules
   git clone https://github.com/dwfaustin/MMM-YoctoPuceTemp.git

## Add Module to MagicMirror/config/config.js

	{
	    module: "MMM-YoctoPuceTemp",
	    position: "top_right", // You can adjust the position
            header: "Inside Temp",
	    config: {
	        updateInterval: 60000 // Optional, default update interval is 60 seconds
	    }
	},

## Customize the CSS (Optional)
If you want to customize the appearance, modify MMM-YoctoPuceTemp.css:


	.MMM-YoctoPuceTemp div {
	    font-size: 1.2em;
	    margin-bottom: 10px;
	}

## Usage

The module will fetch data from the YoctoPuce API URL over HTML provided in the configuration file. Make sure to adjust the apiUrl setting in MMM-YoctoPuceTemp.js if necessary. By default, the apiUrl points to, for example: 

	http://<IPAddressOfYourYoctoPuceDevice>:<port>/api.  
 
Or you can use the full api link that includes the serial number e.g. 

	http://ipaddress:port/bySerial/<ReplaceWithYourSerialNumber>/api

The displayed data includes:

    Current Temperature
    Lowest Temperature
    Highest Temperature
	
	
Development Notes
Key Functions in MMM-YoctoPuceTemp.js

    getData(): Fetches data from the API as HTML and parses it to extract the temperature values.
    scheduleUpdate(): Sets the module to auto-refresh at the configured interval.
    getDom(): Displays the temperature data in the MagicMirror interface.

License

This project is licensed under the MIT License.
Troubleshooting

    Ensure the API URL is accessible and returning the expected HTML structure.
    If data does not load, check the browser console for errors to help identify connectivity or parsing issues.

