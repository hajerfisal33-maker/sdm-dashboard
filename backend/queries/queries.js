
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

            COUNT(*) AS sovereignty_declarations

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE
            mo.sovdec = 1

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            );
    `,


    declarationByClaim: `
        SELECT

            mo.domclaim,

            COUNT(*) AS declarations

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE
            mo.sovdec = 1

            AND mo.domclaim IS NOT NULL

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            )

        GROUP BY
            mo.domclaim

        ORDER BY
            declarations DESC;
    `,


    declarationChiSquare: `
        SELECT

            mo.domclaim,

            mo.sovdec

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE
            mo.domclaim IS NOT NULL

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            );
    `,


    // =====================================================
    // BQ4
    // Violence
    // =====================================================

    violentMovements: `
        SELECT

            mo.violsd,

            COUNT(*) AS total

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE

            (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            )

        GROUP BY
            mo.violsd;
    `,


    violentEscalation: `
        SELECT

            mo.viol_escal,

            COUNT(*) AS total

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE

            mo.viol_escal IS NOT NULL

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            )

        GROUP BY
            mo.viol_escal;
    `,


    // -----------------------------------------------------
    // Movements that started directly with violence
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

            END AS violsd_onset,

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

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR fo.year >= ?
            )

            AND (
                ? IS NULL
                OR fo.year <= ?
            )

        GROUP BY

            CASE

                WHEN fo.violsd = 1

                    THEN 1

                ELSE 0

            END

        ORDER BY
            violsd_onset;
    `,


    // =====================================================
    // BQ5
    // Concessions
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

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            )

        GROUP BY
            mo.domclaim;
    `,


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

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            )

        GROUP BY
            mo.domclaim;
    `,


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

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            )

        GROUP BY
            mo.domclaim;
    `,


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

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            )

        GROUP BY
            mo.domclaim;
    `,


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

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            );
    `,


    // =====================================================
    // BQ6
    // Restrictions
    // =====================================================

    restrictions: `
        SELECT

            SUM(
                CASE

                    WHEN mo.res = 1

                        THEN 1

                    ELSE 0

                END
            ) AS restrictions

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE

            (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            );
    `,


    culturalRestrictions: `
        SELECT

            SUM(
                CASE

                    WHEN mo.cultres = 1

                        THEN 1

                    ELSE 0

                END
            ) AS cultural_restrictions

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE

            (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            );
    `,


    autonomyRestrictions: `
        SELECT

            SUM(
                CASE

                    WHEN mo.autres = 1

                        THEN 1

                    ELSE 0

                END
            ) AS autonomy_restrictions

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE

            (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            );
    `,


    independenceRestrictions: `
        SELECT

            SUM(
                CASE

                    WHEN mo.indres = 1

                        THEN 1

                    ELSE 0

                END
            ) AS independence_restrictions

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE

            (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            );
    `,


    restrictionsChiSquare: `
        SELECT

            mo.domclaim,

            mo.res

        FROM movement_observations mo

        JOIN ethnic_groups eg
            ON mo.group_id = eg.group_id

        JOIN countries c
            ON eg.country_id = c.country_id

        WHERE

            mo.domclaim IS NOT NULL

            AND (
                ? IS NULL
                OR eg.region = ?
            )

            AND (
                ? IS NULL
                OR c.country_name = ?
            )

            AND (
                ? IS NULL
                OR mo.year >= ?
            )

            AND (
                ? IS NULL
                OR mo.year <= ?
            );
    `,


    // =====================================================
    // BQ7
    // Group Characteristics
    // =====================================================


    // -----------------------------------------------------
    // Group Size
    // Returns one record per group_id
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

                (
                    ? IS NULL
                    OR eg.region = ?
                )

                AND (
                    ? IS NULL
                    OR c.country_name = ?
                )

                AND (
                    ? IS NULL
                    OR mo.year >= ?
                )

                AND (
                    ? IS NULL
                    OR mo.year <= ?
                )

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

                (
                    ? IS NULL
                    OR eg.region = ?
                )

                AND (
                    ? IS NULL
                    OR c.country_name = ?
                )

                AND (
                    ? IS NULL
                    OR mo.year >= ?
                )

                AND (
                    ? IS NULL
                    OR mo.year <= ?
                )

        )

        SELECT

            lo.group_con,

            COUNT(
                DISTINCT lo.group_id
            ) AS total_groups

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

                (
                    ? IS NULL
                    OR eg.region = ?
                )

                AND (
                    ? IS NULL
                    OR c.country_name = ?
                )

                AND (
                    ? IS NULL
                    OR mo.year >= ?
                )

                AND (
                    ? IS NULL
                    OR mo.year <= ?
                )

        )

        SELECT

            lo.pwrstat,

            COUNT(
                DISTINCT lo.group_id
            ) AS total_groups

        FROM latest_observation lo

        WHERE

            lo.rn = 1

            AND lo.pwrstat IS NOT NULL

        GROUP BY
            lo.pwrstat

        ORDER BY
            lo.pwrstat;
    `,


    // =====================================================
    // COMPARISON
    // Countries or Regions
    // =====================================================

    compareEntities: `
        WITH

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

                mo.violsd,

                ROW_NUMBER() OVER (

                    PARTITION BY mo.group_id

                    ORDER BY mo.year DESC

                ) AS rn

            FROM movement_observations mo

        )


        SELECT

            CASE

                WHEN ? = 'country'

                    THEN c.country_name

                WHEN ? = 'region'

                    THEN eg.region

            END AS entity_name,


            COUNT(
                DISTINCT eg.group_id
            ) AS total_movements,


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


            SUM(
                CASE

                    WHEN mo.con = 1

                        THEN 1

                    ELSE 0

                END
            ) AS total_concessions,


            SUM(
                CASE

                    WHEN mo.res = 1

                        THEN 1

                    ELSE 0

                END
            ) AS total_restrictions


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


        WHERE

            (

                (
                    ? = 'country'

                    AND c.country_name IN (?, ?)

                )

                OR

                (

                    ? = 'region'

                    AND eg.region IN (?, ?)

                )

            )


            AND (
                ? IS NULL
                OR mo.year >= ?
            )


            AND (
                ? IS NULL
                OR mo.year <= ?
            )


        GROUP BY

            CASE

                WHEN ? = 'country'

                    THEN c.country_name

                WHEN ? = 'region'

                    THEN eg.region

            END


        ORDER BY
            entity_name;
    `

};


module.exports = queries;