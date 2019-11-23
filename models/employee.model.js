const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    cita: {
        type: String,
        required: 'This file is required'
    },
    libro: {
        type: String
    },
    versiculo: {
        type: String
    },
    capitulo: {
        type: String
    },
    comentario: {
        type: String,
    }

});

//validar para libro
employeeSchema.path("libro").validate((val)=>{
    libroRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return libroRegex.text(val);
}, 'Invalid e-mail');


mongoose.model('Employee', employeeSchema);