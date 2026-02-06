import mongoose, {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
    
  },
  username: {
    type: String,
    default: "",
    unique:true
  },
  email: {
    type: String,
    default: "",
    unique:true
  },
  profilePicture: {
    type: String,
    default: "default.jpg"
  },
  password: {
    type: String,
    default: ""
  },
  active: {
    type: Boolean,
    default: true
  },
  token: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);
export default User;