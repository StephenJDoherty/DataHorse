import "@testing-library/jest-dom";

import { rerender, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../pages/App";

function newApp() {
  return <App />;
}

export async function setupApp() {
  await act(async () => {
    const renderResult = await render(newApp());
    rerender = renderResult.rerender;
  });
}
