const { Router } = require ("express");
const { createBookHandler, getManyBooksHandler, deleteBookHandler, updateBookHandler } = require("../controllers/book.controller");




const router = Router();  

/**
 * @openapi
 * /api/books:
 *   get:
 *     tags:
 *       - Book
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Returns all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookDto'
 *       500:
 *         description: Internal server error
 * 
 *   post:
 *     tags:
 *       - Book
 *     description: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookDto'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookDto'
 *       500:
 *         description: Internal server error
 * 
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Book
 *     description: Get a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookDto'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 * 
 *   patch:
 *     tags:
 *       - Book
 *     description: Update a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookDto'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookDto'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     tags:
 *       - Book
 *     description: Delete a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */


router.route("/").post(createBookHandler).get(getManyBooksHandler);
router.route("/:id").patch(updateBookHandler).delete(deleteBookHandler);



module.exports = router;  
