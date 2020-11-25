const {format} = require('timeago.js');



const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeagoInstance.format(savedTimestamp);
};

helpers.discount = (price) => {
    return (price*1.2);
};

helpers.currentYear = () =>{
    var now = new Date();
    return ('&copy  ' + (now.getFullYear()-1)+ '-' + now.getFullYear() +'') ;
}

helpers.sumaPrecio = (price, cantidad) =>{
    var precio = price*cantidad;
    return precio
}

helpers.ifEquals = (arg1, arg2, options) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};





helpers.Advertisement = () =>{
    var end = new Date();
 
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;
        var html ='';
        function showRemaining() {
            var now = new Date();
            var distance = end - now;
            if (distance < 0) {
    
                clearInterval(timer);
                html = 'EXPIRED!';
    
                return html;
            }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);
    
           html = `NEW OFFERSS!!      `; 
           html  +=`<img src="Front-End/paquete.svg" width="20" height="20" alt="" />  `
           html  +=`<img src="Front-End/camion-de-reparto.svg" width="20" height="20" alt="" />  `
           html  +=`<img src="Front-End/caja-de-regalo.svg" width="20" height="20" alt="" />   `
           html  += `    `+ days + ` dias, `;
           html  += hours + ` horas, `;
           html  += minutes + ` minutos y `;
           html  += seconds + ` segundos`;

           console.log(hmtl)
            return html;
        }
       
        return setInterval(showRemaining, 1000);
    
       

       
    
}



module.exports = helpers;