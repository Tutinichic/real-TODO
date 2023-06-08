import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSearchQuery from "../hooks/useSearchQuery";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currQueryParam, setCurrQueryParam] = useState("");

  useEffect(() => {
    const query = searchParams.get("q");
    if (!query) {
      navigate("/");
    } else {
      setCurrQueryParam(query);
    }
  }, [navigate, searchParams]);

  const matchedTasks = useSearchQuery(currQueryParam);

  return (
    <LayoutRoutes
      title={`Results for "${currQueryParam}"`}
      tasks={matchedTasks}
    ></LayoutRoutes>
  );
};

export default SearchResults;
