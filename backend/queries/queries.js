
const queries = {

    // =====================================================
    // FILTER OPTIONS
    // =====================================================

    filterRegions: `
        SELECT DISTINCT
            region
        FROM ethnic_groups
        WHERE region IS NOT NULL
        ORDER BY region;
    `,


    filterCountries: `
        SELECT
            country_id,
            country_name
        FROM countries
        ORDER BY country_name;
    `,


    filterYears: `
        SELECT DISTINCT
            year
        FROM movement_observations
        WHERE year IS NOT NULL
        ORDER BY year;
    `,


    filterClaimTypes: `
        SELECT DISTINCT
            domclaim
        FROM movement_observations
        WHERE domclaim IS NOT NULL
        ORDER BY domclaim;
    `,


    // =====================================================
    // BQ1
    // Geographic and Historical Distribution
    // =====================================================

 movementsByCountry: `
    SELECT
        c.country_name,

        COUNT(
            DISTINCT eg.group_id
        ) AS total_movements

    FROM countries c

    JOIN ethnic_groups eg
        ON c.country_id = eg.country_id

    JOIN movement_observations mo
        ON eg.group_id = mo.group_id

    WHERE 1 = 1

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        c.country_id,
        c.country_name

    ORDER BY
        total_movements DESC;
`,

   movementsByRegion: `
    SELECT
        eg.region,

        COUNT(
            DISTINCT eg.group_id
        ) AS total_movements

    FROM ethnic_groups eg

    JOIN countries c
        ON eg.country_id = c.country_id

    JOIN movement_observations mo
        ON eg.group_id = mo.group_id

    WHERE
        eg.region IS NOT NULL

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        eg.region

    ORDER BY
        total_movements DESC;
`,

   movementsByYear: `
    SELECT
        mo.year,

        COUNT(
            DISTINCT mo.group_id
        ) AS active_movements

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE 1 = 1

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.year

    ORDER BY
        mo.year ASC;
`,

    claimTypes: `
    SELECT

        mo.domclaim,

        COUNT(
            DISTINCT mo.group_id
        ) AS total_movements

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        mo.domclaim IS NOT NULL

        AND (
            ? = ''
            OR eg.region = ?
        )

        AND (
            ? = ''
            OR c.country_id = ?
        )

        AND (
            ? = ''
            OR mo.year = ?
        )

        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.domclaim

    ORDER BY
        total_movements DESC;

    `,


   claimDuration: `
    SELECT

        mo.domclaim,

        AVG(
            CASE

                WHEN mo.sdm_enddate1 = 9999

                    THEN
                        2020 - mo.sdm_startdate1

                WHEN mo.sdm_enddate1 = 8888

                    THEN
                        NULL

                ELSE

                    mo.sdm_enddate1
                    -
                    mo.sdm_startdate1

            END

        ) AS avg_duration

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE

        mo.sdm_startdate1 IS NOT NULL

        AND (

            ? = ''

            OR eg.region = ?

        )

        AND (

            ? = ''

            OR c.country_id = ?

        )

        AND (

            ? = ''

            OR mo.year = ?

        )

        AND (

            ? = ''

            OR mo.domclaim = ?

        )

    GROUP BY

        mo.domclaim

    ORDER BY

        avg_duration DESC;
`,


    // =====================================================
    // BQ3
    // Sovereignty Declarations
    // =====================================================

   sovereigntyDeclarations: `
    SELECT

        mo.year,

        COUNT(
            DISTINCT CASE
                WHEN mo.sovdec = 1
                THEN mo.group_id
            END
        ) AS declarations

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE

        /* Only movements with sovereignty declarations */
        mo.sovdec = 1

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.year

    ORDER BY
        mo.year ASC;
`,

   declarationByClaim: `
    SELECT

        mo.domclaim,

        COUNT(
            DISTINCT CASE
                WHEN mo.sovdec = 1
                THEN mo.group_id
            END
        ) AS declarations

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE

        mo.domclaim IS NOT NULL

        AND mo.sovdec = 1

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.domclaim

    ORDER BY
        declarations DESC;
`,

   declarationChiSquare: `

    SELECT

        mo.group_id,

        mo.domclaim,

        mo.sovdec

    FROM movement_observations mo

    WHERE

        mo.domclaim IS NOT NULL

        AND mo.sovdec IS NOT NULL;

`,

// =====================================================
// BQ4
// Violence Patterns
// =====================================================


// -----------------------------------------------------
// Violence Experienced
// -----------------------------------------------------

violentMovements: `
    SELECT

        CASE
            WHEN EXISTS (
                SELECT 1
                FROM movement_observations x
                WHERE x.group_id = eg.group_id
                  AND x.violsd = 1
            )
            THEN 'Experienced Violence'

            ELSE 'No Recorded Violence'

        END AS violence_status,

        COUNT(DISTINCT eg.group_id) AS total

    FROM ethnic_groups eg

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE

        /* Country filter */
        (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR EXISTS (
                SELECT 1
                FROM movement_observations x
                WHERE x.group_id = eg.group_id
                  AND x.domclaim = ?
            )
        )

        /* Year filter */
        AND (
            ? = ''
            OR EXISTS (
                SELECT 1
                FROM movement_observations x
                WHERE x.group_id = eg.group_id
                  AND x.year = ?
            )
        )

    GROUP BY
        violence_status;
`,


// -----------------------------------------------------
// Violence Escalation
// -----------------------------------------------------

violentEscalation: `
    SELECT

        CASE

            WHEN EXISTS (

                SELECT 1

                FROM movement_observations peaceful

                JOIN movement_observations violent

                    ON peaceful.group_id = violent.group_id

                WHERE peaceful.group_id = eg.group_id

                    AND peaceful.violsd = 0

                    AND violent.violsd = 1

                    AND peaceful.year < violent.year

            )

            THEN 'Escalated to Violence'

            ELSE 'Did Not Escalate to Violence'

        END AS escalation_status,

        COUNT(DISTINCT eg.group_id) AS total

    FROM ethnic_groups eg

    JOIN countries c

        ON eg.country_id = c.country_id

    WHERE

        /* Country filter */

        (
            ? = ''
            OR c.country_id = ?
        )


        /* Region filter */

        AND (
            ? = ''
            OR eg.region = ?
        )


        /* Claim filter */

        AND (
            ? = ''
            OR EXISTS (

                SELECT 1

                FROM movement_observations x

                WHERE x.group_id = eg.group_id

                    AND x.domclaim = ?

            )
        )


        /* Year filter */

        AND (
            ? = ''
            OR EXISTS (

                SELECT 1

                FROM movement_observations x

                WHERE x.group_id = eg.group_id

                    AND x.year = ?

            )
        )


    GROUP BY
        escalation_status;
`,


// -----------------------------------------------------
// Movements That Started Directly With Violence
// -----------------------------------------------------

violenceOnset: `
    WITH first_observation AS (

        SELECT

            mo.group_id,

            mo.year,

            mo.violsd,

            ROW_NUMBER() OVER (

                PARTITION BY mo.group_id

                ORDER BY mo.year ASC

            ) AS rn

        FROM movement_observations mo

    )

    SELECT

        CASE

            WHEN fo.violsd = 1

                THEN 1

            ELSE 0

        END AS started_with_violence,

        COUNT(
            DISTINCT fo.group_id
        ) AS total

    FROM first_observation fo

    JOIN ethnic_groups eg
        ON fo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE

        fo.rn = 1

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /*
        Claim filter:

        Since the first observation CTE does not include
        domclaim, we check whether the movement has the
        selected claim at any point.
        */

        AND (
            ? = ''

            OR EXISTS (

                SELECT 1

                FROM movement_observations mo2

                WHERE
                    mo2.group_id = fo.group_id

                    AND mo2.domclaim = ?

            )

        )

    GROUP BY

        CASE

            WHEN fo.violsd = 1

                THEN 1

            ELSE 0

        END

    ORDER BY
        started_with_violence;
`,

   // =====================================================
// BQ5
// Government Concessions
// =====================================================

// =====================================================
// Total Concession Events by Claim
// =====================================================

concessions: `
    SELECT

        mo.domclaim,

        SUM(
            CASE
                WHEN mo.con = 1
                THEN 1
                ELSE 0
            END
        ) AS concessions

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        mo.domclaim IS NOT NULL

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.domclaim

    ORDER BY
        concessions DESC;
`,


// =====================================================
// Cultural Concession Events by Claim
// =====================================================

culturalConcessions: `
    SELECT

        mo.domclaim,

        SUM(
            CASE
                WHEN mo.cultcon = 1
                THEN 1
                ELSE 0
            END
        ) AS cultural_concessions

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        mo.domclaim IS NOT NULL

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.domclaim

    ORDER BY
        cultural_concessions DESC;
`,


// =====================================================
// Autonomy Concession Events by Claim
// =====================================================

autonomyConcessions: `
    SELECT

        mo.domclaim,

        SUM(
            CASE
                WHEN mo.autcon = 1
                THEN 1
                ELSE 0
            END
        ) AS autonomy_concessions

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        mo.domclaim IS NOT NULL

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.domclaim

    ORDER BY
        autonomy_concessions DESC;
`,


// =====================================================
// Independence Concession Events by Claim
// =====================================================

independenceConcessions: `
    SELECT

        mo.domclaim,

        SUM(
            CASE
                WHEN mo.indcon = 1
                THEN 1
                ELSE 0
            END
        ) AS independence_concessions

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        mo.domclaim IS NOT NULL

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.domclaim

    ORDER BY
        independence_concessions DESC;
`,


// =====================================================
// Unique Movements Receiving At Least One Concession
// =====================================================

concessionMovements: `
    SELECT

        COUNT(
            DISTINCT CASE
                WHEN mo.con = 1
                THEN mo.group_id
            END
        ) AS total_movements

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE 1 = 1

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        );
`,


// =====================================================
// Unique Movements Receiving Concessions by Claim
// =====================================================

concessionMovementsByClaim: `
    SELECT

        mo.domclaim,

        COUNT(
            DISTINCT CASE
                WHEN mo.con = 1
                THEN mo.group_id
            END
        ) AS movements

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        mo.domclaim IS NOT NULL

        /* Country filter */
        AND (
            ? = ''
            OR c.country_id = ?
        )

        /* Region filter */
        AND (
            ? = ''
            OR eg.region = ?
        )

        /* Year filter */
        AND (
            ? = ''
            OR mo.year = ?
        )

        /* Claim filter */
        AND (
            ? = ''
            OR mo.domclaim = ?
        )

    GROUP BY
        mo.domclaim

    ORDER BY
        movements DESC;
`,


// =====================================================
// Chi-Square
// Kept independent from dashboard filters
// =====================================================

concessionsChiSquare: `
    SELECT

        mo.domclaim,

        mo.con

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        mo.domclaim IS NOT NULL
        AND mo.con IS NOT NULL;
`,


   // =====================================================
// BQ6 Restrictions
// =====================================================


// =====================================================
// Total Restrictions
// =====================================================

restrictions: `
    SELECT
        SUM(
            CASE
                WHEN mo.res = 1 THEN 1
                ELSE 0
            END
        ) AS restrictions

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        (? = '' OR c.country_id = ?)
        AND (? = '' OR eg.region = ?)
        AND (? = '' OR mo.year = ?)
        AND (? = '' OR mo.domclaim = ?);
`,


// =====================================================
// Cultural Restrictions
// =====================================================

culturalRestrictions: `
    SELECT
        SUM(
            CASE
                WHEN mo.cultres = 1 THEN 1
                ELSE 0
            END
        ) AS cultural_restrictions

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        (? = '' OR c.country_id = ?)
        AND (? = '' OR eg.region = ?)
        AND (? = '' OR mo.year = ?)
        AND (? = '' OR mo.domclaim = ?);
`,


// =====================================================
// Autonomy Restrictions
// =====================================================

autonomyRestrictions: `
    SELECT
        SUM(
            CASE
                WHEN mo.autres = 1 THEN 1
                ELSE 0
            END
        ) AS autonomy_restrictions

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        (? = '' OR c.country_id = ?)
        AND (? = '' OR eg.region = ?)
        AND (? = '' OR mo.year = ?)
        AND (? = '' OR mo.domclaim = ?);
`,


// =====================================================
// Independence Restrictions
// =====================================================

independenceRestrictions: `
    SELECT
        SUM(
            CASE
                WHEN mo.indres = 1 THEN 1
                ELSE 0
            END
        ) AS independence_restrictions

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        (? = '' OR c.country_id = ?)
        AND (? = '' OR eg.region = ?)
        AND (? = '' OR mo.year = ?)
        AND (? = '' OR mo.domclaim = ?);
`,


// =====================================================
// Distinct Restriction Movements
// =====================================================

restrictionMovements: `
    SELECT
        COUNT(
            DISTINCT CASE
                WHEN mo.res = 1
                THEN mo.group_id
            END
        ) AS total_movements

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        (? = '' OR c.country_id = ?)

        AND (? = '' OR eg.region = ?)

        AND (? = '' OR mo.year = ?)

        AND (? = '' OR mo.domclaim = ?);
`,


// =====================================================
// Restriction Movements By Claim
// =====================================================

restrictionMovementsByClaim: `
    SELECT
        mo.domclaim,

        COUNT(
            DISTINCT CASE
                WHEN mo.res = 1
                THEN mo.group_id
            END
        ) AS total_movements

    FROM movement_observations mo

    JOIN ethnic_groups eg
        ON mo.group_id = eg.group_id

    JOIN countries c
        ON eg.country_id = c.country_id

    WHERE
        mo.domclaim IS NOT NULL
        AND mo.res IS NOT NULL

        AND (? = '' OR c.country_id = ?)
        AND (? = '' OR eg.region = ?)
        AND (? = '' OR mo.year = ?)
        AND (? = '' OR mo.domclaim = ?)

    GROUP BY mo.domclaim

    ORDER BY total_movements DESC;
`,


// =====================================================
// BQ6 Chi-Square
// =====================================================

restrictionsChiSquare: `
    SELECT
        mo.domclaim,
        mo.res

    FROM movement_observations mo

    WHERE
        mo.domclaim IS NOT NULL
        AND mo.res IS NOT NULL;
`,
   // =====================================================
// BQ7
// Group Characteristics
// =====================================================


// -----------------------------------------------------
// Group Size
// Returns one record per group_id
// Uses the latest observation within the selected filters
// -----------------------------------------------------

groupSize: `
    WITH latest_observation AS (

        SELECT
            mo.group_id,
            mo.group_size,
            mo.year,

            ROW_NUMBER() OVER (
                PARTITION BY mo.group_id
                ORDER BY mo.year DESC
            ) AS rn

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE
            (? = '' OR c.country_id = ?)

            AND (? = '' OR eg.region = ?)

            AND (? = '' OR mo.year = ?)

            AND (? = '' OR mo.domclaim = ?)
    )

    SELECT
        eg.group_id,
        eg.group_name,
        lo.group_size

    FROM ethnic_groups eg

    JOIN latest_observation lo
        ON eg.group_id = lo.group_id

    WHERE
        lo.rn = 1

    ORDER BY
        lo.group_size DESC;
`,


// -----------------------------------------------------
// Geographic Concentration
// Uses latest observation for each group
// -----------------------------------------------------

geographicConcentration: `
    WITH latest_observation AS (

        SELECT
            mo.group_id,
            mo.group_con,
            mo.year,

            ROW_NUMBER() OVER (
                PARTITION BY mo.group_id
                ORDER BY mo.year DESC
            ) AS rn

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE
            (? = '' OR c.country_id = ?)

            AND (? = '' OR eg.region = ?)

            AND (? = '' OR mo.year = ?)

            AND (? = '' OR mo.domclaim = ?)
    )

    SELECT
        lo.group_con,

        COUNT(DISTINCT lo.group_id) AS total_groups

    FROM latest_observation lo

    WHERE
        lo.rn = 1

        AND lo.group_con IS NOT NULL

    GROUP BY
        lo.group_con

    ORDER BY
        lo.group_con;
`,


// -----------------------------------------------------
// Political Power Participation
// Uses latest observation for each group
// -----------------------------------------------------

powerParticipation: `
    WITH latest_observation AS (

        SELECT
            mo.group_id,
            mo.pwrstat,
            mo.year,

            ROW_NUMBER() OVER (
                PARTITION BY mo.group_id
                ORDER BY mo.year DESC
            ) AS rn

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE
            (? = '' OR c.country_id = ?)

            AND (? = '' OR eg.region = ?)

            AND (? = '' OR mo.year = ?)

            AND (? = '' OR mo.domclaim = ?)
    )

    SELECT
        lo.pwrstat,

        COUNT(DISTINCT lo.group_id) AS total_groups

    FROM latest_observation lo

    WHERE
        lo.rn = 1

        AND lo.pwrstat IS NOT NULL

    GROUP BY
        lo.pwrstat

    ORDER BY
        lo.pwrstat;
`,



// ============================================================
// GLOBE COUNTRIES
// ============================================================

globeCountries: `
    SELECT DISTINCT 
        c.country_id,
        c.country_name
    FROM countries c
    ORDER BY c.country_name;
`,


// ============================================================
// COUNTRY SUMMARY
// ============================================================

countrySummaryQuery: `
WITH first_observation AS (

    SELECT
        mo.group_id,
        mo.violsd,

        ROW_NUMBER() OVER (
            PARTITION BY mo.group_id
            ORDER BY mo.year ASC
        ) AS rn

    FROM movement_observations mo
)

SELECT

    c.country_name,

    GROUP_CONCAT(
        DISTINCT eg.group_name
        ORDER BY eg.group_name
        SEPARATOR ', '
    ) AS ethnic_groups,

    COUNT(
        DISTINCT eg.group_id
    ) AS total_sdms,

    COUNT(
        DISTINCT CASE
            WHEN mo.sovdec = 1
            THEN mo.group_id
        END
    ) AS sovereignty_count,

    COUNT(
        DISTINCT CASE
            WHEN mo.violsd = 1
            THEN mo.group_id
        END
    ) AS violent_count,

    COUNT(
        DISTINCT CASE
            WHEN fo.rn = 1
             AND fo.violsd = 1
            THEN fo.group_id
        END
    ) AS started_violent_count,

    COUNT(
        DISTINCT CASE
            WHEN fo_latest.rn = 1
             AND fo_latest.violsd = 0
            THEN fo_latest.group_id
        END
    ) AS remained_peaceful_count,

    COUNT(
        DISTINCT CASE
            WHEN mo.con = 1
            THEN mo.group_id
        END
    ) AS concessions_count,

    COUNT(
        DISTINCT CASE
            WHEN mo.res = 1
            THEN mo.group_id
        END
    ) AS restrictions_count

FROM countries c

LEFT JOIN ethnic_groups eg
    ON c.country_id = eg.country_id

LEFT JOIN movement_observations mo
    ON eg.group_id = mo.group_id

LEFT JOIN first_observation fo
    ON eg.group_id = fo.group_id
    AND fo.rn = 1

LEFT JOIN (

    SELECT
        mo.group_id,
        mo.violsd,

        ROW_NUMBER() OVER (
            PARTITION BY mo.group_id
            ORDER BY mo.year DESC
        ) AS rn

    FROM movement_observations mo

) fo_latest

    ON eg.group_id = fo_latest.group_id
    AND fo_latest.rn = 1

WHERE c.country_name = ?

GROUP BY
    c.country_id,
    c.country_name;
`,


// ============================================================
// COUNTRY MOVEMENTS
// ============================================================

countryMovementsQuery: `
WITH movement_claims AS (

    SELECT
        group_id,

        GROUP_CONCAT(
            DISTINCT domclaim
            ORDER BY domclaim
            SEPARATOR ', '
        ) AS claim_types

    FROM movement_observations

    WHERE domclaim IS NOT NULL

    GROUP BY group_id
),


first_observation AS (

    SELECT
        mo.group_id,
        mo.violsd,

        ROW_NUMBER() OVER (
            PARTITION BY mo.group_id
            ORDER BY mo.year ASC
        ) AS rn

    FROM movement_observations mo
),


latest_observation AS (

    SELECT
        mo.group_id,
        mo.group_size,
        mo.group_con,
        mo.pwrstat,
        mo.sovdec,
        mo.violsd,
        mo.violsd_onset,
        mo.con,
        mo.res,
        mo.sdm_startdate1,
        mo.sdm_enddate1,
        mo.year,

        ROW_NUMBER() OVER (
            PARTITION BY mo.group_id
            ORDER BY mo.year DESC
        ) AS rn

    FROM movement_observations mo
)


SELECT

    eg.group_id,

    eg.group_name,

    eg.region,

    mc.claim_types,

    lo.group_size AS group_size,

    lo.group_con AS group_concentration,

    lo.pwrstat AS power_status,


    /* --------------------------------------------
       Sovereignty
    -------------------------------------------- */

    CASE

        WHEN EXISTS (

            SELECT 1

            FROM movement_observations x

            WHERE x.group_id = eg.group_id
              AND x.sovdec = 1

        )

        THEN 1

        ELSE 0

    END AS sovereignty_declared,


    /* --------------------------------------------
       Experienced violence
    -------------------------------------------- */

    CASE

        WHEN EXISTS (

            SELECT 1

            FROM movement_observations x

            WHERE x.group_id = eg.group_id
              AND x.violsd = 1

        )

        THEN 1

        ELSE 0

    END AS experienced_violence,


    /* --------------------------------------------
       Started violence
    -------------------------------------------- */

    CASE

        WHEN fo.rn = 1
         AND fo.violsd = 1

        THEN 1

        ELSE 0

    END AS started_violence,


    /* --------------------------------------------
       Latest peaceful status
    -------------------------------------------- */

    CASE

        WHEN lo.violsd = 0

        THEN 1

        ELSE 0

    END AS remained_peaceful,


    /* --------------------------------------------
       Concession
    -------------------------------------------- */

    CASE

        WHEN EXISTS (

            SELECT 1

            FROM movement_observations x

            WHERE x.group_id = eg.group_id
              AND x.con = 1

        )

        THEN 1

        ELSE 0

    END AS received_concession,


    /* --------------------------------------------
       Restriction
    -------------------------------------------- */

    CASE

        WHEN EXISTS (

            SELECT 1

            FROM movement_observations x

            WHERE x.group_id = eg.group_id
              AND x.res = 1

        )

        THEN 1

        ELSE 0

    END AS faced_restriction,


    /* --------------------------------------------
       Start year
    -------------------------------------------- */

    (
        SELECT MIN(x.sdm_startdate1)

        FROM movement_observations x

        WHERE x.group_id = eg.group_id

    ) AS start_year,


    /* --------------------------------------------
       End year / current status
    -------------------------------------------- */

    CASE

        WHEN lo.sdm_enddate1 = 9999
            THEN 2020

        WHEN lo.sdm_enddate1 = 8888
            THEN NULL

        ELSE lo.sdm_enddate1

    END AS end_year


FROM countries c

INNER JOIN ethnic_groups eg
    ON c.country_id = eg.country_id

INNER JOIN first_observation fo
    ON eg.group_id = fo.group_id
    AND fo.rn = 1

INNER JOIN latest_observation lo
    ON eg.group_id = lo.group_id
    AND lo.rn = 1

LEFT JOIN movement_claims mc
    ON eg.group_id = mc.group_id

WHERE c.country_name = ?

ORDER BY start_year ASC;
`,

   compareCountries: `
WITH first_observation AS (
    SELECT
        mo.group_id,
        mo.violsd,
        ROW_NUMBER() OVER (
            PARTITION BY mo.group_id
            ORDER BY mo.year ASC
        ) AS rn
    FROM movement_observations mo
),

latest_observation AS (
    SELECT
        mo.group_id,
        mo.violsd,
        ROW_NUMBER() OVER (
            PARTITION BY mo.group_id
            ORDER BY mo.year DESC
        ) AS rn
    FROM movement_observations mo
)

SELECT
    c.country_id,
    c.country_name,

    COUNT(DISTINCT eg.group_id) AS total_movements,

    COUNT(
        DISTINCT CASE
            WHEN mo.sovdec = 1
            THEN mo.group_id
        END
    ) AS sovereignty_movements,

    COUNT(
        DISTINCT CASE
            WHEN mo.violsd = 1
            THEN mo.group_id
        END
    ) AS experienced_violence,

    COUNT(
        DISTINCT CASE
            WHEN fo.rn = 1
             AND fo.violsd = 1
            THEN fo.group_id
        END
    ) AS started_violence,

    COUNT(
        DISTINCT CASE
            WHEN lo.rn = 1
             AND lo.violsd = 0
            THEN lo.group_id
        END
    ) AS latest_peaceful_movements,

    COUNT(
        DISTINCT CASE
            WHEN mo.con = 1
            THEN mo.group_id
        END
    ) AS concession_movements,

    COUNT(
        DISTINCT CASE
            WHEN mo.res = 1
            THEN mo.group_id
        END
    ) AS restriction_movements

FROM countries c

JOIN ethnic_groups eg
    ON c.country_id = eg.country_id

JOIN movement_observations mo
    ON eg.group_id = mo.group_id

LEFT JOIN first_observation fo
    ON eg.group_id = fo.group_id
    AND fo.rn = 1

LEFT JOIN latest_observation lo
    ON eg.group_id = lo.group_id
    AND lo.rn = 1

WHERE c.country_id IN (?, ?)

GROUP BY
    c.country_id,
    c.country_name

ORDER BY
    c.country_name;
`,


 // ============================================================
 // REGION SUMMARY
 // ============================================================

 regionSummary: `
 WITH ranked_observations AS (
     SELECT
         mo.*,
         ROW_NUMBER() OVER (
             PARTITION BY mo.group_id
             ORDER BY mo.year ASC
         ) AS first_rn,
         ROW_NUMBER() OVER (
             PARTITION BY mo.group_id
             ORDER BY mo.year DESC
         ) AS latest_rn
     FROM movement_observations mo
 ),

 movement_metrics AS (
     SELECT
         group_id,

         /* Use the region recorded in the latest observation */
         MAX(CASE WHEN latest_rn = 1 THEN region END) AS region,

         MAX(CASE WHEN sovdec = 1 THEN 1 ELSE 0 END)
             AS sovereignty_declared,

         MAX(CASE WHEN violsd = 1 THEN 1 ELSE 0 END)
             AS experienced_violence,

         MAX(CASE
             WHEN first_rn = 1 AND violsd = 1
             THEN 1 ELSE 0
         END) AS started_violent,

         MAX(CASE
             WHEN latest_rn = 1 AND violsd = 0
             THEN 1 ELSE 0
         END) AS latest_nonviolent,

         MAX(CASE WHEN con = 1 THEN 1 ELSE 0 END)
             AS received_concession,

         MAX(CASE WHEN res = 1 THEN 1 ELSE 0 END)
             AS faced_restriction,

         MAX(CASE
             WHEN latest_rn = 1 THEN groupcon
         END) AS groupcon,

         MAX(CASE
             WHEN latest_rn = 1 THEN pwrstat
         END) AS pwrstat

     FROM ranked_observations
     GROUP BY group_id
 )

 SELECT
     region,

     COUNT(DISTINCT group_id) AS total_movements,

     SUM(sovereignty_declared) AS sovereignty_movements,
     SUM(experienced_violence) AS experienced_violence,
     SUM(started_violent) AS started_violent,
     SUM(latest_nonviolent) AS latest_nonviolent,
     SUM(received_concession) AS concession_movements,
     SUM(faced_restriction) AS restriction_movements,

     SUM(CASE WHEN groupcon = 1 THEN 1 ELSE 0 END)
         AS concentrated_movements,

     SUM(CASE WHEN groupcon = 0 THEN 1 ELSE 0 END)
         AS non_concentrated_movements,

     ROUND(
         100.0 * SUM(CASE WHEN groupcon = 1 THEN 1 ELSE 0 END)
         / NULLIF(COUNT(DISTINCT group_id), 0),
         1
     ) AS concentrated_percentage,

     ROUND(
         100.0 * SUM(CASE WHEN groupcon = 0 THEN 1 ELSE 0 END)
         / NULLIF(COUNT(DISTINCT group_id), 0),
         1
     ) AS non_concentrated_percentage

 FROM movement_metrics
 WHERE region IS NOT NULL
   AND TRIM(region) <> ''
 GROUP BY region
 ORDER BY region;
 `,


 // ============================================================
 // REGION POWER STATUS DISTRIBUTION
 // ============================================================

 regionPowerStatus: `
 WITH ranked_observations AS (
     SELECT
         mo.group_id,
         mo.region,
         mo.pwrstat,
         ROW_NUMBER() OVER (
             PARTITION BY mo.group_id
             ORDER BY mo.year DESC
         ) AS rn
     FROM movement_observations mo
 )

 SELECT
     region,
     pwrstat,
     COUNT(DISTINCT group_id) AS movement_count

 FROM ranked_observations
 WHERE rn = 1
   AND region IS NOT NULL
   AND TRIM(region) <> ''
   AND pwrstat IS NOT NULL
 GROUP BY region, pwrstat
 ORDER BY region, pwrstat;
 `,

 
compareRegions: `
WITH ranked_observations AS (
    SELECT
        mo.*,
        ROW_NUMBER() OVER (
            PARTITION BY mo.group_id
            ORDER BY mo.year ASC
        ) AS first_rn,
        ROW_NUMBER() OVER (
            PARTITION BY mo.group_id
            ORDER BY mo.year DESC
        ) AS latest_rn
    FROM movement_observations mo
),

movement_metrics AS (
    SELECT
        group_id,

        MAX(
            CASE WHEN latest_rn = 1 THEN region END
        ) AS region,

        MAX(CASE WHEN sovdec = 1 THEN 1 ELSE 0 END)
            AS sovereignty_movements,

        MAX(CASE WHEN violsd = 1 THEN 1 ELSE 0 END)
            AS experienced_violence,

        MAX(
            CASE
                WHEN first_rn = 1 AND violsd = 1
                THEN 1 ELSE 0
            END
        ) AS started_violent,

        MAX(
            CASE
                WHEN latest_rn = 1 AND violsd = 0
                THEN 1 ELSE 0
            END
        ) AS latest_nonviolent,

        MAX(CASE WHEN con = 1 THEN 1 ELSE 0 END)
            AS concession_movements,

        MAX(CASE WHEN res = 1 THEN 1 ELSE 0 END)
            AS restriction_movements,

        MAX(
            CASE WHEN latest_rn = 1 THEN groupcon END
        ) AS groupcon,

        MAX(
            CASE WHEN latest_rn = 1 THEN pwrstat END
        ) AS pwrstat

    FROM ranked_observations
    GROUP BY group_id
),

selected_regions AS (
    SELECT *
    FROM movement_metrics
    WHERE region IN (?, ?)
)

SELECT
    region,

    COUNT(DISTINCT group_id) AS total_movements,

    SUM(sovereignty_movements)
        AS sovereignty_movements,

    SUM(experienced_violence)
        AS experienced_violence,

    SUM(started_violent)
        AS started_violent,

    SUM(latest_nonviolent)
        AS latest_nonviolent,

    SUM(concession_movements)
        AS concession_movements,

    SUM(restriction_movements)
        AS restriction_movements,

    SUM(
        CASE WHEN groupcon = 1 THEN 1 ELSE 0 END
    ) AS concentrated_movements,

    SUM(
        CASE WHEN groupcon = 0 THEN 1 ELSE 0 END
    ) AS non_concentrated_movements,

    ROUND(
        100.0 * SUM(
            CASE WHEN groupcon = 1 THEN 1 ELSE 0 END
        ) / NULLIF(COUNT(DISTINCT group_id), 0),
        1
    ) AS concentrated_percentage,

    ROUND(
        100.0 * SUM(
            CASE WHEN groupcon = 0 THEN 1 ELSE 0 END
        ) / NULLIF(COUNT(DISTINCT group_id), 0),
        1
    ) AS non_concentrated_percentage

FROM selected_regions
GROUP BY region
ORDER BY region;
`,

};


module.exports = queries;