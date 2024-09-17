
(function() {
    'use strict';

    var postmonger = new Postmonger.Session();
    var payload = {};

    postmonger.init({
        "on": {
            "init": init,
            "render": render,
            "clickedNext": clickedNext,
            "clickedBack": clickedBack,
            "save": save
        }
    });

    function init(data) {
        if (data) {
            payload = data;
            $('#dataToSend').val(payload.config.DataToSend || '');
            $('#externalEndpointUrl').val(payload.config.ExternalEndpointUrl || '');
        }
    }

    function render() {
        postmonger.setUserTask({
            'type': 'custom',
            'title': 'Push Data to External Endpoint',
            'description': 'Sends data entered in the UI to an external endpoint.'
        });
    }

    function clickedNext() {
        var dataToSend = $('#dataToSend').val();
        var endpointUrl = $('#externalEndpointUrl').val();

        if (dataToSend && endpointUrl) {
            postDataToEndpoint(dataToSend, endpointUrl);
        }
    }

    function clickedBack() {
        // Handle 'Back' button logic if necessary
    }

    function save() {
        payload.config = {
            DataToSend: $('#dataToSend').val(),
            ExternalEndpointUrl: $('#externalEndpointUrl').val()
        };
      
        postmonger.trigger('updateActivity', payload);
    }

    function postDataToEndpoint(dataToSend, endpointUrl) {
        $.ajax({
            url: endpointUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ data: dataToSend }),
            success: function(response) {
                console.log('Data sent successfully:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error sending data:', error);
            }
        });
    }
})();
