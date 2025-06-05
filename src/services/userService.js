import User from "../models/User"


export default {
    register(userData) {
      return User.create(userData);
    }
}