const express = require("express");
const router = express.Router();
const db = require("../db");   // لو اتصال قاعدة البيانات عندك اسمو db.js

// ==========================
// Get Countries
// ==========================
router.get("/countries", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT DISTINCT country_name
            FROM countries
            ORDER BY country_name
        `);

        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// ==========================
// Get Regions
// ==========================
router.get("/regions", async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT DISTINCT region
            FROM countries
            ORDER BY region
        `);

        res.json(rows);

    } catch (err) {

        console.error(err);
        res.status(500).json(err);

    }

});


// ==========================
// Get Years
// ==========================
router.get("/years", async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT DISTINCT year
            FROM movement_observations
            ORDER BY year
        `);

        res.json(rows);

    } catch (err) {

        console.error(err);
        res.status(500).json(err);

    }

});


module.exports = router;