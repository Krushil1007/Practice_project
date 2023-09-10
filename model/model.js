const mongoose = require('mongoose');
const { Schema } = mongoose;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    firstname : {type: String, required: true, validate: {
        validator: function(v) {
          return v.length<=16;
        }, message:"who have first name this long!!"}
    },
    lastname : {
        type: String,
        required: true,
        validate: {validator: function(v){return v.length<=16;}, message:"come on this long lastname!"}
    },
    age: {
        type: Number,
        min: [12,"Kids stay away"],
        max: [100, "somebody come get your bommer"]
    },
    email: {
        type:String,
        validate : [validateEmail, 'Please fill a valid email address']
    },
    phone:{
        type:String,
        required:true,
        validate:{validator: function(v){return v.length==10}, message:"number is not valid"}
    }
});

exports.user = mongoose.model('user', userSchema);