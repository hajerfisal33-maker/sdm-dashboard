
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
    domclaim,
    AVG(duration) AS avg_duration
FROM (

    SELECT DISTINCT
        group_id,
        domclaim,

        CASE
            WHEN sdm_enddate1 = 9999 THEN 2020 - sdm_startdate1
            WHEN sdm_enddate1 = 8888 THEN NULL
            ELSE sdm_enddate1 - sdm_startdate1
        END AS duration

    FROM movement_observations

    WHERE sdm_startdate1 IS NOT NULL

) t

WHERE duration IS NOT NULL

GROUP BY domclaim

ORDER BY domclaim;
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
FROM (
    SELECT
        group_id,
        MAX(violsd) AS violsd
    FROM movement_observations
    GROUP BY group_id
) t
GROUP BY violsd;
`,

violentEscalation: `
SELECT
CASE
    WHEN max_violsd = 0 THEN 'Stayed Peaceful'
    WHEN first_violsd = 0 AND max_violsd = 1 THEN 'Escalated to Violence'
    WHEN first_violsd = 1 THEN 'Violent from Start'
END AS category,

COUNT(*) AS total

FROM (

SELECT
    group_id,

    MIN(year) AS first_year,

    (
        SELECT violsd
        FROM movement_observations m2
        WHERE m2.group_id = m1.group_id
        ORDER BY year ASC
        LIMIT 1
    ) AS first_violsd,

    MAX(violsd) AS max_violsd

FROM movement_observations m1

GROUP BY group_id

) t

GROUP BY category;
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

    // عدد الحركات التي مُنحت أي تنازل

concessionMovements: `
SELECT
    COUNT(DISTINCT group_id) AS total_movements
FROM movement_observations
WHERE
      con = 1
   OR cultcon = 1
   OR autcon = 1
   OR indcon = 1;
`,

// عدد الحركات حسب نوع المطالبة التي تلقت تنازلات

concessionMovementsByClaim: `
SELECT
    domclaim,
    COUNT(DISTINCT group_id) AS movements
FROM movement_observations
WHERE
      con = 1
   OR cultcon = 1
   OR autcon = 1
   OR indcon = 1
GROUP BY domclaim
ORDER BY movements DESC;
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

   

    // عدد الحركات التي فُرضت عليها قيود

restrictionMovements: `
SELECT
    COUNT(DISTINCT group_id) AS total_movements
FROM movement_observations
WHERE
      res = 1
   OR cultres = 1
   OR autres = 1
   OR indres = 1;
`,

// عدد الحركات حسب نوع المطالبة التي تعرضت لقيود

restrictionMovementsByClaim: `
SELECT
    domclaim,
    COUNT(DISTINCT group_id) AS movements
FROM movement_observations
WHERE
      res = 1
   OR cultres = 1
   OR autres = 1
   OR indres = 1
GROUP BY domclaim
ORDER BY movements DESC;
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
    MAX(group_size) AS group_size
FROM movement_observations mo
JOIN ethnic_groups eg
ON mo.group_id = eg.group_id
GROUP BY group_name
ORDER BY group_size DESC;
`,

geographicConcentration: `
SELECT
    group_con,
    COUNT(DISTINCT group_id) AS total_groups
FROM movement_observations
WHERE group_con IS NOT NULL
GROUP BY group_con;
`,

powerParticipation: `
SELECT
    pwrstat,
    COUNT(DISTINCT group_id) AS total_groups
FROM movement_observations
WHERE pwrstat IS NOT NULL
GROUP BY pwrstat;
`
,
// ===============================
// FILTER OPTIONS
// ===============================

filterCountries: `
    SELECT DISTINCT
        c.country_id,
        c.country_name
    FROM countries c
    JOIN ethnic_groups eg
        ON c.country_id = eg.country_id
    ORDER BY c.country_name;
`,

filterRegions: `
    SELECT DISTINCT
        region
    FROM ethnic_groups
    WHERE region IS NOT NULL
    ORDER BY region;
`,

filterClaims: `
    SELECT DISTINCT
        domclaim
    FROM movement_observations
    WHERE domclaim IS NOT NULL
    ORDER BY domclaim;
`,

filterYears: `
    SELECT DISTINCT
        year
    FROM movement_observations
    WHERE year IS NOT NULL
    ORDER BY year;
`,




};

module.exports = queries;