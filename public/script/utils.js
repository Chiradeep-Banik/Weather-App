const rq = require('postman-request');

const lat_lang = (address, callback) => {
    const url = "https://open.mapquestapi.com/geocoding/v1/address?location="+encodeURIComponent(address)+"&key=kKQnmMrSTwvkXeX3LFuu7oMb8xlicwTO";
    rq({url:url, json : true}, (error, {body}) => {
        if(error){
            callback("Unable to connect",undefined);
        }else{
            var data = body.results[0].locations[0].latLng;
            callback(undefined, data);
        }
    });
};
const weather = (lat, lon, callback) => {
    const url = "http://api.weatherbit.io/v2.0/current?key=b0bc6917eb8b4d2587a94d4ca01c067a"+"&lat="+lat+"&lon="+lon;
    rq({url:url, json : true}, (error,{body}) => {
        if(error){
            callback("Unable to connect",undefined);
        }else{
            var data = body.data[0]
            callback(undefined, data);
        }
    });
};

module.exports = {
    lat_lang,
    weather
};

