This is for demo purposes only.<br>
The purpose is to mock devices reporting to the mqtt queue for projects like thingsboard<br>
or other demo iot device boards (output is json format)<br>

if your running from the source<br>
npm install mqtt sleep convert-csv-to-json minimist<br>
node demoPub.js -f source.csv -q mqtt:/1.1.1.1:1883 -c topic -t 5<br>


example use if you use the compile windows 10 exe<br>
demopub-win.exe -f source.csv -q mqtt:/1.1.1.1:1883 -c topic -t 5<br>

-h help<br>
-f this is the comma delimeted source csv file that contains your csv that you want to push your server<br>
-q is the MQTT server that you wish to use <br>
-c is the name of the topic you wish to publish to<br>
-t is the timeout in seconds that you want to simulate a device<br>

All output uses the column headers to build valid json i.e.<br>
devicename,temperature,timestamp<br>
i2387g263f,28,3-3-2020 16:30:08<br>
sd83kjhsd3,28,3-3-2020 16:30:09<br>

will result in the following two MQTT messages<br>
{<br>
  Devicename: 'i2387g263f',<br>
  Temperature: '28',<br>
  Timestamp: '3-3-2020 16:30:08'<br>
}<br>
{<br>
  Devicename: 'sd83kjhsd3',<br>
  Temperature: '28',<br>
  Timestamp: '3-3-2020 16:30:09'<br>
}<br>

Additional Info<br>
If you need a MQTT server, simply run this docker command and let the sync happen<br>
docker run -itd -p 1883:1883 -p 9001:9001 -v /mosquitto/data -v /mosquitto/log eclipse-mosquitto
