// @vitest-environment jsdom

import { afterEach, describe, expect, test } from "vitest";
import Doable from "./Doable";
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  vi.resetAllMocks();
  cleanup();
});

describe("Doable", () => {
    
    test("submit", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(<Doable handleSubmit={handleSubmit} />);
        const userData={email: "diana@mail.com", password: "123456"};
        await user.type(screen.getByLabelText(/email/i), userData.email);
        await user.type(screen.getByLabelText(/password/i), userData.password);
        await user.click(screen.getByRole("button", { name: /enter/i }));

        screen.debug();

        expect(handleSubmit).toHaveBeenCalledWith(userData);
        expect(handleSubmit).toHaveBeenCalled(1);
    });
});
   