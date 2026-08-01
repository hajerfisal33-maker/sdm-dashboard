const express = require("express");

const router = express.Router();

const controller = require("../controllers/bqController");


// BQ1

router.get("/country",controller.movementsByCountry);

router.get("/region",controller.movementsByRegion);

router.get("/year",controller.movementsByYear);
// BQ2

router.get("/claim-types", controller.claimTypes);

router.get("/claim-duration", controller.claimDuration);
// BQ3
router.get("/sovereignty-declarations", controller.sovereigntyDeclarations);

router.get("/declaration-by-claim", controller.declarationByClaim);

router.get("/declarations-chi-square", controller.declarationChiSquare);
// BQ4
router.get("/violent-movements", controller.violentMovements);

router.get("/violent-escalation", controller.violentEscalation);

router.get("/violenceOnset", controller.violenceOnset);
// BQ5
router.get("/concessions", controller.concessions);

router.get("/cultural-concessions", controller.culturalConcessions);

router.get("/autonomy-concessions", controller.autonomyConcessions);

router.get("/independence-concessions", controller.independenceConcessions);

router.get("/concessions-chi-square", controller.concessionsChiSquare);
// BQ6
router.get("/restrictions", controller.restrictions);

router.get("/cultural-restrictions", controller.culturalRestrictions);

router.get("/autonomy-restrictions", controller.autonomyRestrictions);

router.get("/independence-restrictions", controller.independenceRestrictions);

router.get("/restrictions-chi-square", controller.restrictionsChiSquare);
// BQ7
router.get("/group-size", controller.groupSize);

router.get("/geographic-concentration", controller.geographicConcentration);

router.get("/power-participation", controller.powerParticipation);

module.exports = router;