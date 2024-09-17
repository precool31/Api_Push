define(['postmonger'], function (Postmonger) {
    'use strict';

    let connection = new Postmonger.Session();
    let authTokens = {};
    let payload = {};

    // Configuration variables
    let eventSchema = ''; // variable is used in parseEventSchema()
    let lastnameSchema = ''; // variable is used in parseEventSchema()
    let eventDefinitionKey;

    $(window).ready(onRender);
    connection.on('initActivity', initialize);
    connection.on('clickedNext', save); //Save function within MC

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    /**
     * This function is to pull out the event definition within journey builder.
     * With the eventDefinitionKey, you are able to pull out values that passes through the journey
     */
    connection.trigger('requestTriggerEventDefinition');
    connection.on('requestedTriggerEventDefinition', function (eventDefinitionModel) {
        if (eventDefinitionModel) {
            eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
            // console.log('Request Trigger >>>', JSON.stringify(eventDefinitionModel));
        }
    });

    function initialize(data) {
        if (data) {
            payload = data;
            $('#dataToSend').val(payload.config.DataToSend || '');
            $('#externalEndpointUrl').val(payload.config.ExternalEndpointUrl || '');
        }
        initialLoad(data);
        parseEventSchema();
    }

    /**
     * Save function is fired off upon clicking of "Done" in Marketing Cloud
     * The config.json will be updated here if there are any updates to be done via Front End UI
     */
    function save() {
        
        payload['metaData'].isConfigured = true;
        
        payload.config = {
            DataToSend: $('#dataToSend').val(),
            ExternalEndpointUrl: $('#externalEndpointUrl').val()
        };
        
        if (DataToSend && ExternalEndpointUrl) {
            postDataToEndpoint(dataToSend, endpointUrl);
        }
      connection.trigger('updateActivity', payload);
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
    /**
     * 
     * @param {*} data
     * 
     * This data param is the config json payload that needs to be loaded back into the UI upon opening the custom application within journey builder 
     * This function is invoked when the user clicks on the custom activity in Marketing Cloud. 
     * If there are information present, it should be loaded back into the appropriate places. 
     * e.g. input fields, select lists
     */
    

    /**
     * This function is to pull the relevant information to create the schema of the objects
     * 
     * This function pulls out the schema for additional customizations that can be used.
     * This function leverages on the required field of "Last Name" to pull out the overall event schema
     * 
     * returned variables of: lastnameSchema , eventSchema.
     * eventSchema = Case:Contact:
     * lastnameSchema = Case:Contact:<last_name_schema>
     * 
     * View the developer console in chrome upon opening of application in MC Journey Builder for further clarity.
     */
   
});
