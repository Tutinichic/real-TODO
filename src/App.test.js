import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { modalActions } from "./store/Modal.store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App.js";
import { renderHook } from "@testing-library/react-hooks";
import { MemoryRouter } from "react-router-dom";
import DarkMode from "./components/AccountSection/DarkMode";
import useCompletedTasks from "./components/hooks/useCompletedTasks";
import useDate from "./components/hooks/useDate";
import useSortTasks from "./components/hooks/useSortTasks";
import useVisibility from "./components/hooks/useVisibility";
import NavLinks from "./components/Menu/NavLinks";
import BtnAddTask from "./components/Utilities/BtnAddTask";
import LayoutMenus from "./components/Utilities/LayoutMenus";
import Modal from "./components/Utilities/Modal";
import ModalConfirm from "./components/Utilities/ModalConfirm";

const mockStore = configureStore([]);
const store = mockStore({});

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node) => node,
  unmountComponentAtNode: (container) => true,
}));

test("renders navigation links correctly", () => {
  // Render the NavLinks component
  render(
    <MemoryRouter initialEntries={["/today"]}>
      <NavLinks classActive="active" />
    </MemoryRouter>
  );

  // Verify that the navigation links are rendered correctly
  const todayLink = screen.getByRole("link", { name: "Today's tasks" });
  const allTasksLink = screen.getByRole("link", { name: "All tasks" });
  const importantTasksLink = screen.getByRole("link", { name: "Important tasks" });
  const tasksDoneLink = screen.getByRole("link", { name: "Tasks done" });
  const upcomingTasksLink = screen.getByRole("link", { name: "Upcoming tasks" });

  expect(todayLink).toHaveClass("active");
  expect(allTasksLink).not.toHaveClass("active");
  expect(importantTasksLink).not.toHaveClass("active");
  expect(tasksDoneLink).not.toHaveClass("active");
  expect(upcomingTasksLink).not.toHaveClass("active");
});

test("updates element visibility correctly", () => {
  const { result } = renderHook(() => useVisibility());

  expect(result.current.elementIsVisible).toBe(false);

  result.current.showElement();
  expect(result.current.elementIsVisible).toBe(true);

  result.current.closeElement();
  expect(result.current.elementIsVisible).toBe(false);
});

describe("useSortTasks", () => {
  test("returns tasks in the original order when sortedBy is empty", () => {
    const tasks = [
      { id: 1, title: "Task 1", date: "2022-01-01" },
      { id: 2, title: "Task 2", date: "2023-01-01" },
      { id: 3, title: "Task 3", date: "2021-01-01" },
    ];

    const { result } = renderHook(() => useSortTasks(tasks));
    const { sortedBy, setSortedBy, sortedTasks } = result.current;

    setSortedBy("");

    expect(sortedBy).toBe("");
    expect(sortedTasks).toEqual(tasks);
  });
});

describe("useDate", () => {
  test("returns formatted date with leading zeros for single-digit month and day", () => {
    const date = "2022-02-05";
    const formattedDate = useDate(date);
    expect(formattedDate).toEqual("02/05/2022");
  });

  test("returns formatted date with maximum year digits", () => {
    const date = "1000-01-01";
    const formattedDate = useDate(date);
    expect(formattedDate).toEqual("01/01/1000");
  });

  test("returns formatted date for different date formats", () => {
    const date1 = "2022-12-25";
    const formattedDate1 = useDate(date1);
    expect(formattedDate1).toEqual("12/25/2022");

    const date2 = "2022/12/25";
    const formattedDate2 = useDate(date2);
    expect(formattedDate2).toEqual("12/25/2022");

    const date3 = "2022-05-10";
    const formattedDate3 = useDate(date3);
    expect(formattedDate3).toEqual("05/10/2022");
  });
});

describe("useCompletedTasks", () => {
  test("returns filtered tasks with completed: true", () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: true },
      { id: 2, title: "Task 2", completed: false },
      { id: 3, title: "Task 3", completed: true },
    ];

    const { result } = renderHook(() => useCompletedTasks({ tasks, done: true }));

    expect(result.current.tasks).toEqual([
      { id: 1, title: "Task 1", completed: true },
      { id: 3, title: "Task 3", completed: true },
    ]);
  });

  test("returns filtered tasks with completed: false", () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: true },
      { id: 2, title: "Task 2", completed: false },
      { id: 3, title: "Task 3", completed: true },
    ];

    const { result } = renderHook(() => useCompletedTasks({ tasks, done: false }));

    expect(result.current.tasks).toEqual([
      { id: 2, title: "Task 2", completed: false },
    ]);
  });

  test("returns an empty array when no tasks are provided", () => {
    const tasks = [];

    const { result } = renderHook(() => useCompletedTasks({ tasks, done: true }));

    expect(result.current.tasks).toEqual([]);
  });

  test("returns an empty array when no tasks match the completion status", () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: false },
    ];

    const { result } = renderHook(() => useCompletedTasks({ tasks, done: true }));

    expect(result.current.tasks).toEqual([]);
  });
});

describe("DarkMode", () => {
  test("renders the component", () => {
    render(<DarkMode />);
  });

  test("toggles dark mode on button click", () => {
    const { getByText } = render(<DarkMode />);
    const darkModeButton = getByText("Darkmode");

    // Initial state is not dark mode
    expect(document.documentElement.classList).not.toContain("dark");

    fireEvent.click(darkModeButton);

    // Dark mode should be enabled
    expect(document.documentElement.classList).toContain("dark");

    fireEvent.click(darkModeButton);

    // Dark mode should be disabled
    expect(document.documentElement.classList).not.toContain("dark");
  });
});

describe("LayoutMenus", () => {
  test("рендерит дочерние элементы", () => {
    render(
      <LayoutMenus menuOpen={true} closeMenuHandler={() => {}} className="custom-class">
        <div>Child Element</div>
      </LayoutMenus>
    );

    const childElement = screen.getByText("Child Element");
    expect(childElement).toBeInTheDocument();
  });

  test("при открытом меню и экране с размером XL показывает меню", () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
    }));

    render(
      <LayoutMenus menuOpen={true} closeMenuHandler={() => {}} className="custom-class">
        <div>Child Element</div>
      </LayoutMenus>
    );

    const menu = screen.getByText("Child Element");
    expect(menu).toBeInTheDocument();
  });
});

describe("Modal", () => {
  test("отображает правильный заголовок", () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Modal onClose={onClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const titleElement = getByText("Test Modal");
    expect(titleElement).toBeInTheDocument();
  });

  test("отображает дочерние элементы", () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Modal onClose={onClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const contentElement = getByText("Modal Content");
    expect(contentElement).toBeInTheDocument();
  });
});

describe("ModalConfirm", () => {
  test("викликає функцію onClose при натисканні на кнопку Cancel", () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <ModalConfirm onClose={onClose} onConfirm={() => {}} text="Test text" />
    );

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });

  test("викликає функцію onConfirm при натисканні на кнопку Confirm", () => {
    const onConfirm = jest.fn();
    const { getByText } = render(
      <ModalConfirm onClose={() => {}} onConfirm={onConfirm} text="Test text" />
    );

    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalled();
  });

  test("відображає переданий текст", () => {
    const text = "Test text";
    const { getByText } = render(
      <ModalConfirm onClose={() => {}} onConfirm={() => {}} text={text} />
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  test("відображає заголовок 'Are you sure?'", () => {
    const { getByText } = render(
      <ModalConfirm onClose={() => {}} onConfirm={() => {}} text="Test text" />
    );

    expect(getByText("Are you sure?")).toBeInTheDocument();
  });
});

describe("BtnAddTask", () => {
  test("відображається текст 'Add task'", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BtnAddTask className="test-btn" />
      </Provider>
    );

    expect(getByText("Add task")).toBeInTheDocument();
  });

  test("викликає дію openModalCreateTask при натисканні на кнопку", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BtnAddTask className="test-btn" />
      </Provider>
    );

    fireEvent.click(getByText("Add task"));

    expect(store.getActions()).toContainEqual(
      modalActions.openModalCreateTask()
    );
  });

  test("має вірний клас, імплементований з пропс className", () => {
    const { container } = render(
      <Provider store={store}>
        <BtnAddTask className="test-btn" />
      </Provider>
    );

    const btn = container.querySelector(".btn.test-btn");

    expect(btn).toBeInTheDocument();
  });

  test("не має вірний клас, якщо пропс className не вказаний", () => {
    const { container } = render(
      <Provider store={store}>
        <BtnAddTask />
      </Provider>
    );

    const btn = container.querySelector(".btn");

    expect(btn).toBeInTheDocument();
    expect(btn.classList.contains("test-btn")).toBeFalsy();
  });

  test("можна натиснути кнопку з клавіатури за допомогою пробілу", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BtnAddTask className="test-btn" />
      </Provider>
    );

    const btn = getByText("Add task");
    fireEvent.keyDown(btn, { key: " ", code: "Space" });
    fireEvent.keyUp(btn, { key: " ", code: "Space" });

    expect(store.getActions()).toContainEqual(
      modalActions.openModalCreateTask()
    );
  });
});

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
