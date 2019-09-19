const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/appdb", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
        if(err) {
           console.log(err);
           process.exit(0);
        }else{
        	console.log('database connected!');
        }
        
});

require('./contact.model');