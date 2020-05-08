import { GraphQLClient } from 'graphql-request'

export  async function  Graph(query, variables) {

    const endpoint = `http://localhost:4000/graphql`
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: window.localStorage.userToken,
      },
    })
    let data={}
    variables ? data =  await graphQLClient.request(query, variables) :data= await graphQLClient.request(query)
    return data
  }