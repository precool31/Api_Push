var connection = new Postmonger.Session();

connection.trigger('ready');

connection.on('initActivity',function(data){
if (data) {
            payload = data;
            $('#dataToSend').val(payload.config.DataToSend || '');
            $('#externalEndpointUrl').val(payload.config.ExternalEndpointUrl || '');
        }
      

});

connection.on('clickedNext',function(){
var configuration = JSON.parse(document.getElementById('dataToSend').value);
connection.trigger('updateActivity',configuration);
});
