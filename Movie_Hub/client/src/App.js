import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import {ApolloClient,InMemoryCache, ApolloProvider} from '@apollo/client';
//apollo client set up 
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>Tomato Movies </h1>
      <BookList/>
      <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
