import AuthorModel from "../models/authorModel.js";

class AuthorController {
    async createAuthor(req, res) {
        const { name } = req.body;
        try {
            const authorId = await AuthorModel.createAuthor({ name });
            res.status(201).json({
                message: "Author created successfully",
                authorId
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating author",
                error: error.message
            });
        }
    }

    async getAllAuthors(req, res) {
        try {
            const authors = await AuthorModel.findAllAuthors();
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching authors",
                error: error.message
            });
        }
    }
}

export default new AuthorController();