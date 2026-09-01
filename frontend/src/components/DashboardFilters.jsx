import { useEffect, useState } from "react";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
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

      const [
        countryRes,
        regionRes,
        claimRes,
        yearRes
      ] = await Promise.all([
        api.get("/filters/countries"),
        api.get("/filters/regions"),
        api.get("/filters/claims"),
        api.get("/filters/years")
      ]);

      setCountries(countryRes.data || []);
      setRegions(regionRes.data || []);
      setClaims(claimRes.data || []);
      setYears(yearRes.data || []);

    } catch (error) {

      console.error(
        "Failed to load dashboard filters",
        error
      );

    }

  }


  function handleChange(e) {

    const { name, value } = e.target;

    setFilters(prev => ({
      ...prev,
      [name]: value
    }));

  }


  function clearFilters() {

    setFilters({
      country: "",
      region: "",
      claim: "",
      year: ""
    });

  }


  return (

    <Card className="dashboard-filters shadow-sm border-0 rounded-4 mb-4 p-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <div>

          <h5 className="fw-bold mb-1">
            Dashboard Filters
          </h5>

          <small className="text-muted">
            Filter the dashboard results by country, region, claim type, or year.
          </small>

        </div>


        <Button
          variant="outline-secondary"
          size="sm"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>

      </div>


      <Row className="g-3">


        {/* Country */}

        <Col xs={12} sm={6} lg={3}>

          <Form.Group>

            <Form.Label>
              Country
            </Form.Label>


            <Form.Select
              name="country"
              value={filters.country || ""}
              onChange={handleChange}
            >

              <option value="">
                All Countries
              </option>


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



        {/* Region */}

        <Col xs={12} sm={6} lg={3}>

          <Form.Group>

            <Form.Label>
              Region
            </Form.Label>


            <Form.Select
              name="region"
              value={filters.region || ""}
              onChange={handleChange}
            >

              <option value="">
                All Regions
              </option>


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



        {/* Claim Type */}

        <Col xs={12} sm={6} lg={3}>

          <Form.Group>

            <Form.Label>
              Claim Type
            </Form.Label>


            <Form.Select
              name="claim"
              value={filters.claim || ""}
              onChange={handleChange}
            >

              <option value="">
                All Claims
              </option>


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



        {/* Year */}

        <Col xs={12} sm={6} lg={3}>

          <Form.Group>

            <Form.Label>
              Year
            </Form.Label>


            <Form.Select
              name="year"
              value={filters.year || ""}
              onChange={handleChange}
            >

              <option value="">
                All Years
              </option>


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