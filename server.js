import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs } from "./schemaGql.js";
import jwt from 'jsonwebtoken';
import {mongoUrl,JWT_SECRET} from './config.js'
import mongoose from 'mongoose'
import morgan from "morgan";

mongoose.connect(mongoUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
  console.log("connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
  console.log("error connecting",err)
})

import './models/qoutes.js'
import './models/user.js'
import { resolvers } from "./resolvers.js";
 //this is middleware  
 const context= ({req})=>{
  const { authorization } = req.headers;
  if(authorization){
   const {userId} = jwt.verify(authorization,JWT_SECRET)
   return {userId}
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

morgan('combined')

server.listen().then(({ url }) => {
  console.log("Listen", url);
});
