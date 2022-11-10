import { ApolloServer, gql } from "apollo-server";
export const typeDefs = gql`
type Query{
    users:[User]
    user(id:ID!): User
    iquote(id:ID!):[Quote]
    quotes:[QuoteWithName]
    books:[Book]
    allUser:[User]

}

type QuoteWithName{
    name:String
    id:ID
}

type User{
    id:ID
    lastName:String
    firstName:String
    email:String
    password:String,
    qoutes:[Quote]
}
type Quote{
    name:String
    id:ID
}
type Book{
    author:String
    title:String
}

input qouteUpdateInput{
    id:String
    name:String
}

type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSignin:UserSigninInput!):Token
    updateUser(UserId:UserId!):User,
    deleteUser(UserId:UserId!):User,
    createQuote(name:String!):String
    updateQoute(qouteUpdateInput:qouteUpdateInput!):String
    deleteQoute(qouteId:String!):Quote,
}

type Token{
    token:String
}
type updatedQoute{
    name:String
}

type id{
    id:String
}


input loginInput{
    email:String!
    password:String!
 }

input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
 }
 input UserSigninInput{
    email:String!
    password:String!
 }
 input UserId{
    id:String!
 }
 input qouteId{
    qouteId:String!
 }
 input qouteName{
    quoteName:String!
 }

 `;
