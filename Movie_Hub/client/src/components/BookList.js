
import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import {getBooksQuery} from '../queries/books'
import BookDetails from './BookDetails';
// import {graphql} from 'graphql';

class BookList extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: null
        }
    }

    DisplayBooks(){
        var data = this.props.data;
        if(data.loading){
            return <div>Loading Books....</div>
        }else{
            return data.books.map(book=>{
                return ( 
                <li key={book.id} onClick={(e)=>{this.setState({selected:book.id})}}>{book.name}</li>
                )
            })
        }
    }
    render() {
        console.log(this.props)
        return (
        
            <div>
                <ul id="book-list">
                    {this.DisplayBooks()}
                </ul>
                <BookDetails bookId={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);