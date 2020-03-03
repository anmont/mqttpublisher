var mqtt = require('mqtt'); //npm install mqtt if not done before
var sleep = require('sleep'); //npm install sleep
var csvToJson = require('convert-csv-to-json'); // npm install convert-csv-to-json quick and dirty
var argv = require('minimist')(process.argv.slice(2)); //npm install minimist -> parse args
var mqttConn = 'mqtt://209.97.168.177:1883'; //default conn.. you can write if you dont want a -q every time
var topicName = ''; //default is no topic name
var messages = [ "Hello MQTT" , "Testing" ]; //default message in case cannot parse file or if no csv is sent
var sleepTime = 0; //default wait time in seconds between messages


//process command line args
if(argv.h)
{
    console.log("-f csv file source. -t delay in seconds, -q mqtt queue (including port), -c topic name");
    process.exit;
}
if (argv.a)
{
    console.dir(argv);
}
if (argv.q)
{
    mqttConn = argv.q;
}
if (argv.c)
{
    topicName = argv.c;
}
if (argv.f)
{
    try
    {
        messages = csvToJson.fieldDelimiter(',') .getJsonFromCsv(argv.f);
    }
    catch(e)
    {
        console.log(e);
    }
}
if (argv.t)
{
    sleepTime = argv.t;
}

var client  = mqtt.connect(mqttConn);



client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
        for(let i=0; i<messages.length;i++){
            //let sleep = sleepTime => new Promise(resolve => setTimeout(resolve, sleepTime));
            //let sleep = require('util').promisify(sleepTime);
            sleep.sleep(sleepTime);
            tmp = JSON.stringify(messages[i]);
            client.publish(topicName, tmp);
            console.log(messages[i]);
        }
      console.log("finished writing to MQTT");
    }
    if (err)
    {
        console.log(err.toString());
    }
    client.end();
  })
})


