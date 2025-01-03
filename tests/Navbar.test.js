import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GitHubProvider, useGitHub } from "../src/context/GitHubContext";
import Navbar from "../src/components/Navbar ";

// Mock GitHubContext
jest.mock("../src/context/GitHubContext", () => ({
  useGitHub: jest.fn(),
  GitHubProvider: ({ children }) => <div>{children}</div>,
}));

describe("Navbar Component", () => {
  it("renders login button when user is not logged in", () => {
    useGitHub.mockReturnValue({ userLoggedIn: false, logout: jest.fn() });
    render(
      <GitHubProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </GitHubProvider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("renders logout button when user is logged in", () => {
    useGitHub.mockReturnValue({ userLoggedIn: true, logout: jest.fn() });
    render(
      <GitHubProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </GitHubProvider>
    );

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it("logs out user on logout button click", async () => {
    const mockLogout = jest.fn();
    useGitHub.mockReturnValue({ userLoggedIn: true, logout: mockLogout });
    render(
      <GitHubProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </GitHubProvider>
    );

    // Use `act()` to wrap the async code
    await act(async () => {
      fireEvent.click(screen.getByText(/Logout/i));
    });

    expect(mockLogout).toHaveBeenCalled();
  });
});
