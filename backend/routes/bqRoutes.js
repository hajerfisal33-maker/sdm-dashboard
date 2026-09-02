const express = require("express");

const router = express.Router();

const controller = require("../controllers/bqController");


// ======================================
// BQ1: Geographic and Historical Patterns
// ======================================

router.get("/country", controller.movementsByCountry);

router.get("/region", controller.movementsByRegion);

router.get("/year", controller.movementsByYear);


// ======================================
// BQ2: Claim Types and Duration
// ======================================

router.get("/claim-types", controller.claimTypes);

router.get("/claim-duration", controller.claimDuration);


// ======================================
// BQ3: Sovereignty Declarations
// ======================================

router.get(
    "/sovereignty-declarations",
    controller.sovereigntyDeclarations
);

router.get(
    "/declaration-by-claim",
    controller.declarationByClaim
);

router.get(
    "/declarations-chi-square",
    controller.declarationChiSquare
);



// BQ4

router.get(
    "/violent-movements",
    controller.violentMovements
);


router.get(
    "/violent-escalation",
    controller.violentEscalation
);


router.get(
    "/violence-onset",
    controller.violenceOnset
);

// ======================================
// BQ5: Concessions
// ======================================

router.get(
    "/concessions",
    controller.concessions
);

router.get(
    "/cultural-concessions",
    controller.culturalConcessions
);

router.get(
    "/autonomy-concessions",
    controller.autonomyConcessions
);

router.get(
    "/independence-concessions",
    controller.independenceConcessions
);

router.get(
    "/concession-movements",
    controller.concessionMovements
);

router.get(
    "/concession-movements-by-claim",
    controller.concessionMovementsByClaim
);

router.get(
    "/concessions-chi-square",
    controller.concessionsChiSquare
);


// ======================================
// BQ6: Restrictions
// ======================================

router.get(
    "/restrictions",
    controller.restrictions
);

router.get(
    "/cultural-restrictions",
    controller.culturalRestrictions
);

router.get(
    "/autonomy-restrictions",
    controller.autonomyRestrictions
);

router.get(
    "/independence-restrictions",
    controller.independenceRestrictions
);

router.get(
    "/restriction-movements",
    controller.restrictionMovements
);

router.get(
    "/restriction-movements-by-claim",
    controller.restrictionMovementsByClaim
);

router.get(
    "/restrictions-chi-square",
    controller.restrictionsChiSquare
);


// ======================================
// BQ7: Group Characteristics
// ======================================

router.get(
    "/group-size",
    controller.groupSize
);

router.get(
    "/geographic-concentration",
    controller.geographicConcentration
);

router.get(
    "/power-participation",
    controller.powerParticipation
);


// ======================================
// Dashboard Filters
// ======================================

router.get(
    "/filters/countries",
    controller.filterCountries
);

router.get(
    "/filters/regions",
    controller.filterRegions
);

router.get(
    "/filters/years",
    controller.filterYears
);

router.get(
    "/filters/claims",
    controller.filterClaims
);


// ======================================
// Globe
// ======================================

router.get(
    "/globe/countries",
    controller.globeCountries
);

router.get(
    "/country-details/:countryName",
    controller.getCountryDetails
);


module.exports = router;