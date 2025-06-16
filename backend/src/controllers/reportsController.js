const Report = require('../models/reportModel.js');

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
};

exports.createReport = async (req, res) => {
    try {
        const { id, description, date } = req.body;
        const newReport = new Report({ id, description, date });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ message: 'Error creating report', error });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await Report.findByIdAndDelete(id);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting report', error });
    }
};