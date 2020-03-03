This is for demo purposes only.
The purpose is to mock devices reporting to the mqtt queue for projects like thingsboard
or other demo iot device boards (output is json format)

if your running from the source
npm install mqtt sleep convert-csv-to-json minimist
node demoPub.js -f source.csv -q mqtt:/1.1.1.1:1883 -c topic -t 5


example use if you use the compile windows 10 exe
demopub-win.exe -f source.csv -q mqtt:/1.1.1.1:1883 -c topic -t 5

-h help
-f this is the comma delimeted source csv file that contains your csv that you want to push your server
-q is the MQTT server that you wish to use 
-c is the name of the topic you wish to publish to
-t is the timeout in seconds that you want to simulate a device

All output uses the column headers to build valid json i.e.
devicename,temperature,timestamp
i2387g263f,28,3-3-2020 16:30:08
sd83kjhsd3,28,3-3-2020 16:30:09

will result in the following two MQTT messages
{
  Devicename: 'i2387g263f',
  Temperature: '28',
  Timestamp: '3-3-2020 16:30:08'
}
{
  Devicename: 'sd83kjhsd3',
  Temperature: '28',
  Timestamp: '3-3-2020 16:30:09'
}

Additional Info
If you need a MQTT server, simply run this docker command and let the sync happen
docker run -itd -p 1883:1883 -p 9001:9001 -v /mosquitto/data -v /mosquitto/log eclipse-mosquitto