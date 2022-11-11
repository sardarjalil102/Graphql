import { ApolloClient, InMemoryCache, ApolloProvider, gql,useQuery } from '@apollo/client';

  export const GET_ALL_USERS = gql` 
  query getAllUsers{ 
    allUser{
      id,
      firstName,
      email,
      password,
   qoutes{
        name
        id
      }
    }
  }
`
export const REGISTER_USER = gql` 
input UserInput{
  firstName:String!
  lastName:String!
  email:String!
  password:String!
}

mutation signUpUser($user_new:UserInput){
  signup(userNew:$user_new){
    email,
    password,
    lastName,
    firstName
  }
}
`

export const DELETE_USER=gql` 
mutation delete($UserId:String!){
  deleteUser(UserId:$UserId){
   id,
    firstName,
    lastName,
    password
  }
}`

export const GET_ALL_QUOTES=gql`
query getAllQoutes{
  quotes{
    name,
    id,
  }
}
`
export const  ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
  `
// export const GET_ALL_QOUTES=gql`
// query getAllQoutes {
//   quotes{
//     id,
//     name
//   }
// }`

 