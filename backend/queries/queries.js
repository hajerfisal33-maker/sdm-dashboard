
const queries = {

    // ===============================
    // BQ1
    // ===============================

    movementsByCountry: `
        SELECT
            c.country_name,
            COUNT(DISTINCT eg.group_id) AS total_movements
        FROM countries c
        JOIN ethnic_groups eg
        ON c.country_id = eg.country_id
        GROUP BY c.country_name
        ORDER BY total_movements DESC;
    `,

    movementsByRegion: `
        SELECT
            region,
            COUNT(DISTINCT group_id) AS total_movements
        FROM ethnic_groups
        GROUP BY region
        ORDER BY total_movements DESC;
    `,

    movementsByYear: `
        SELECT
            year,
            COUNT(DISTINCT group_id) AS active_movements
        FROM movement_observations
        GROUP BY year
        ORDER BY year;
    `,

    // ===============================
    // BQ2
    // ===============================

    claimTypes: `
        SELECT
            domclaim,
            COUNT(DISTINCT group_id) AS total_movements
        FROM movement_observations
        WHERE domclaim IS NOT NULL
        GROUP BY domclaim
        ORDER BY total_movements DESC;
    `,

    claimDuration: `
        SELECT
            group_id,
            domclaim,
            sdm_startdate1,
            sdm_enddate1,
            CASE
                WHEN sdm_enddate1 IN (8888,9999)
                THEN NULL
                ELSE (sdm_enddate1-sdm_startdate1)
            END AS duration
        FROM movement_observations
        WHERE sdm_startdate1 IS NOT NULL
        AND sdm_enddate1 IS NOT NULL;
    `,

    // ===============================
    // BQ3
    // ===============================

    sovereigntyDeclarations: `
     SELECT
    year,
    COUNT(*) AS declarations
FROM movement_observations
WHERE sovdec = 1
GROUP BY year
ORDER BY year;
    `,

    declarationByClaim: `
        SELECT
            domclaim,
            COUNT(*) AS declarations
        FROM movement_observations
        WHERE sovdec = 1
        GROUP BY domclaim;
    `,

    declarationChiSquare: `
        SELECT
            domclaim,
            sovdec
        FROM movement_observations
        WHERE domclaim IS NOT NULL;
    `,

    // ===============================
    // BQ4
    // ===============================

    violentMovements: `
        SELECT
            violsd,
            COUNT(*) AS total
        FROM movement_observations
        GROUP BY violsd;
    `,

    violentEscalation: `
        SELECT
            viol_escal,
            COUNT(*) AS total
        FROM movement_observations
        GROUP BY viol_escal;
    `,

    violenceOnset: `
        SELECT
            violsd_onset,
            COUNT(*) AS total
        FROM movement_observations
        WHERE violsd_onset IS NOT NULL
        GROUP BY violsd_onset
        ORDER BY violsd_onset;
    `,

    // ===============================
    // BQ5
    // ===============================

    concessions: `
        SELECT
            domclaim,
            SUM(con) AS concessions
        FROM movement_observations
        GROUP BY domclaim;
    `,

    culturalConcessions: `
        SELECT
            domclaim,
            SUM(cultcon) AS cultural_concessions
        FROM movement_observations
        GROUP BY domclaim;
    `,

    autonomyConcessions: `
        SELECT
            domclaim,
            SUM(autcon) AS autonomy_concessions
        FROM movement_observations
        GROUP BY domclaim;
    `,

    independenceConcessions: `
        SELECT
            domclaim,
            SUM(indcon) AS independence_concessions
        FROM movement_observations
        GROUP BY domclaim;
    `,

    concessionsChiSquare: `
        SELECT
            domclaim,
            con
        FROM movement_observations;
    `,

    // ===============================
    // BQ6
    // ===============================

    restrictions: `
        SELECT
            SUM(res) AS restrictions
        FROM movement_observations;
    `,

    culturalRestrictions: `
        SELECT
            SUM(cultres) AS cultural_restrictions
        FROM movement_observations;
    `,

    autonomyRestrictions: `
        SELECT
            SUM(autres) AS autonomy_restrictions
        FROM movement_observations;
    `,

    independenceRestrictions: `
        SELECT
            SUM(indres) AS independence_restrictions
        FROM movement_observations;
    `,

    restrictionsChiSquare: `
        SELECT
            domclaim,
            res
        FROM movement_observations;
    `,

    // ===============================
    // BQ7
    // ===============================

    groupSize: `
        SELECT
            group_name,
            group_size
        FROM ethnic_groups
        ORDER BY group_size DESC;
    `,

    geographicConcentration: `
        SELECT
            group_con,
            COUNT(*) AS total_groups
        FROM ethnic_groups
        GROUP BY group_con;
    `,

    powerParticipation: `
        SELECT
            pwrstat,
            COUNT(*) AS total_groups
        FROM ethnic_groups
        GROUP BY pwrstat;
    `

};

module.exports = queries;