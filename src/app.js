import express from 'express';
import { get_book_index_in_array } from './util/books_aux.js';

const app = express();

// Body parser
app.use(express.json())

const books = [
    {id: 100, title: "Senhor dos Aneis"},
    {id: 101, title: "O Hobiit"}
];

app.get('/', (req, res) => {
    res
        .status(200)
        .send("Curso de Node.js");
});

app.get("/books", (req, res) => {
    res
        .status(200)
        .json(books)
});

app.post('/books', (req, res) => {
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

app.put("/books/:id", (req, res) => {
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
                "message": "[ERR] PLEASE, INFORM THE BOOK BOOK IDENTIFICATOR AT REQUEST BODY.",
            });
            };
        } else {
            res.status(404)
            res.json({
                "message": "[ERR] BOOK NOT EXISTS.",
            });
        }
    } else {
        res.status(400)
        res.json({
            "message": "[ERR] PLEASE, INFORM THE BOOK IDENTIFICATOR AT URL.",
        });
    };
});

export default app;