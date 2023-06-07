import React from "react";
import LayoutRoutes from "../Utilities/LayoutRoutes.js";

const tasksList = [
  {
    title: "Test 1",
    dir: "Test",
    description: "This is the description for this task.",
    date: "2022-14-08",
    status: "false",
    important: false,
    id: "dY7aN",
  },
  {
    title: "Test 2",
    dir: "TestTest",
    description: "This is the description for this task.",
    date: "2022-15-08",
    status: "true",
    important: false,
    id: "hYsk8",
  },
  {
    title: "Test 3",
    dir: "TestTestTest",
    description: "This is the description for this task.",
    date: "2022-15-08",
    status: "true",
    important: false,
    id: "hd5aS",
  },
];

const Home = () => (
  <LayoutRoutes title="All tasks" tasks={tasksList} />
);

export default Home;