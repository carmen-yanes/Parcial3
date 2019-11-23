const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true}, (err)=>{
    if(!err){console.log('MongoDB Connection Succeded')}
    else{console.log('Error in DB connection:'+err)}
});

require('./employee.model');


