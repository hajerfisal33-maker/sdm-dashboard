const db = require("../db");
const queries = require("../queries/queries");
const chiSquareTest = require("../statistics/chiSquare");

const jStat = require("jstat");
// =========================
// BQ1 Country
// =========================

exports.movementsByCountry = async (req, res) => {

    console.log("BQ1 COUNTRY DISTRIBUTION");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;


        const params = [

            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim

        ];


        const [rows] = await db.query(

            queries.movementsByCountry,

            params

        );


        console.log(rows);


        res.json(rows);

    }

    catch (error) {

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

    console.log("BQ1 REGION DISTRIBUTION");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;


        const params = [

            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim

        ];


        const [rows] = await db.query(

            queries.movementsByRegion,

            params

        );


        console.log(rows);


        res.json(rows);

    }

    catch (error) {

        console.log(error);


        res.status(500).json({

            error: error.message

        });

    }


};
// =========================
// BQ1 Year
// =========================

exports.movementsByYear = async (req, res) => {

    console.log("BQ1 HISTORICAL DISTRIBUTION");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;


        const params = [

            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim

        ];


        const [rows] = await db.query(

            queries.movementsByYear,

            params

        );


        console.log(rows);


        res.json(rows);

    }

    catch (error) {

        console.log(error);


        res.status(500).json({

            error: error.message

        });

    }

};

// =========================
// BQ2 Claim Types
// =========================

exports.claimTypes = async (req, res) => {

    try {

        const {

            country = "",
            region = "",
            year = "",
            claim = ""

        } = req.query;


        const params = [

            region,
            region,

            country,
            country,

            year,
            year,

            claim,
            claim

        ];


        const [rows] = await db.query(

            queries.claimTypes,

            params

        );


        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


exports.claimDuration = async (req, res) => {

    try {

        const {

            country = "",
            region = "",
            year = "",
            claim = ""

        } = req.query;


        const params = [

            region,
            region,

            country,
            country,

            year,
            year,

            claim,
            claim

        ];


        const [rows] = await db.query(

            queries.claimDuration,

            params

        );


        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

};


// =========================
// BQ3 Sovereignty
// =========================

exports.sovereigntyDeclarations = async (req, res) => {

    console.log("BQ3 SOVEREIGNTY DECLARATIONS");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;


        const params = [

            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim

        ];


        const [rows] = await db.query(

            queries.sovereigntyDeclarations,

            params

        );


        console.log(rows);


        res.json(rows);

    }

    catch (error) {

        console.log(error);


        res.status(500).json({

            error: error.message

        });

    }

};

// =========================
// BQ3 Distribution
// =========================

exports.declarationByClaim = async (req, res) => {

    console.log("BQ3 DECLARATIONS BY CLAIM");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;


        const params = [

            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim

        ];


        const [rows] = await db.query(

            queries.declarationByClaim,

            params

        );


        console.log(rows);


        res.json(rows);

    }

    catch (error) {

        console.log(error);


        res.status(500).json({

            error: error.message

        });

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
// BQ4 Violence Experienced
// =========================

exports.violentMovements = async (req, res) => {

    console.log("BQ4 VIOLENT MOVEMENTS");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;


        const params = [

            country,
            country,

            region,
            region,

            claim,
            claim,

            year,
            year

        ];


        const [rows] = await db.query(

            queries.violentMovements,

            params

        );


        console.log(rows);


        res.json(rows);

    }

    catch (error) {

        console.log(error);


        res.status(500).json({

            error: error.message

        });

    }

};



// =========================
// BQ4 Violence Escalation
// =========================

exports.violentEscalation = async (req, res) => {

    console.log("BQ4 VIOLENCE ESCALATION");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;


        const params = [

            country,
            country,

            region,
            region,

            claim,
            claim,

            year,
            year

        ];


        const [rows] = await db.query(

            queries.violentEscalation,

            params

        );


        console.log(rows);


        res.json(rows);

    }

    catch (error) {

        console.log(error);


        res.status(500).json({

            error: error.message

        });

    }

};



// =========================
// BQ4 Started With Violence
// =========================

exports.violenceOnset = async (req, res) => {

    console.log("BQ4 VIOLENCE ONSET");

    try {

        const {
            country = "",
            region = "",
            claim = ""
        } = req.query;


        const params = [

            country,
            country,

            region,
            region,

            claim,
            claim

        ];


        const [rows] = await db.query(

            queries.violenceOnset,

            params

        );


        console.log(rows);


        res.json(rows);

    }

    catch (error) {

        console.log(error);


        res.status(500).json({

            error: error.message

        });

    }

};

// =====================================================
// BQ5
// Government Concessions
// =====================================================


// =====================================================
// Helper for BQ5 Filters
// =====================================================

function getBQ5Params(req) {

    const {
        country = "",
        region = "",
        year = "",
        claim = ""
    } = req.query;

    return [

        country,
        country,

        region,
        region,

        year,
        year,

        claim,
        claim

    ];
}


// =====================================================
// BQ5 Total Concessions
// =====================================================

exports.concessions = async (req, res) => {

    console.log("BQ5 TOTAL CONCESSIONS");

    try {

        const params = getBQ5Params(req);

        const [rows] = await db.query(
            queries.concessions,
            params
        );

        console.log(rows);

        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// =====================================================
// BQ5 Cultural Concessions
// =====================================================

exports.culturalConcessions = async (req, res) => {

    console.log("BQ5 CULTURAL CONCESSIONS");

    try {

        const params = getBQ5Params(req);

        const [rows] = await db.query(
            queries.culturalConcessions,
            params
        );

        console.log(rows);

        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// =====================================================
// BQ5 Autonomy Concessions
// =====================================================

exports.autonomyConcessions = async (req, res) => {

    console.log("BQ5 AUTONOMY CONCESSIONS");

    try {

        const params = getBQ5Params(req);

        const [rows] = await db.query(
            queries.autonomyConcessions,
            params
        );

        console.log(rows);

        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// =====================================================
// BQ5 Independence Concessions
// =====================================================

exports.independenceConcessions = async (req, res) => {

    console.log("BQ5 INDEPENDENCE CONCESSIONS");

    try {

        const params = getBQ5Params(req);

        const [rows] = await db.query(
            queries.independenceConcessions,
            params
        );

        console.log(rows);

        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// =====================================================
// BQ5 Unique Movements Receiving Concessions
// =====================================================

exports.concessionMovements = async (req, res) => {

    console.log("BQ5 CONCESSION MOVEMENTS");

    try {

        const params = getBQ5Params(req);

        const [rows] = await db.query(
            queries.concessionMovements,
            params
        );

        console.log(rows);

        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// =====================================================
// BQ5 Unique Movements by Claim
// =====================================================

exports.concessionMovementsByClaim = async (req, res) => {

    console.log("BQ5 CONCESSION MOVEMENTS BY CLAIM");

    try {

        const params = getBQ5Params(req);

        const [rows] = await db.query(
            queries.concessionMovementsByClaim,
            params
        );

        console.log(rows);

        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// =====================================================
// BQ5 Chi-Square
// No Dashboard Filters
// =====================================================

exports.concessionsChiSquare = async (req, res) => {

    console.log("BQ5 CONCESSIONS CHI SQUARE");

    try {

        const [rows] = await db.query(
            queries.concessionsChiSquare
        );

        const result = chiSquareTest(
            rows,
            "domclaim",
            "con"
        );

        let interpretation = "";

        if (result.pValue < 0.05) {

            interpretation =
                "There is a statistically significant association between dominant claim type and government concessions (p < 0.05).";

        }

        else {

            interpretation =
                "There is no statistically significant association between dominant claim type and government concessions (p > 0.05).";

        }

        res.json({

            chiSquare: result.chiSquare,

            degreesOfFreedom:
                result.degreesOfFreedom,

            pValue:
                result.pValue,

            interpretation

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};
// =====================================================
// BQ6 Restrictions
// =====================================================


// =====================================================
// Total Restrictions
// =====================================================

exports.restrictions = async (req, res) => {

    console.log("BQ6 RESTRICTIONS");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;

        const params = [
            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim
        ];

        const [rows] = await db.query(
            queries.restrictions,
            params
        );

        console.log(rows);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }
};


// =====================================================
// Cultural Restrictions
// =====================================================

exports.culturalRestrictions = async (req, res) => {

    console.log("BQ6 CULTURAL RESTRICTIONS");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;

        const params = [
            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim
        ];

        const [rows] = await db.query(
            queries.culturalRestrictions,
            params
        );

        console.log(rows);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }
};


// =====================================================
// Autonomy Restrictions
// =====================================================

exports.autonomyRestrictions = async (req, res) => {

    console.log("BQ6 AUTONOMY RESTRICTIONS");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;

        const params = [
            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim
        ];

        const [rows] = await db.query(
            queries.autonomyRestrictions,
            params
        );

        console.log(rows);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }
};


// =====================================================
// Independence Restrictions
// =====================================================

exports.independenceRestrictions = async (req, res) => {

    console.log("BQ6 INDEPENDENCE RESTRICTIONS");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;

        const params = [
            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim
        ];

        const [rows] = await db.query(
            queries.independenceRestrictions,
            params
        );

        console.log(rows);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }
};


// =====================================================
// Distinct Restriction Movements
// =====================================================

exports.restrictionMovements = async (req, res) => {

    console.log("BQ6 RESTRICTION MOVEMENTS");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;

        const params = [
            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim
        ];

        const [rows] = await db.query(
            queries.restrictionMovements,
            params
        );

        console.log(rows);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }
};


// =====================================================
// Restriction Movements By Claim
// =====================================================

exports.restrictionMovementsByClaim = async (req, res) => {

    console.log("BQ6 RESTRICTION MOVEMENTS BY CLAIM");

    try {

        const {
            country = "",
            region = "",
            year = "",
            claim = ""
        } = req.query;

        const params = [
            country,
            country,

            region,
            region,

            year,
            year,

            claim,
            claim
        ];

        const [rows] = await db.query(
            queries.restrictionMovementsByClaim,
            params
        );

        console.log(rows);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }
};


// =====================================================
// BQ6 Chi-Square
// =====================================================

exports.restrictionsChiSquare = async (req, res) => {

    console.log("BQ6 RESTRICTIONS CHI SQUARE");

    try {

        const [rows] = await db.query(
            queries.restrictionsChiSquare
        );

        const result = chiSquareTest(
            rows,
            "domclaim",
            "res"
        );

        let interpretation = "";

        if (result.pValue < 0.05) {

            interpretation =
                "There is a statistically significant association between dominant claim type and government restrictions (p < 0.05).";

        } else {

            interpretation =
                "There is no statistically significant association between dominant claim type and government restrictions (p > 0.05).";

        }

        res.json({

            chiSquare:
                result.chiSquare,

            degreesOfFreedom:
                result.degreesOfFreedom,

            pValue:
                result.pValue,

            interpretation

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        }
    );


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


// =========================
// Countries Filter
// =========================

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

        res.status(500).json({
            error: error.message
        });

    }

};


// =========================
// Regions Filter
// =========================

exports.filterRegions = async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT DISTINCT
                region
            FROM ethnic_groups
            WHERE region IS NOT NULL
            ORDER BY region;
        `);

        res.json(rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// =========================
// Years Filter
// =========================

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

        res.status(500).json({
            error: error.message
        });

    }

};


// =========================
// Claim Types Filter
// =========================

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

        res.status(500).json({
            error: error.message
        });

    }

};
//  الحقول في قاعدة البيانات وأسماء الحقول التي نريد إرسالها للفرونت إند

const countryMapping = {
  "Bosnia": "Bosnia and Herz.",
  "Central African Republic": "Central African Rep.",
  "Congo-Zaire": "Dem. Rep. Congo",
  "Cote d'Ivoire": "Côte d'Ivoire",
  "Czechia": "Czech Rep.",
  "Equatorial Guinea": "Eq. Guinea",
  "Laos": "Lao PDR",
  "Russia (USSR)": "Russia",
  "Serbia (Yugoslavia)": "Serbia",
  "Solomon Islands": "Solomon Is.",
  "South Sudan": "S. Sudan",
  "Trinidad & Tobago": "Trinidad and Tobago",
  "South Vietnam": "Vietnam"
};

   //Globe Country==============================================
exports.globeCountries = async (req, res) => {
    try {

        const [rows] = await db.query(queries.globeCountries);

        // Apply country name mapping
        const mappedRows = rows.map(row => {
            const mappedName = countryMapping[row.country_name];
            return {
                ...row,
                country_name: mappedName || row.country_name
            };
        });

        res.json(mappedRows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to load globe countries"
        });

    }
};

// جلب تفاصيل الدولة والملاحظات عند النقر على الكرة الأرضية


exports.getCountryDetails = async (req, res) => {
    try {
        const { countryName } = req.params;

        // تطبيق الـ Reverse Mapping
        const reverseMapping = {
            "Bosnia and Herz.": "Bosnia",
            "Central African Rep.": "Central African Republic",
            "Dem. Rep. Congo": "Congo-Zaire",
            "Côte d'Ivoire": "Cote d'Ivoire",
            "Czech Rep.": "Czechia",
            "Eq. Guinea": "Equatorial Guinea",
            "Lao PDR": "Laos",
            "Russia": "Russia (USSR)",
            "Serbia": "Serbia (Yugoslavia)",
            "Solomon Is.": "Solomon Islands",
            "S. Sudan": "South Sudan",
            "Trinidad and Tobago": "Trinidad & Tobago",
            "Vietnam": "South Vietnam"
        };

        const dbCountryName =
            reverseMapping[countryName] || countryName;

        // تنفيذ الاستعلامين
        const [summaryRows] = await db.query(
            queries.countrySummaryQuery,
            [dbCountryName]
        );

        const [movementRows] = await db.query(
            queries.countryMovementsQuery,
            [dbCountryName]
        );

        // التأكد من وجود بيانات الدولة
        if (
            !summaryRows ||
            summaryRows.length === 0 ||
            !summaryRows[0].country_name
        ) {
            return res.status(404).json({
                message: "لم يتم العثور على بيانات لهذه الدولة"
            });
        }

        // إرسال البيانات للـ Frontend
        return res.json({
            summary: summaryRows[0],
            movements: movementRows || []
        });

    } catch (error) {

        console.error(
            "Error fetching country details:",
            error
        );

        res.status(500).json({
            error:
                error.message ||
                "حدث خطأ أثناء استرجاع بيانات الدولة"
        });
    }
};