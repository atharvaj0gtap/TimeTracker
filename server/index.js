import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Path to the Excel file (in the root of the project)
const EXCEL_FILE_PATH = path.join(__dirname, '..', 'Tracker.xlsx');

// Helper to read Excel file
const readExcel = () => {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
        // Create a new file if it doesn't exist
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, EXCEL_FILE_PATH);
        return [];
    }

    const workbook = XLSX.readFile(EXCEL_FILE_PATH, { cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'yyyy-mm-dd' });
};

// Helper to write to Excel file
const writeExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, EXCEL_FILE_PATH);
};

// GET all entries
app.get('/api/entries', (req, res) => {
    try {
        const data = readExcel();
        res.json(data);
    } catch (error) {
        console.error("Error reading excel:", error);
        res.status(500).json({ error: "Failed to read data" });
    }
});

// POST new entry
app.post('/api/entries', (req, res) => {
    try {
        const newEntry = req.body;
        const currentData = readExcel();
        
        // Ensure the columns match the requirement: "Task", "Description", "Date", "Hours", "Invoice"
        // We just append whatever is sent, assuming frontend validation, but we can sanitize here if needed.
        
        const updatedData = [...currentData, newEntry];
        writeExcel(updatedData);
        
        res.json({ message: "Entry added successfully", data: updatedData });
    } catch (error) {
        console.error("Error writing excel:", error);
        res.status(500).json({ error: "Failed to save data" });
    }
});

// PUT (update) entry
app.put('/api/entries/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index);
        const updatedEntry = req.body;
        const currentData = readExcel();
        
        if (index >= 0 && index < currentData.length) {
            currentData[index] = updatedEntry;
            writeExcel(currentData);
            res.json({ message: "Entry updated successfully", data: currentData });
        } else {
            res.status(400).json({ error: "Invalid index" });
        }
    } catch (error) {
        console.error("Error updating entry:", error);
        res.status(500).json({ error: "Failed to update entry" });
    }
});

// DELETE entry
app.delete('/api/entries/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index);
        const currentData = readExcel();
        
        if (index >= 0 && index < currentData.length) {
            const updatedData = currentData.filter((_, i) => i !== index);
            writeExcel(updatedData);
            res.json({ message: "Entry deleted successfully", data: updatedData });
        } else {
            res.status(400).json({ error: "Invalid index" });
        }
    } catch (error) {
        console.error("Error deleting entry:", error);
        res.status(500).json({ error: "Failed to delete entry" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
