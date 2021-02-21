console.log("index.js");
// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
// var client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
var address = $('#address').val();
var client;
    $('#broker-btn').click(function(){
        client = mqtt.connect(address);
        $('#connectingStatus').val("Connecting...")

        client.on('connect', function() {
            console.log('connected')
            $('#connectingStatus').val("Connected")
            $('#sub-btn').click(function() {
                console.log(" sub-btn clicked");
                $time = new Date();
                let subTopic = $('#sub-input').val();
                $('#subscribe').prepend(`<tr><td>${subTopic}</td><td>${$time.toDateString()+ " " + $time.toLocaleTimeString()}</td></tr>`)
                client.subscribe(subTopic, function(err) {
                    if (err) {
                        console.log(err)
                    }
                })
                subTopic = "";
            })
        })
        client.on('message', function(topic, message) {
                // message is Buffer
            console.log(topic.toString())
            console.log(message.toString())
            let tpc = topic.toString();
            let msg = message.toString();
            $('#posted').prepend(`<tr><td>${tpc}</td><td>${msg}</td><td>${$time.toDateString()+ " " + $time.toLocaleTimeString()}</td></tr>`)
                //   client.end()
        })
    
        var pub_button = document.getElementById('pub-button');
        pub_button.addEventListener('click', () => {
            $time = new Date();
            let topic = document.getElementById('topic-input').value;
            let pub_input = document.getElementById('payload-input').value;
            $('#published').prepend(`<tr><td>${topic}</td><td>${pub_input}</td><td>${$time.toDateString()+ " " + $time.toLocaleTimeString()}</td></tr>`)
    
            client.publish(topic, pub_input)
    
            topic = "";
            pub_input = "";
        })
    })
   