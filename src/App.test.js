import { render, screen } from "@testing-library/react";
import App from "./App";

const formData = {
  numberMobile: "",
  message: "",
  device: "api",
};

describe("App", () => {
  test("renders texts to input data", () => {
    render(<App />);
    expect(screen.getByText("número do celular")).toBeInTheDocument();
    expect(screen.getByText("mensagem")).toBeInTheDocument();
    expect(screen.getByText("web ou desktop")).toBeInTheDocument();
    expect(screen.getByText("mobile ou celular")).toBeInTheDocument();
  });

  test("renders form values", () => {
    render(<App />);
    expect(screen.getByTestId("form-data")).toHaveFormValues({
      numberMobile: "",
      message: "",
      device: "api",
    });
  });

  test("renders buttons to generate link", () => {
    render(<App />);
    const buttonGenerateLink = screen.getByRole("button", {
      id: "buttonGenerateLink",
    });
    expect(buttonGenerateLink).toHaveClass("btn btn-success");
    expect(buttonGenerateLink).toHaveStyle("background-color: #21CC79");
  });

  test("renders input to edit data", () => {
    render(<App />);
    const inputToEditMobile = screen.getByPlaceholderText("1199999999");
    expect(inputToEditMobile).toBeInTheDocument();
    expect(inputToEditMobile).toHaveValue(formData.numberMobile);
    expect(inputToEditMobile).toBeRequired();

    const inputToEditMessage = screen.getByPlaceholderText(
      "Olá, gostaria de entrar em contato..."
    );
    expect(inputToEditMessage).toBeInTheDocument();
    expect(inputToEditMessage).toHaveValue(formData.message);
    expect(inputToEditMessage).not.toBeRequired();
  });

  test("renders radio to web or api", () => {
    render(<App />);
    const radioWeb = screen.getAllByRole("radio")[0];
    expect(radioWeb).toBeInTheDocument();
    expect(radioWeb).toHaveClass("form-check-input");
    expect(radioWeb).toHaveAttribute("value", "web");

    const radioApi = screen.getAllByRole("radio")[1];
    expect(radioApi).toBeInTheDocument();
    expect(radioApi).toHaveClass("form-check-input");
    expect(radioApi).toHaveAttribute("value", "api");
  });
});
