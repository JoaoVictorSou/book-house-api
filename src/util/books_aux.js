export function get_book_index_in_array(book_id, book_array) {
    const index = book_array.findIndex((book) => book["id"] == book_id);
    
    return index;
}