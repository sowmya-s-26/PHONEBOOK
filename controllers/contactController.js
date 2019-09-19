
const mongoose = require('mongoose');
const express = require('express');

var router = express.Router();

const Contact = mongoose.model('Contact');


router.get('/',(req,res)=>{
	res.render("contact/addOrEdit", {
        viewTitle: "Insert Contact"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == ''){
        var contact = new Contact({
            fullName: req.body.fullName,
            mobile: req.body.mobile
        });

        contact.save((err, doc) => {
            if (!err){
                console.log(doc);
                res.redirect('contact/list');
            }else{
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render("contact/addOrEdit", {
                    viewTitle: 'Update Contact',
                    contact: req.body
                    });

                }
                else
                {
                    console.log('Error during record insertion : ' + err);
                }
            }
            
                
            });
    }
    else
    {
    Contact.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('contact/list'); }
        else{
            if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render("contact/addOrEdit", {
                    viewTitle: 'Update Contact',
                    contact: req.body
                    });

                }
                else
                {
                    console.log('Error during record insertion : ' + err);
                }
            }
    });
    }
    

});






router.get('/list', (req, res) => {
	Contact.find((err, docs) => {
        if (!err) {
            res.render("contact/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}



router.get('/:id', (req, res) => {
    Contact.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("contact/addOrEdit",{
                viewTitle: "Update Contact",
                contact: doc
            })
        }
        else { console.log('Error in Contact delete :' + err); }
    });
});

router.get('/delete/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/contact/list');
        }
        else { console.log('Error in contact delete :' + err); }
    });
});

module.exports = router;