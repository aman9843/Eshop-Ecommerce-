const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')




//User Registration & Login Model 

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required:true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


//Bcrypting before saving



userSchema.pre('save',async function(next) {

  if(!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)



})

//Matching Password 
userSchema.methods.matchPassword= async function(enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
