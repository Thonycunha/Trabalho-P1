const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"], 
    min: 6,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    max: 255,
    min: 6,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password.trim(), user.password);
        if (auth) {
            return user;
        }
        throw Error("Email ou  senha incorreta");
    }
    throw Error("Email ou  senha incorreta");
}
module.exports = mongoose.model("Users", userSchema);