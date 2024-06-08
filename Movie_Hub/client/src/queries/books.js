import {gql} from '@apollo/client';

export const getBooksQuery = gql`
    {
        books{
        name
        id
        }
    }
`;