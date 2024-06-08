
import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import {getBookQuery} from '../queries/getBook'
import { getAuthorsQuery } from '../queries/authors';
import { addBookMutation } from '../queries/mutations';
import { flowRight as compose } from 'lodash';

class BookDetails extends Component {
    displayBookDetails(){
        console.log(this.props)
        const {book} = this.props.data
        if(book){
            return (
            <div>
                <h2>Movie Name : {book.name}</h2>
                <p>Genre : {book.genre}</p>
                <p>Director : {book.author.name}</p>
                <h4>More Sugesstions based on your interests</h4>
                <ul className="other-books">
                    {
                        book.author.books.map(item=>{
                            return (
                                <li key={item.id}>{item.name}</li>
                            )
                        })
                    }
                </ul>

            </div>
            )
        }else{
            return (
                <div> No Book Selected ..... </div>
            )
        }
    }
    render(){
        return (
        
            <div id="book-details">
                {this.displayBookDetails()}
            </div>
        );
    }
}

export default graphql(getBookQuery,{
    options:(props)=>{
        return {
            variables:{
                id:props.bookId
            }
        } 
    }
})(BookDetails)

// export default compose(
//     graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
//     graphql(addBookMutation,{name:"addBookMutation"}),
//     graphql(getBookQuery,{name:"getBookQuery"},
//     {
//         options:(props)=>{
//             return {
//                 variables:{
//                     id:props.bookId
//                 }
//             } 
//         }
//     }
//     ))(BookDetails)