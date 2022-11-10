import { qoutes, users, books } from "./fakedb.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";
const User = mongoose.model("User");
const Qoutes = mongoose.model("qoute");
export const resolvers = {
  Query: {
    // users: () => User.find({}),
    quotes: async () => {
      return await Qoutes.find({});
    },
    user: async (_, id) => {
      return await User.findOne({ _id: id.id });
    },
    iquote: async (_, id) => {
      let by = id.id;
      await Qoutes.find({ by });
    },
    books: () => books,
    allUser: async () => {
      return await User.find({});
    },
  },

  User: {
    qoutes: (ur) => qoutes.filter((data) => data.id == ur.id),
  },

  Mutation: {
    signupUser: async (_, { userNew }) => {
      console.log("userNew", userNew);
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },
    signinUser: async (_, { userSignin }) => {
      console.log("userSingn ", userSignin);
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User dosent exists with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("email or password in invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },

    updateUser: async (_, { UserId }) => {
      //let _id = UserId.id
      //let update={firstName:'sardar jalil khan'}
      let doc = await User.findOneAndUpdate(
        { _id: UserId.id },
        { $set: { firstName: "sardar jalil" } },
        {
          returnOriginal: false,
        }
      );
      return doc;
    },

    updateQoute: async (_,  { qouteUpdateInput } ) => {
      console.log("qouteId", qouteUpdateInput);
      //let _id = UserId.id
      //let update={firstName:'sardar jalil khan'}
      let doc = await Qoutes.findOneAndUpdate(
        { id: qouteUpdateInput.id },
        { $set: { name: qouteUpdateInput.name } },
        {
          returnOriginal: false,
        }
      );
      if (doc) {
        return "updated Sucessfully";
      } else {
        throw Error("Error!");
      }
    },

    deleteUser: async (_, { UserId }) => {
      let doc = await User.findOneAndDelete(
        { _id: UserId.id },
        {
          returnOriginal: false,
        }
      );
      console.log("doc is", doc);
      if (!doc) {
        throw new Error("12");
      }
      // return doc
    },

    deleteQoute: async (_, { qouteId }) => {
      console.log("qouteId", qouteId);
      let doc = await Qoutes.findOneAndDelete(
        { _id: qouteId },
        {
          returnOriginal: false,
        }
      );
      if (!doc) {
        console.log("doc is", doc);
        throw new Error("12");
      }
      // return doc
      else if (doc) {
        return "Deleted Successfully";
      }
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("Please Login In first");
      let newQoutes = new Qoutes({
        name: name,
        by: userId,
      });

      await newQoutes.save();
      return "Successfull Created";
    },
  },
};

