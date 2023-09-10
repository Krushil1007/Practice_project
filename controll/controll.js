const model = require('../model/model');
const User = model.user;
const ejs = require('ejs');
const path = require('path');

exports.postdata = async (req, res)=>{
    const user = new User(req.body);
    user.save().catch((err)=>{
        console.log("error");
        if(err.name === "ValidationError"){
            let errors = {};

            Object.keys(err.errors).forEach((key) => {
              errors[key] = err.errors[key].message;
            });
            res.status(400).send(errors);
            return "er";
        }
    }).then((str)=>{
        if(str !== "er"){
            console.log("done");
            res.writeHead(301, {"Location": "users/"});
            
        }
        return res.end(); 
    })

}


exports.getdata = async (req, res)=>{
    const users = await User.find();

    // res.send(users)
    ejs.renderFile(path.resolve(__dirname,"..","pages","index.ejs"),{users:users}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}

exports.form = async (req, res)=>{
    res.sendFile(path.resolve(__dirname,"..","pages","form.html"));
}

exports.red = async (req, res)=>{
    res.writeHead(301, {"Location": "/userapi/users/"});
    res.end();
}