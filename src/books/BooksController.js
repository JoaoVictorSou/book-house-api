import books from "./Book.js";
import express from 'express';
import { get_book_index_in_array } from "../util/books_aux.js";

const BooksController = express.Router()

BooksController.get("/books", (req, res) => {
    res
        .status(200)
        .json(books)
});

BooksController.get('/books/:id', (req, res) => {
    const { id } = req.params

    if (id) {
        const book_index = get_book_index_in_array(id, books)
        
        if (book_index != -1) {
            res.status(200)
            res.json({
                "message": "[SUC] BOOK WAS FOUND.",
                book: books[book_index]
            });
        } else {
            res.status(404)
            res.json({
                "message": "[ERR] BOOK NOT FOUND.",
            });            
        };
    } else {
        res.status(400)
        res.json({
            "message": "[ERR] PLEASE, INFORM THE BOOK INDENTIFICATOR.",
        });  
    };
});

BooksController.post('/books', (req, res) => {
    const book_title = req.body.title;
    
    if (book_title) {
        do {
            var id_number = parseInt(Math.random() * 1000);
        } while (id_number in Object.keys(books));
    
        books.push({
            id_number,
            book_title
        });
    
        res.status(201);
        res.json({
            "message": "[SUC] BOOK CREATED IN DATABASE.",
            books,
        });
    } else {
        res.status(400);
        res.json({
            "message": "[ERR] PLEASE, INFORM THE BOOK TITLE AT REQUEST BODY.",
        });
    };
});

BooksController.put("/books/:id", (req, res) => {
    const id = req.params.id
    const new_title = req.body.new_title

    if (id) {
        const book_index = get_book_index_in_array(id, books);

        if (book_index != -1) {
            if (new_title) {
                books[book_index].title = new_title;
    
                res.status(200)
                res.json({
                    "message": "[SUC] EDITED.",
                    new_title
                });
            } else {
                res.status(400)
            res.json({
                "message": "[ERR] PLEASE, INFORM THE BOOK IDENTIFICATOR AT URL.",
            });
            };
        } else {
            res.status(404)
            res.json({
                "message": "[ERR] BOOK NOT FOUND.",
            });
        }
    } else {
        res.status(400)
        res.json({
            "message": "[ERR] PLEASE, INFORM THE BOOK IDENTIFICATOR AT URL.",
        });
    };
});

BooksController.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    if (id) {
        const book_index = get_book_index_in_array(id, books);
        if (book_index != -1) {
            // The slice method cut an interval
            books.splice(book_index, 1);

            if (get_book_index_in_array(id, books) == -1) {
                res.status(200)
                res.json({
                    "message": "[SUC] BOOK IS DELETED.",
                });    
            } else {
                res.status(500)
                res.json({
                    "message": "[ERR] BOOK IS NOT DELETED. SOMETHING WENT WRONG.",
                });
            };
        } else {
            res.status(404)
            res.json({
                "message": "[ERR] BOOK NOT FOUND.",
            });
        };

    } else {
        res.status(400)
        res.json({
            "message": "[ERR] PLEASE, INFORM THE BOOK IDENTIFICATOR AT URL.",
        });
    }
});

export default BooksController;