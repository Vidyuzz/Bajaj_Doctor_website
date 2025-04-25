import React, { useEffect, useState } from "react";
import AutocompleteSearch from "./Components/Autocomplete";
import FilterPanel from "./Components/Filter";
import DoctorCard from "./Components/Card";
import { useSearchParams } from "react-router-dom";
import "./style.css";

const API_URL =
  "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [allSpecialities, setAllSpecialities] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [consultType, setConsultType] = useState(
    searchParams.get("mode") || ""
  );
  const [selectedSpecs, setSelectedSpecs] = useState(
    searchParams.getAll("specialty") || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setFilteredDoctors(data);

        const specSet = new Set();
        data.forEach((doc) => {
          let items = Array.isArray(doc.specialities)
            ? doc.specialities.map((s) => (typeof s === "string" ? s : s.name))
            : [doc.specialities].filter(Boolean);

          items.forEach((raw) => {
            const trimmed = raw.trim();
            const lower = trimmed.toLowerCase();

            if (lower === "gynaecologist and obstetrician") {
              specSet.add("gynaecologist");
              specSet.add("obstetrician");
            } else if (lower === "rheumatology") {
              specSet.add("rheumatologist");
            } else {
              specSet.add(lower);
            }
          });
        });

        const cleanedSpecs = Array.from(specSet)
          .map((s) =>
            s
              .replace(/\b\w/g, (char) => char.toUpperCase())
          )
          .sort((a, b) => a.localeCompare(b));

        setAllSpecialities(cleanedSpecs);
      });
  }, []);

  useEffect(() => {
    let list = [...doctors];

    if (search) {
      list = list.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (consultType) {
      list = list.filter((doc) =>
        consultType === "Video Consult" ? doc.video_consult : doc.in_clinic
      );
    }

    if (selectedSpecs.length) {
      list = list.filter((doc) => {
        let docSpecs = [];

        if (Array.isArray(doc.specialities)) {
          docSpecs = doc.specialities
            .map((s) => (typeof s === "string" ? s : s.name).trim())
            .flatMap((name) => {
              if (/\band\b/i.test(name)) {
                return name.split(/\s+and\s+/i).map((n) => n.trim());
              }
              return [name];
            });
        } else if (typeof doc.specialities === "string") {
          docSpecs = [doc.specialities.trim()];
        }

        return selectedSpecs.some((spec) => docSpecs.includes(spec));
      });
    }

    if (sortBy === "fees") {
      list.sort(
        (a, b) =>
          parseInt(a.fees.replace(/\D/g, "")) -
          parseInt(b.fees.replace(/\D/g, ""))
      );
    } else if (sortBy === "experience") {
      list.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    }

    setFilteredDoctors(list);

    const params = {};
    if (search) params.search = search;
    if (consultType) params.mode = consultType;
    if (selectedSpecs.length) params.specialty = selectedSpecs;
    if (sortBy) params.sort = sortBy;
    setSearchParams(params);
  }, [search, consultType, selectedSpecs, sortBy, doctors, setSearchParams]);

  return (
    <div>
      <AutocompleteSearch value={search} onChange={setSearch} doctors={doctors} />

      <FilterPanel
        consultType={consultType}
        setConsultType={setConsultType}
        specialities={allSpecialities}
        selectedSpecs={selectedSpecs}
        setSelectedSpecs={setSelectedSpecs}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="doctor-list">
        {filteredDoctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};

export default App;
