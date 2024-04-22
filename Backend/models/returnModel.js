const mongoose = require('mongoose');
const returnSchema = new mongoose.Schema({

    returnID : {
        type : String,
        unique : true,
        required : [true, "Return ID is Required!"],
    },

    returnDate : {
        type : Date,
        required : [true, "Return Date is Required!"],
        default : Date.now()
    },

    returnItemN : {
        type : String,
        required : [true, "Return Item Name is Required!"],
    },

    reason : {
        type : String,
        required : [true, "Reason for Retuen is Required!"],
    },

    customerDetails :[{
        name : {
            type : String,
            required : [true, "Customer Name Reqired"],
        },
        cAddress :{
            type : String,
            required : [true, "Customer Address is Reqired"],
        },
        phoneNO : {
            type : Number,
            required : [true, "Customer Phone NO. is Reqired"],
        },
    }],

    rStatus :{
        type : String,
        required : [true, "Return Status is Reqired"],
    }
});

const Return = mongoose.model("Return", returnSchema);
module.exports = Return;