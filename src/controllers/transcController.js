import TranscModel from '../models/transcModel.js';


class TranscController {
    static async addTransc(req, res) {
        const { book_title, borrower, phone_no, return_date, status } = req.body;
        if (!book_title || !borrower || !phone_no || !return_date || !status) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const transcId = await TranscModel.addTransc({ book_title, borrower, phone_no, return_date, status });
            return res.status(201).json({ message: "Transaction added successfully", transcId });
        } catch (error) {
            return res.status(500).json({ message: "Failed to add transaction", error: error.message });
        }
    }

    static async getAllTransc(req, res) {
        try {
            const transcs = await TranscModel.findAll();
            return res.status(200).json(transcs);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
        }
    }

    // Edit an existing transaction
    static async updateTransc(req, res) {
        const { id } = req.params;
        const { book_title, borrower, phone_no, return_date, status } = req.body;

        if (!book_title || !borrower || !phone_no || !status) {
            return res.status(400).json({ message: "Missing required fields: book_title, borrower, phone_no, or status." });
        }

        try {
            const affectedRows = await TranscModel.editTransc(id, book_title, borrower, phone_no, return_date, status);
            if (affectedRows > 0) {
                return res.status(200).json({ message: "Transaction updated successfully" });
            } else {
                return res.status(404).json({ message: "Transaction not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to update transaction", error: error.message });
        }
    }


}

export default TranscController