import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App.js";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Testing", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        tasks: [
          {
            title: "Test 1",
            dir: "Main",
            description: "Test",
            date: "2023-03-06",
            completed: true,
            important: true,
            id: "t1",
          },
          {
            title: "Test 2",
            important: false,
            description: "Test Test Test",
            date: "2322-06-25",
            dir: "Main",
            completed: true,
            id: "t2",
          },
          {
            title: "Test 3",
            dir: "Main",
            description: "TestTestTestTest",
            date: "2022-07-21",
            completed: false,
            important: true,
            id: "t3",
          },
        ],
        directories: ["Main"],
      },
      modal: {
        modalCreateTaskOpen: false,
      },
      menu: {
        menuHeaderOpened: false,
        menuAccountOpened: false,
      },
    });
  });

  it("renders learn react link", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Important tasks")).toBeInTheDocument();
  });
});
