import { ApolloClient, InMemoryCache, ApolloProvider, gql,useQuery } from '@apollo/client';
export const CREATE_USER = gql` 
mutation createUser($userNew:UserInput!){
 user: signupUser(userNew:$userNew){
    email,
    password,
    lastName,
    firstName
  }
}
`
export const LOGIN_USER=gql`
mutation SigninUser($userSignin:UserSigninInput!){
  user:signinUser(userSignin:$userSignin){ 
    token
  }
}
`
export const DELETE_QOUTES=gql`
mutation deleteQoute($qouteId:String!){
  deleteQoute(qouteId:$qouteId){
    name
  }
}
`
export const CREATE_QOUTE=gql`
mutation createQoute($name:String!){
  createQuote(name:$name)
}
`
export const UPDATE_QOUTE=gql`
  mutation updateQoutes($qouteUpdateInput:qouteUpdateInput!){
  updateQoute(qouteUpdateInput:$qouteUpdateInput)
}
`