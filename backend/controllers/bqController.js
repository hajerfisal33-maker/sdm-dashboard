const db = require("../db");
const queries = require("../queries/queries");
const chiSquareTest = require("../statistics/chiSquare");

const jStat = require("jstat");
// =========================
// BQ1 Country
// =========================

exports.movementsByCountry = async (req, res) => {
 console.log("COUNTRY ENDPOINT HIT");
    try{

        const [rows] = await db.query(
            queries.movementsByCountry
        );

        console.log(rows);

        res.json(rows);

    }

    catch(error){

        console.log(error);

    res.status(500).json({
            error: error.message
        });
    }

};


// =========================
// BQ1 Region
// =========================

exports.movementsByRegion = async (req, res) => {
    console.log("REGION ENDPOINT HIT");
    try{

        const [rows] = await db.query(
            queries.movementsByRegion
        );

        console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// BQ1 Year
// =========================

exports.movementsByYear = async (req, res) => {
 console.log("YEAR ENDPOINT HIT");
    try{

        const [rows] = await db.query(
            queries.movementsByYear
        );

        console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};

// =========================
// BQ2 Claim Types
// =========================

exports.claimTypes = async (req, res) => {
console.log("CLAIM TYPES ENDPOINT HIT");
    try {

        const [rows] = await db.query(
            queries.claimTypes
        );
        console.log(rows);
        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

};

// =========================
// BQ2 Duration
// =========================

exports.claimDuration = async (req, res) => {

    console.log("CLAIM DURATION ENDPOINT HIT");

    try {

        const [rows] = await db.query(
            queries.claimDuration
        );

        console.log(rows);

        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};

// =========================
// BQ3 Sovereignty
// =========================

exports.sovereigntyDeclarations = async (req, res) => {

    console.log("BQ3 DECLARATIONS");

    try{

        const [rows] = await db.query(
            queries.sovereigntyDeclarations
        );
  console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// BQ3 Distribution
// =========================

exports.declarationByClaim = async (req, res) => {
console.log("BQ3 DECLARATIONS");
    try{

        const [rows] = await db.query(
            queries.declarationByClaim
        );
  console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// BQ3 Chi Square
// =========================

exports.declarationChiSquare = async (req, res) => {

    try {

        const [rows] = await db.query(
            queries.declarationChiSquare
        );

        const result = chiSquareTest(

            rows,

            "domclaim",

            "sovdec"

        );

        let interpretation = "";

        if (result.pValue < 0.05) {

            interpretation =
                "There is a statistically significant association between dominant claim type and unilateral sovereignty declarations (p < 0.05).";

        }

        else {

            interpretation =
                "There is no statistically significant association between dominant claim type and unilateral sovereignty declarations (p > 0.05).";

        }

        res.json({

            chiSquare: result.chiSquare,

            degreesOfFreedom: result.degreesOfFreedom,

            pValue: result.pValue,

            interpretation

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

};

// =========================
// BQ4 Violent
// =========================

exports.violentMovements = async (req, res) => {
 console.log("BQ4 VIOLENT MOVEMENTS");
    try{

        const [rows] = await db.query(
            queries.violentMovements
        );
        console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// Escalation
// =========================

exports.violentEscalation = async (req, res) => {
 console.log("BQ4 VIOLENT ESCALATION");
    try{

        const [rows] = await db.query(
            queries.violentEscalation
        );
        console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};




// =========================
// BQ5 Total Concessions
// =========================

exports.concessions = async (req, res) => {
 console.log("BQ5 TOTAL CONCESSIONS");
    try {

        const [rows] = await db.query(
            queries.concessions
        );
     console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// BQ5 Cultural Concessions
// =========================

exports.culturalConcessions = async (req, res) => {
console.log("BQ5 CULTURAL CONCESSIONS");
    try {

        const [rows] = await db.query(
            queries.culturalConcessions
        );
     
     console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// BQ5 Autonomy Concessions
// =========================

exports.autonomyConcessions = async (req, res) => {
console.log("BQ5 AUTONOMY CONCESSIONS");
    try {

        const [rows] = await db.query(
            queries.autonomyConcessions
        );
           console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// BQ5 Independence Concessions
// =========================

exports.independenceConcessions = async (req, res) => {
 console.log("BQ5 independence Concessions");
    try {

        const [rows] = await db.query(
            queries.independenceConcessions
        );
        
         console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// BQ5 Concession Movements
// =========================

exports.concessionMovements = async (req, res) => {
    console.log("BQ5 CONCESSION MOVEMENTS");

    try {
        const [rows] = await db.query(
            queries.concessionMovements
        );

        console.log(rows);
        res.json(rows);

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }
};


// =========================
// BQ5 Concession Movements By Claim
// =========================

exports.concessionMovementsByClaim = async (req, res) => {
    console.log("BQ5 CONCESSION MOVEMENTS BY CLAIM");

    try {

        const [rows] = await db.query(
            queries.concessionMovementsByClaim
        );

        console.log(rows);
        res.json(rows);

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }
};



// =========================
// BQ5 Chi Square
// =========================

exports.concessionsChiSquare = async (req, res) => {
    console.log("BQ5 CONCESSIONS CHI SQUARE");
    try {
        const [rows] = await db.query(
            queries.concessionsChiSquare
        );

        // 1. حساب قيمة كاي سكوير بين نوع المطالبة والتنازلات
        const result = chiSquareTest(
            rows,
            "domclaim",
            "con" // تأكدي إن الحقل المعبر عن التنازلات اسمه con في الـ query
        );

        // 2. صياغة التفسير الإحصائي
        let interpretation = "";

        if (result.pValue < 0.05) {
            interpretation =
                "There is a statistically significant association between dominant claim type and government concessions (p < 0.05).";
        } else {
            interpretation =
                "There is no statistically significant association between dominant claim type and government concessions (p > 0.05).";
        }

        // 3. إرجاع النتيجة بالصيغة المتوقعة في الفرونت إند
        res.json({
            chiSquare: result.chiSquare,
            degreesOfFreedom: result.degreesOfFreedom,
            pValue: result.pValue,
            interpretation
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
// =========================
// BQ6 Restrictions
// =========================

exports.restrictions = async (req, res) => {
    console.log("BQ6 RESTRICTIONS");
    try {

        const [rows] = await db.query(
            queries.restrictions
        );
          console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


exports.culturalRestrictions = async (req, res) => {
console.log("BQ6 CULTURAL RESTRICTIONS");
    try {

        const [rows] = await db.query(
            queries.culturalRestrictions
        );
           console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


exports.autonomyRestrictions = async (req, res) => {
    console.log("BQ6 AUTONOMY RESTRICTIONS");
    try {

        const [rows] = await db.query(
            queries.autonomyRestrictions
        );
       console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


exports.independenceRestrictions = async (req, res) => {
    console.log("BQ6 independence RESTRICTIONS");
    try {

        const [rows] = await db.query(
            queries.independenceRestrictions
        );
          console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};

// =========================
// BQ6 Restriction Movements
// =========================

exports.restrictionMovements = async (req, res) => {
    console.log("BQ6 RESTRICTION MOVEMENTS");

    try {

        const [rows] = await db.query(
            queries.restrictionMovements
        );

        console.log(rows);
        res.json(rows);

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }
};


// =========================
// BQ6 Restriction Movements By Claim
// =========================

exports.restrictionMovementsByClaim = async (req, res) => {
    console.log("BQ6 RESTRICTION MOVEMENTS BY CLAIM");

    try {

        const [rows] = await db.query(
            queries.restrictionMovementsByClaim
        );

        console.log(rows);
        res.json(rows);

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }
};


// =========================
// BQ6 Chi Square
// =========================

exports.restrictionsChiSquare = async (req, res) => {
    console.log("BQ6 RESTRICTIONS CHI SQUARE");
    try {
        const [rows] = await db.query(
            queries.restrictionsChiSquare
        );

        // 1. حساب اختبار كاي سكوير بين نوع المطالبة والقيود
        const result = chiSquareTest(
            rows,
            "domclaim",
            "res" // تأكدي إن حقل القيود في الاستعلام اسمه res
        );

        // 2. صياغة التفسير الإحصائي بناءً على p-value
        let interpretation = "";

        if (result.pValue < 0.05) {
            interpretation =
                "There is a statistically significant association between dominant claim type and government restrictions (p < 0.05).";
        } else {
            interpretation =
                "There is no statistically significant association between dominant claim type and government restrictions (p > 0.05).";
        }

        // 3. إرجاع النتائج بالصيغة المتوقعة في الفرونت إند
        res.json({
            chiSquare: result.chiSquare,
            degreesOfFreedom: result.degreesOfFreedom,
            pValue: result.pValue,
            interpretation
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
// =========================
// BQ7 Group Size
// =========================

exports.groupSize = async (req, res) => {
    console.log("BQ7 GROUP SIZE");
    try {

        const [rows] = await db.query(
            queries.groupSize
        );
         console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// Geographic Concentration
// =========================

exports.geographicConcentration = async (req, res) => {
    console.log("BQ7 GEOGRAPHIC CONCENTRATION");
    try {

        const [rows] = await db.query(
            queries.geographicConcentration
        );
         console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};


// =========================
// Power Participation
// =========================

exports.powerParticipation = async (req, res) => {
    console.log("BQ7 POWER PARTICIPATION");
    try {

        const [rows] = await db.query(
            queries.powerParticipation
        );
         console.log(rows);
        res.json(rows);

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

};

// ========================================
// Dashboard Filters
// ========================================

// Countries
exports.filterCountries = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                country_id,
                country_name
            FROM countries
            ORDER BY country_name;
        `);

        res.json(rows);
    }

    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// Regions
exports.filterRegions = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT DISTINCT
                region
            FROM countries
            WHERE region IS NOT NULL
            ORDER BY region;
        `);

        res.json(rows);
    }

    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// Years
exports.filterYears = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT DISTINCT
                year
            FROM movement_observations
            WHERE year IS NOT NULL
            ORDER BY year;
        `);

        res.json(rows);
    }

    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// Claim Types
exports.filterClaims = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT DISTINCT
                domclaim
            FROM movement_observations
            WHERE domclaim IS NOT NULL
            ORDER BY domclaim;
        `);

        res.json(rows);
    }

    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

    //=========================

};
exports.globeCountries = async (req, res) => {
    try {
        const [rows] = await db.query(queries.globeCountries);
        res.json(rows);
    } catch (error) {
        console.error("🔴 Globe Countries Error:", error);

        // 👈 غيري هذا السطر مؤقتاً لتشاهدي سبب الخطأ مباشرة في المتصفح أو Console
        res.status(500).json({
            message: "Failed to load globe countries",
            error: error.message || error
        });
    }
};