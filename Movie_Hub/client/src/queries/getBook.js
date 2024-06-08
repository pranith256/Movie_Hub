import {gql} from '@apollo/client';

export const getBookQuery = gql`
query($id: ID){
        book(id: $id){
        name
        genre
        id
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
        }
    }
`;
