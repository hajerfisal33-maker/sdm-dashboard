
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
  Button,
  Form,
  Table,
} from "react-bootstrap";

const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://sdm-dashboard-pe46.onrender.com/api/v1";

const REGIONS = [
  "Central Asia",
  "Europe",
  "Latin America",
  "M East & N Africa",
  "N America",
  "Oceania",
  "SE Asia",
  "SS Africa",
];

const REGION_POSITIONS = {
  "Central Asia": { x: 65, y: 39 },
  Europe: { x: 51, y: 30 },
  "Latin America": { x: 32, y: 63 },
  "M East & N Africa": { x: 57, y: 48 },
  "N America": { x: 24, y: 35 },
  Oceania: { x: 82, y: 73 },
  "SE Asia": { x: 75, y: 56 },
  "SS Africa": { x: 52, y: 69 },
};

const COLORS = {
  navy: "#10254a",
  blue: "#2563eb",
  green: "#16a085",
  orange: "#f59e0b",
  red: "#e45757",
  purple: "#7c3aed",
  text: "#344054",
  muted: "#667085",
  border: "#e7edf5",
  background: "#f4f7fb",
};

const api = axios.create({
  baseURL: API_BASE,
});

function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString()
    : String(value);
}

function percent(value, total) {
  const n = Number(value);
  const t = Number(total);

  if (!Number.isFinite(n) || !Number.isFinite(t) || t <= 0) {
    return 0;
  }

  return Math.round((n / t) * 100);
}

/*
  The API aliases below match the supplied SQL queries.
*/

function normalizeSummaryRow(row) {
  return {
    region: row.region ?? "",
    movements: Number(row.total_movements) || 0,
    sovereignty: Number(row.sovereignty_movements) || 0,
    violent: Number(row.experienced_violence) || 0,
    startedViolent: Number(row.started_violent) || 0,
    latestNonviolent: Number(row.latest_nonviolent) || 0,
    concessions: Number(row.concession_movements) || 0,
    restrictions: Number(row.restriction_movements) || 0,
    concentrated: Number(row.concentrated_movements) || 0,
    nonConcentrated: Number(row.non_concentrated_movements) || 0,
    concentratedPercentage:
      Number(row.concentrated_percentage) || 0,
    nonConcentratedPercentage:
      Number(row.non_concentrated_percentage) || 0,
    raw: row,
  };
}

function normalizeComparisonRow(row) {
  return {
    region: row.region ?? "",
    movements: Number(row.total_movements) || 0,
    sovereignty: Number(row.sovereignty_movements) || 0,
    violent: Number(row.experienced_violence) || 0,
    startedViolent: Number(row.started_violent) || 0,
    latestNonviolent: Number(row.latest_nonviolent) || 0,
    concessions: Number(row.concession_movements) || 0,
    restrictions: Number(row.restriction_movements) || 0,
    concentrated: Number(row.concentrated_movements) || 0,
    nonConcentrated: Number(row.non_concentrated_movements) || 0,
    concentratedPercentage:
      Number(row.concentrated_percentage) || 0,
    nonConcentratedPercentage:
      Number(row.non_concentrated_percentage) || 0,
    raw: row,
  };
}

function MetricCard({ title, value, icon, color, note }) {
  return (
    <Card
      className="h-100 border-0"
      style={{
        borderRadius: 18,
        boxShadow: "0 5px 22px rgba(16,37,74,0.06)",
      }}
    >
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div
              style={{
                color: COLORS.muted,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {title}
            </div>

            <div
              style={{
                color: COLORS.navy,
                fontSize: 28,
                fontWeight: 800,
                marginTop: 8,
              }}
            >
              {formatNumber(value)}
            </div>
          </div>

          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: `${color}18`,
              color,
              display: "grid",
              placeItems: "center",
              fontSize: 21,
            }}
          >
            {icon}
          </div>
        </div>

        {note && (
          <div
            style={{
              color: "#98a2b3",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            {note}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

function RegionMarker({
  name,
  position,
  active,
  available,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!available}
      title={
        available
          ? `View ${name}`
          : `${name}: no matching region row returned`
      }
      aria-label={`Select ${name}`}
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        border: 0,
        background: "transparent",
        padding: 5,
        cursor: available ? "pointer" : "not-allowed",
        opacity: available ? 1 : 0.35,
        zIndex: 5,
      }}
    >
      <span
        style={{
          display: "block",
          width: active ? 22 : 15,
          height: active ? 22 : 15,
          borderRadius: "50%",
          background: active ? COLORS.red : COLORS.orange,
          border: "3px solid white",
          boxShadow: active
            ? "0 0 0 7px rgba(228,87,87,0.22)"
            : "0 0 0 4px rgba(245,158,11,0.20)",
          transition: "all 0.2s ease",
        }}
      />

      {active && (
        <span
          style={{
            display: "block",
            marginTop: 7,
            whiteSpace: "nowrap",
            padding: "5px 9px",
            borderRadius: 8,
            color: "#fff",
            background: "rgba(16,37,74,0.94)",
            fontSize: 11,
            fontWeight: 700,
            boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
          }}
        >
          {name}
        </span>
      )}
    </button>
  );
}

function InteractiveGlobe({
  availableRegions,
  selectedRegion,
  onSelectRegion,
}) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 440,
        borderRadius: 20,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 40%, #e4f4ff 0%, #f2f8ff 45%, #eaf1fc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "90%",
          height: "55%",
          border: "1px solid rgba(37,99,235,0.14)",
          borderRadius: "50%",
          transform: "rotate(-20deg)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "90%",
          height: "55%",
          border: "1px solid rgba(37,99,235,0.12)",
          borderRadius: "50%",
          transform: "rotate(28deg)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "min(82%, 390px)",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 30% 25%, #63d1f4 0%, #168aad 34%, #1261a0 68%, #09264f 100%)",
          boxShadow:
            "inset -28px -24px 45px rgba(0,10,35,0.45), inset 12px 10px 24px rgba(255,255,255,0.3), 0 25px 55px rgba(15,55,110,0.24)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "repeating-linear-gradient(to bottom, transparent 0%, transparent 19%, rgba(255,255,255,0.19) 20%, transparent 21%, transparent 39%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "0 15%",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            borderRight: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            transform: "rotateY(35deg)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Simplified illustrative land shapes */}
        {[
          {
            left: "8%",
            top: "18%",
            width: "31%",
            height: "29%",
            clipPath:
              "polygon(5% 20%, 30% 0%, 80% 8%, 100% 35%, 75% 55%, 60% 70%, 45% 100%, 25% 72%, 0% 48%)",
            rotate: "-18deg",
          },
          {
            left: "34%",
            top: "47%",
            width: "17%",
            height: "39%",
            clipPath:
              "polygon(20% 0%, 90% 12%, 100% 45%, 70% 60%, 50% 100%, 28% 75%, 0% 40%)",
            rotate: "-13deg",
          },
          {
            left: "46%",
            top: "26%",
            width: "19%",
            height: "17%",
            clipPath:
              "polygon(0% 25%, 32% 0%, 75% 8%, 100% 45%, 70% 75%, 45% 100%, 20% 68%)",
          },
          {
            left: "47%",
            top: "40%",
            width: "23%",
            height: "38%",
            clipPath:
              "polygon(20% 0%, 80% 8%, 100% 35%, 70% 60%, 50% 100%, 28% 75%, 0% 30%)",
          },
          {
            left: "59%",
            top: "20%",
            width: "36%",
            height: "35%",
            clipPath:
              "polygon(0% 15%, 40% 0%, 80% 12%, 100% 45%, 75% 60%, 50% 55%, 40% 100%, 18% 65%)",
          },
          {
            left: "73%",
            top: "62%",
            width: "23%",
            height: "19%",
            clipPath:
              "polygon(10% 25%, 45% 0%, 100% 30%, 85% 75%, 45% 100%, 0% 65%)",
          },
        ].map((shape, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: shape.left,
              top: shape.top,
              width: shape.width,
              height: shape.height,
              background: "#8bd3a7",
              clipPath: shape.clipPath,
              transform: shape.rotate
                ? `rotate(${shape.rotate})`
                : undefined,
              zIndex: 1,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.32), transparent 35%, transparent 68%, rgba(0,0,0,0.25))",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {REGIONS.map((region) => (
          <RegionMarker
            key={region}
            name={region}
            position={REGION_POSITIONS[region]}
            active={selectedRegion === region}
            available={availableRegions.includes(region)}
            onClick={() => onSelectRegion(region)}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 15,
          left: 15,
          right: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          color: COLORS.muted,
          fontSize: 12,
          textAlign: "center",
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: COLORS.orange,
          }}
        />
        Click a region marker to view its information
      </div>
    </div>
  );
}

function RegionDetails({ region }) {
  if (!region) {
    return (
      <Alert variant="info">
        Select a region to view its details.
      </Alert>
    );
  }

  const metrics = [
    {
      title: "Recorded movements",
      value: region.movements,
      icon: "📊",
      color: COLORS.blue,
      note: "Distinct movements recorded in this region",
    },
    {
      title: "Experienced violence",
      value: region.violent,
      icon: "⚡",
      color: COLORS.red,
      note: "Movements with a violence indicator",
    },
    {
      title: "Sovereignty declarations",
      value: region.sovereignty,
      icon: "🏛️",
      color: COLORS.purple,
      note: "Movements with a sovereignty declaration",
    },
    {
      title: "Government concessions",
      value: region.concessions,
      icon: "🤝",
      color: COLORS.green,
      note: "Movements with a concession indicator",
    },
    {
      title: "Restrictions",
      value: region.restrictions,
      icon: "📋",
      color: COLORS.orange,
      note: "Movements with a restriction indicator",
    },
    {
      title: "Started violently",
      value: region.startedViolent,
      icon: "🔥",
      color: COLORS.red,
      note: "Violence indicator in the first observation",
    },
    {
      title: "Latest nonviolent status",
      value: region.latestNonviolent,
      icon: "🕊️",
      color: COLORS.green,
      note: "Latest observation has violsd = 0",
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.4,
              color: COLORS.muted,
            }}
          >
            SELECTED REGION
          </div>

          <h2
            style={{
              marginTop: 7,
              fontWeight: 800,
              color: COLORS.navy,
              fontSize: 26,
            }}
          >
            {region.region}
          </h2>
        </div>

        <Badge bg="primary" className="p-2">
          Region
        </Badge>
      </div>

      <Row className="g-3">
        {metrics.map((metric) => (
          <Col xs={12} sm={6} key={metric.title}>
            <MetricCard {...metric} />
          </Col>
        ))}
      </Row>

      <Card
        className="border-0 mt-4"
        style={{
          borderRadius: 18,
          background: "#f7f9fc",
        }}
      >
        <Card.Body>
          <h6
            style={{
              color: COLORS.navy,
              fontWeight: 800,
            }}
          >
            Group concentration
          </h6>

          <div className="d-flex justify-content-between mb-2">
            <span>Concentrated movements</span>
            <strong>{formatNumber(region.concentrated)}</strong>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>Non-concentrated movements</span>
            <strong>{formatNumber(region.nonConcentrated)}</strong>
          </div>

          <div className="d-flex justify-content-between">
            <span>Concentrated percentage</span>
            <strong>{region.concentratedPercentage}%</strong>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span>Non-concentrated percentage</span>
            <strong>{region.nonConcentratedPercentage}%</strong>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

function ComparisonBar({
  label,
  value1,
  value2,
  name1,
  name2,
}) {
  const max = Math.max(
    Number(value1) || 0,
    Number(value2) || 0,
    1
  );

  const width1 = ((Number(value1) || 0) / max) * 100;
  const width2 = ((Number(value2) || 0) / max) * 100;

  return (
    <div className="mb-4">
      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: COLORS.text,
          marginBottom: 12,
        }}
      >
        {label}
      </div>

      {[
        {
          name: name1,
          value: value1,
          width: width1,
          color: COLORS.blue,
        },
        {
          name: name2,
          value: value2,
          width: width2,
          color: COLORS.green,
        },
      ].map((item) => (
        <div className="mb-3" key={item.name}>
          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: 12, color: COLORS.muted }}>
              {item.name}
            </span>

            <strong style={{ fontSize: 12 }}>
              {formatNumber(item.value)}
            </strong>
          </div>

          <div
            style={{
              height: 10,
              background: "#e9eef6",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${item.width}%`,
                borderRadius: 20,
                background: item.color,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RegionComparison() {
  const [summaryRows, setSummaryRows] = useState([]);
  const [powerRows, setPowerRows] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");

  const [comparisonRows, setComparisonRows] = useState([]);

  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);

  const [error, setError] = useState("");
  const [compareError, setCompareError] = useState("");

  /*
    Load the region summary and power-status data.
    These endpoints match the supplied backend routes.
  */
  useEffect(() => {
  let active = true;

  async function loadRegionalData() {
    setLoading(true);
    setError("");

    try {
      const [summaryResponse, powerResponse] =
        await Promise.all([
          api.get("/regions/summary"),
          api.get("/regions/power-status"),
        ]);

      console.log(
        "SUMMARY RESPONSE STATUS:",
        summaryResponse.status
      );

      console.log(
        "SUMMARY RESPONSE DATA:",
        summaryResponse.data
      );

      console.log(
        "POWER RESPONSE STATUS:",
        powerResponse.status
      );

      console.log(
        "POWER RESPONSE DATA:",
        powerResponse.data
      );

      const summaryData = Array.isArray(summaryResponse.data)
        ? summaryResponse.data
        : summaryResponse.data?.data;

      const powerData = Array.isArray(powerResponse.data)
        ? powerResponse.data
        : powerResponse.data?.data;

      if (!Array.isArray(summaryData)) {
  console.error(
    "SUMMARY RAW RESPONSE:",
    summaryResponse.data
  );

  throw new Error(
    `Region summary did not return an array. Received: ${
      typeof summaryResponse.data === "string"
        ? summaryResponse.data.slice(0, 300)
        : JSON.stringify(summaryResponse.data)
    }`
  );
}

if (!Array.isArray(powerData)) {
  console.error(
    "POWER RAW RESPONSE:",
    powerResponse.data
  );

  throw new Error(
    `Region power-status did not return an array. Received: ${
      typeof powerResponse.data === "string"
        ? powerResponse.data.slice(0, 300)
        : JSON.stringify(powerResponse.data)
    }`
  );
}      if (!active) return;

      const normalized = summaryData.map(normalizeSummaryRow);

      setSummaryRows(normalized);
      setPowerRows(powerData);

      const returnedRegions = normalized
        .map((item) => item.region)
        .filter(Boolean);

      const validRegions = REGIONS.filter((region) =>
        returnedRegions.includes(region)
      );

      setSelectedRegion(validRegions[0] || "");
      setRegion1(validRegions[0] || "");
      setRegion2(validRegions[1] || "");

    } catch (err) {
      console.error("REGION PAGE ERROR:", err);

      if (active) {
        setError(
          err.response?.data?.error ||
          err.message ||
          "Failed to load regional data."
        );
      }

    } finally {
      if (active) {
        setLoading(false);
      }
    }
  }

  loadRegionalData();

  return () => {
    active = false;
  };
}, []);

  const availableRegions = useMemo(
    () =>
      summaryRows
        .map((item) => item.region)
        .filter(Boolean),
    [summaryRows]
  );

  const selected = useMemo(
    () =>
      summaryRows.find(
        (item) => item.region === selectedRegion
      ),
    [summaryRows, selectedRegion]
  );

  const totalMovements = useMemo(
    () =>
      summaryRows.reduce(
        (sum, item) => sum + item.movements,
        0
      ),
    [summaryRows]
  );

  const selectedMovementShare = percent(
    selected?.movements,
    totalMovements
  );

  const selectedPowerRows = useMemo(
    () =>
      powerRows.filter(
        (item) => item.region === selectedRegion
      ),
    [powerRows, selectedRegion]
  );

  const compare1 = useMemo(
    () =>
      comparisonRows.find(
        (item) => item.region === region1
      ),
    [comparisonRows, region1]
  );

  const compare2 = useMemo(
    () =>
      comparisonRows.find(
        (item) => item.region === region2
      ),
    [comparisonRows, region2]
  );

  /*
    Request comparison data from the backend.
    The backend route is /compare/regions.
  */
  async function handleCompare() {
    setCompareError("");
    setComparisonRows([]);

    if (!region1 || !region2) {
      setCompareError("Please select two regions.");
      return;
    }

    if (region1 === region2) {
      setCompareError(
        "Please select two different regions."
      );
      return;
    }

    setComparing(true);

    try {
      const response = await api.get("/compare/regions", {
        params: {
          region1,
          region2,
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data;

      if (!Array.isArray(data)) {
        throw new Error(
          "The compare-regions API did not return an array."
        );
      }

      setComparisonRows(data.map(normalizeComparisonRow));
    } catch (err) {
      setCompareError(
        err.response?.data?.error ||
          err.message ||
          "Could not compare the selected regions."
      );
    } finally {
      setComparing(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        color: COLORS.text,
      }}
    >
      <Container className="py-5">
        {/* Page header */}
        <div
          className="text-center mb-5"
          style={{
            maxWidth: 800,
            marginInline: "auto",
          }}
        >
          <Badge
            bg="primary"
            className="mb-3"
            style={{
              padding: "9px 15px",
              borderRadius: 30,
              letterSpacing: 1.3,
              fontSize: 11,
            }}
          >
            REGIONAL COMPARISON
          </Badge>

          <h1
            style={{
              color: COLORS.navy,
              fontWeight: 850,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: -1,
            }}
          >
            Compare regions
          </h1>

          <p
            style={{
              color: COLORS.muted,
              lineHeight: 1.8,
              marginTop: 15,
              fontSize: 15,
            }}
          >
            Explore self-determination movement patterns
            across the SDM 2.0 regions. Select a region on
            the globe to view its information, or choose
            two regions to compare their indicators.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div
            className="text-center py-5"
            style={{ color: COLORS.muted }}
          >
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading regional data...</p>
          </div>
        )}

        {/* Main data-loading error */}
        {error && !loading && (
          <Alert variant="danger">
            <strong>Could not load regional data.</strong>
            <div>{error}</div>
          </Alert>
        )}

        {!loading && !error && (
          <>
            {/* Summary cards */}
            <Row className="g-3 mb-4">
              <Col xs={12} md={4}>
                <MetricCard
                  title="Available regions"
                  value={availableRegions.length}
                  icon="🌍"
                  color={COLORS.blue}
                  note="Regions returned by the summary API"
                />
              </Col>

              <Col xs={12} md={4}>
                <MetricCard
                  title="Total movements"
                  value={totalMovements}
                  icon="📊"
                  color={COLORS.green}
                  note="Sum of regional movement counts"
                />
              </Col>

              <Col xs={12} md={4}>
                <MetricCard
                  title="Selected region share"
                  value={`${selectedMovementShare}%`}
                  icon="📍"
                  color={COLORS.purple}
                  note={selectedRegion || "No region selected"}
                />
              </Col>
            </Row>

            {availableRegions.length === 0 && (
              <Alert variant="warning">
                No region names were returned by the summary API.
              </Alert>
            )}

            <Row className="g-4">
              {/* Interactive globe */}
              <Col xs={12} lg={7}>
                <Card
                  className="h-100 border-0"
                  style={{
                    borderRadius: 22,
                    boxShadow:
                      "0 5px 25px rgba(16,37,74,0.06)",
                  }}
                >
                  <Card.Body className="p-3 p-md-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <div
                          style={{
                            color: COLORS.muted,
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: 1.4,
                          }}
                        >
                          INTERACTIVE GLOBE
                        </div>

                        <h2
                          style={{
                            color: COLORS.navy,
                            fontSize: 21,
                            fontWeight: 800,
                            marginTop: 5,
                          }}
                        >
                          Explore regions
                        </h2>
                      </div>

                      <Badge bg="light" text="dark">
                        Click a marker
                      </Badge>
                    </div>

                    <InteractiveGlobe
                      availableRegions={availableRegions}
                      selectedRegion={selectedRegion}
                      onSelectRegion={setSelectedRegion}
                    />

                    <div className="mt-4">
                      <div
                        style={{
                          fontWeight: 750,
                          fontSize: 13,
                          marginBottom: 12,
                          color: COLORS.text,
                        }}
                      >
                        Select a region
                      </div>

                      <div className="d-flex flex-wrap gap-2">
                        {REGIONS.map((region) => {
                          const available =
                            availableRegions.includes(region);

                          return (
                            <Button
                              key={region}
                              size="sm"
                              disabled={!available}
                              variant={
                                selectedRegion === region
                                  ? "primary"
                                  : "outline-secondary"
                              }
                              onClick={() =>
                                setSelectedRegion(region)
                              }
                              style={{
                                borderRadius: 30,
                                padding: "7px 13px",
                                fontSize: 12,
                              }}
                            >
                              {region}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Selected region details */}
              <Col xs={12} lg={5}>
                <Card
                  className="h-100 border-0"
                  style={{
                    borderRadius: 22,
                    boxShadow:
                      "0 5px 25px rgba(16,37,74,0.06)",
                  }}
                >
                  <Card.Body className="p-3 p-md-4">
                    <RegionDetails region={selected} />

                    {/* Power status */}
                    <div
                      className="mt-4 p-3"
                      style={{
                        background: "#f7f9fc",
                        borderRadius: 15,
                      }}
                    >
                      <div
                        style={{
                          color: COLORS.navy,
                          fontWeight: 800,
                          fontSize: 14,
                          marginBottom: 12,
                        }}
                      >
                        Power-status records
                      </div>

                      {selectedPowerRows.length === 0 ? (
                        <p
                          style={{
                            color: COLORS.muted,
                            fontSize: 12,
                            marginBottom: 0,
                          }}
                        >
                          No power-status records were returned
                          for this region.
                        </p>
                      ) : (
                        selectedPowerRows.map((item, index) => (
                          <div
                            key={`${item.pwrstat}-${index}`}
                            className="d-flex justify-content-between align-items-center py-2"
                            style={{
                              borderBottom:
                                index ===
                                selectedPowerRows.length - 1
                                  ? "none"
                                  : `1px solid ${COLORS.border}`,
                              fontSize: 12,
                            }}
                          >
                            <span>
                              {item.pwrstat ?? "Not specified"}
                            </span>

                            <strong>
                              {formatNumber(item.movement_count)}
                            </strong>
                          </div>
                        ))
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Region comparison */}
            <Card
              className="border-0 mt-4"
              style={{
                borderRadius: 22,
                boxShadow:
                  "0 5px 25px rgba(16,37,74,0.06)",
              }}
            >
              <Card.Body className="p-3 p-md-4">
                <div
                  style={{
                    color: COLORS.muted,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.4,
                  }}
                >
                  SIDE-BY-SIDE ANALYSIS
                </div>

                <h2
                  style={{
                    color: COLORS.navy,
                    fontSize: 23,
                    fontWeight: 800,
                    marginTop: 7,
                  }}
                >
                  Compare two regions
                </h2>

                <p
                  style={{
                    color: COLORS.muted,
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  Choose two different regions to compare
                  the indicators returned by the SDM database.
                </p>

                <Row className="g-3 align-items-end">
                  <Col xs={12} md={5}>
                    <Form.Label className="fw-semibold">
                      First region
                    </Form.Label>

                    <Form.Select
                      value={region1}
                      onChange={(event) =>
                        setRegion1(event.target.value)
                      }
                    >
                      <option value="">Choose region</option>

                      {REGIONS.filter((region) =>
                        availableRegions.includes(region)
                      ).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col xs={12} md={5}>
                    <Form.Label className="fw-semibold">
                      Second region
                    </Form.Label>

                    <Form.Select
                      value={region2}
                      onChange={(event) =>
                        setRegion2(event.target.value)
                      }
                    >
                      <option value="">Choose region</option>

                      {REGIONS.filter((region) =>
                        availableRegions.includes(region)
                      ).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col xs={12} md={2}>
                    <Button
                      className="w-100"
                      onClick={handleCompare}
                      disabled={comparing}
                      style={{
                        borderRadius: 10,
                        fontWeight: 700,
                        minHeight: 42,
                      }}
                    >
                      {comparing ? (
                        <>
                          <Spinner
                            size="sm"
                            animation="border"
                            className="me-2"
                          />
                          Loading
                        </>
                      ) : (
                        "Compare"
                      )}
                    </Button>
                  </Col>
                </Row>

                {compareError && (
                  <Alert
                    variant="danger"
                    className="mt-3 mb-0"
                  >
                    {compareError}
                  </Alert>
                )}

                {comparisonRows.length > 0 &&
                  compare1 &&
                  compare2 && (
                    <div className="mt-4">
                      <div className="d-flex flex-wrap gap-2 mb-4">
                        <Badge
                          bg="primary"
                          className="p-2"
                        >
                          {region1}
                        </Badge>

                        <span style={{ color: COLORS.muted }}>
                          vs.
                        </span>

                        <Badge
                          bg="success"
                          className="p-2"
                        >
                          {region2}
                        </Badge>
                      </div>

                      <ComparisonBar
                        label="Recorded movements"
                        value1={compare1.movements}
                        value2={compare2.movements}
                        name1={region1}
                        name2={region2}
                      />

                      <ComparisonBar
                        label="Experienced violence"
                        value1={compare1.violent}
                        value2={compare2.violent}
                        name1={region1}
                        name2={region2}
                      />

                      <ComparisonBar
                        label="Started violently"
                        value1={compare1.startedViolent}
                        value2={compare2.startedViolent}
                        name1={region1}
                        name2={region2}
                      />

                      <ComparisonBar
                        label="Latest nonviolent status"
                        value1={compare1.latestNonviolent}
                        value2={compare2.latestNonviolent}
                        name1={region1}
                        name2={region2}
                      />

                      <ComparisonBar
                        label="Sovereignty declarations"
                        value1={compare1.sovereignty}
                        value2={compare2.sovereignty}
                        name1={region1}
                        name2={region2}
                      />

                      <ComparisonBar
                        label="Government concessions"
                        value1={compare1.concessions}
                        value2={compare2.concessions}
                        name1={region1}
                        name2={region2}
                      />

                      <ComparisonBar
                        label="Restrictions"
                        value1={compare1.restrictions}
                        value2={compare2.restrictions}
                        name1={region1}
                        name2={region2}
                      />

                      <ComparisonBar
                        label="Concentrated movements"
                        value1={compare1.concentrated}
                        value2={compare2.concentrated}
                        name1={region1}
                        name2={region2}
                      />

                      <ComparisonBar
                        label="Non-concentrated movements"
                        value1={compare1.nonConcentrated}
                        value2={compare2.nonConcentrated}
                        name1={region1}
                        name2={region2}
                      />

                      {/* Comparison table */}
                      <div className="table-responsive mt-4">
                        <Table
                          bordered
                          hover
                          responsive
                          className="align-middle mb-0"
                        >
                          <thead className="table-light">
                            <tr>
                              <th>Indicator</th>
                              <th>{region1}</th>
                              <th>{region2}</th>
                            </tr>
                          </thead>

                          <tbody>
                            {[
                              [
                                "Movements",
                                compare1.movements,
                                compare2.movements,
                              ],
                              [
                                "Experienced violence",
                                compare1.violent,
                                compare2.violent,
                              ],
                              [
                                "Started violently",
                                compare1.startedViolent,
                                compare2.startedViolent,
                              ],
                              [
                                "Latest nonviolent status",
                                compare1.latestNonviolent,
                                compare2.latestNonviolent,
                              ],
                              [
                                "Sovereignty declarations",
                                compare1.sovereignty,
                                compare2.sovereignty,
                              ],
                              [
                                "Government concessions",
                                compare1.concessions,
                                compare2.concessions,
                              ],
                              [
                                "Restrictions",
                                compare1.restrictions,
                                compare2.restrictions,
                              ],
                              [
                                "Concentrated movements",
                                compare1.concentrated,
                                compare2.concentrated,
                              ],
                              [
                                "Non-concentrated movements",
                                compare1.nonConcentrated,
                                compare2.nonConcentrated,
                              ],
                              [
                                "Concentrated percentage",
                                `${compare1.concentratedPercentage}%`,
                                `${compare2.concentratedPercentage}%`,
                              ],
                              [
                                "Non-concentrated percentage",
                                `${compare1.nonConcentratedPercentage}%`,
                                `${compare2.nonConcentratedPercentage}%`,
                              ],
                            ].map(([label, value1, value2]) => (
                              <tr key={label}>
                                <td>{label}</td>
                                <td>{formatNumber(value1)}</td>
                                <td>{formatNumber(value2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )}
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
}

export default RegionComparison;
