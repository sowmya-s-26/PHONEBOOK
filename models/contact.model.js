var mongoose=require('mongoose');
var express = require('express');
var contactSchema = new mongoose.Schema({
    fullName:{
    	type: String,
    	required: 'This field is required'
    },
    mobile:{
    	type:String,
    	required: true
    } 
});


module.exports =Contact= mongoose.model("Contact", contactSchema);