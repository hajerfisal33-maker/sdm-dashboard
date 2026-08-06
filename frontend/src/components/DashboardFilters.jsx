import { useEffect, useState } from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import api from "../services/api";

function DashboardFilters({ filters, setFilters }) {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [claims, setClaims] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    loadFilters();
  }, []);

  async function loadFilters() {
    try {
      const countryRes = await api.get("/filters/countries");
      const regionRes = await api.get("/filters/regions");
      const claimRes = await api.get("/filters/claims");
      const yearRes = await api.get("/filters/years");

      setCountries(countryRes.data);
      setRegions(regionRes.data);
      setClaims(claimRes.data);
      setYears(yearRes.data);
    } catch (error) {
      console.error("Failed to load dashboard filters", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <Card className="shadow-sm border-0 rounded-4 mb-4 p-3 bg-white">
      <h5 className="fw-bold mb-3">
        Filter Dashboard
      </h5>

      <Row className="g-3">

        <Col md={3}>
          <Form.Group>
            <Form.Label>Country</Form.Label>

            <Form.Select
              name="country"
              value={filters.country}
              onChange={handleChange}
            >
              <option value="">All Countries</option>

              {countries.map(country => (
                <option
                  key={country.country_id}
                  value={country.country_id}
                >
                  {country.country_name}
                </option>
              ))}

            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Region</Form.Label>

            <Form.Select
              name="region"
              value={filters.region}
              onChange={handleChange}
            >
              <option value="">All Regions</option>

              {regions.map((region, index) => (
                <option
                  key={index}
                  value={region.region}
                >
                  {region.region}
                </option>
              ))}

            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Claim Type</Form.Label>

            <Form.Select
              name="claim"
              value={filters.claim}
              onChange={handleChange}
            >
              <option value="">All Claims</option>

              {claims.map((claim, index) => (
                <option
                  key={index}
                  value={claim.domclaim}
                >
                  {claim.domclaim}
                </option>
              ))}

            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Year</Form.Label>

            <Form.Select
              name="year"
              value={filters.year}
              onChange={handleChange}
            >
              <option value="">All Years</option>

              {years.map((year, index) => (
                <option
                  key={index}
                  value={year.year}
                >
                  {year.year}
                </option>
              ))}

            </Form.Select>
          </Form.Group>
        </Col>

      </Row>
    </Card>
  );
}

export default DashboardFilters;