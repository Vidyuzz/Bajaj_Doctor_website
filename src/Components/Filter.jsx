import React from "react";

const FilterPanel = ({
  consultType,
  setConsultType,
  specialities = [],
  selectedSpecs,
  setSelectedSpecs,
  sortBy,
  setSortBy,
}) => {
  const consultOptions = ["Video Consult", "In Clinic"];
  const sortOptions = [
    { key: "fees", label: "Fees (Low to High)" },
    { key: "experience", label: "Experience (High to Low)" },
  ];

  const handleSpecClick = (spec) => {
    if (selectedSpecs.includes(spec)) {
      setSelectedSpecs(selectedSpecs.filter((s) => s !== spec));
    } else {
      setSelectedSpecs([...selectedSpecs, spec]);
    }
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3 data-testid="filter-header-moc">Consultation Mode</h3>
        <div className="filter-slider consult-slider">
          {consultOptions.map((mode, i) => {
            const isActive = consultType === mode;
            const testid =
              mode === "Video Consult"
                ? "filter-video-consult"
                : "filter-in-clinic";
            return (
              <div
                key={mode}
                role="button"
                tabIndex={0}
                className={`filter-card color-${i % 6} ${
                  isActive ? "selected" : ""
                }`}
                data-testid={testid}
                onClick={() => setConsultType(mode)}
                onKeyPress={(e) =>
                  e.key === "Enter" && setConsultType(mode)
                }
              >
                <div className="filter-card-header" />
                <div className="filter-card-body">{mode}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-speciality">Speciality</h3>
        <div className="filter-slider speciality-slider">
          {specialities.map((spec, i) => {
            const tidy = spec.replace(/\s+/g, "-").replace(/\//g, "-");
            const isActive = selectedSpecs.includes(spec);
            return (
              <div
                key={spec}
                role="button"
                tabIndex={0}
                className={`filter-card color-${i % 6} ${
                  isActive ? "selected" : ""
                }`}
                data-testid={`filter-specialty-${tidy}`}
                onClick={() => handleSpecClick(spec)}
                onKeyPress={(e) => e.key === "Enter" && handleSpecClick(spec)}
              >
                <div className="filter-card-header" />
                <div className="filter-card-body">{spec}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-sort">Sort</h3>
        <div className="filter-slider sort-slider">
          {sortOptions.map(({ key, label }, i) => {
            const isActive = sortBy === key;
            const testid = key === "fees" ? "sort-fees" : "sort-experience";
            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                className={`filter-card color-${i % 6} ${
                  isActive ? "selected" : ""
                }`}
                data-testid={testid}
                onClick={() => setSortBy(key)}
                onKeyPress={(e) => e.key === "Enter" && setSortBy(key)}
              >
                <div className="filter-card-header" />
                <div className="filter-card-body">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
