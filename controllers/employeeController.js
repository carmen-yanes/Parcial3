const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const CT = mongoose.model('Employee');

router.get('/', (req,res)=>{
    res.render("employee/addOrEdit", {
        viewTitle : "citas biblicas"
    })
});

router.post('/', (req,res)=>{
    if(req.body._id=='')
    insertRecord(req,res);
    else
    updateRecord(req.res);
 
});

function insertRecord(req,res){
    var employee = new Employee();
    employee.cita = req.body.cita;
    employee.libro = req.body.libro;
    employee.versiculo = req.body.versiculo;
    employee.cap = req.body.cap;
    employee.comentario = req.body.comentario;
    employee.save((err,doc)=>{
        if(!err)
        res.redirect('employee/list');
        else {
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit", {
                    viewTitle : "citas biblicas",
                    employee: req.body

                })
            }
            else
            console.log("error during record insertion"+err);
        }
    });

}

router.get('/list', (req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){
            res.render("employee/list",{
                list:docs
            });
        }
        else{
            console.log("error in retrieving employee list"+err)
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors) 
    {
        switch(err.errors[field].path){
            case 'cita':
                body['citaError'] = err.errors[field].message;
                break;
            case 'libro':
                body['libroError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body, {new:true}, (err,doc)=>{
        if(!err) {res.redirect('employee/list');}
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle: "citas biblicas",
                    employee: req.body
                })
            }
        }
    })
}


router.get('/:id', (req,res)=>{
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit", {
                viewTitle: "citas biblicas",
                employee: doc
            })
        }
    } );

});

router.get('delete/id', (req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log('Error in employee delete'+err)
        }
    })
})

module.exports = router;