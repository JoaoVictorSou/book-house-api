import express from 'express';
import { get_book_index_in_array } from './util/books_aux.js';
import BooksController from './books/BooksController.js';
const app = express();

// Body parser
app.use(express.json())

app.get('/', (req, res) => {
    res
        .status(200)
        .send("Curso de Node.js");
});

// Controllers routers
app.use(BooksController)

export default app;