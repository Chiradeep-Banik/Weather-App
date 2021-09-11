const express = require('express');
const handlebars = require('express-handlebars');
const app = express(); // creating an express app
const utils = require('../public/script/utils');
const port = process.env.PORT || 1313;

const public_path = '/mnt/c/Users/chira/OneDrive/Desktop/CODE/Weather-App/public';
const views_path = '/mnt/c/Users/chira/OneDrive/Desktop/CODE/Weather-App/views';

app.use(express.static(public_path));

app.engine('handlebars',handlebars({
    defaultLayout:'main'
}));

app.set('view engine','handlebars');
app.set('views',views_path);

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Home Page',
        style_common: 'common_styles.css'
    });
});
app.get('/task',(req,res)=>{
    res.render('task_app',{
        title: 'Task Page',
        style_common: 'common_styles.css'
    });
});
app.get('/weather',(req,res)=>{
    res.render('weather_app',{
        title: 'Weather Page',
        style_common: 'common_styles.css',
        style_page: 'weather_style.css',
        place_holder:'e.g. Agartala',
        script : 'weather.js'
    });
});
app.get('/get_weather',(req,res)=>{
    var address = req.query.address;
    if(!address){
        res.send({error:'Please enter a valid address'});
    }else{
        utils.lat_lang(address,(error,data)=>{
            if(error){
                res.send({ error: error });
            }else{
                var lat = data.lat;
                var lng = data.lng;
                utils.weather(lat,lng,(err,data)=>{
                    if(err){
                        res.send({ error: err });
                    }else{
                        res.send({
                            place : address,
                            weather: `${data.weather.description}.It is ${data.temp} deg in ${data.city_name}, ${data.country_code} but feels like ${data.app_temp}.`
                        });
                    }
                });
            }
        });
    }
});
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        style_common: 'common_styles.css'
    });
});

app.listen(port, () => console.log(`Started at port ${port}`));// started up the server at port port

module.exports= {
    port : port
};
