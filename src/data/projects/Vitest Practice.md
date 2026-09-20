# React + Vitest Practice

A small playground project for practicing component testing with **Vitest** and
**React Testing Library**. Each component is simple on purpose so the focus
stays on the tests, not the UI.

## What's inside

| Component        | What it does                                            |
| ---------------- | ------------------------------------------------------- |
| `Greeting`       | Renders a greeting, falls back to "World" if no name    |
| `Counter`        | Increments a value via a custom `useCounter` hook       |
| `MathOperations` | Basic calculator with a `<select>` for the operator     |
| `UserProfile`    | Fetches a user from JSONPlaceholder and renders details |

`App` wires them up behind a simple tab switcher.

## Stack

- React + Vite
- Vitest (test runner)
- `@testing-library/react` + `@testing-library/user-event`
- `jsdom` (test environment)

## Scripts

```bash
npm install
npm run dev       # start dev server
npm test          # run tests once
npm run test:watch  # re-run on file changes
```

## What I practiced

- Querying elements the way a user would — `getByRole`, `getByText`,
  `getByTestId` — and knowing when each is appropriate
- Simulating real interactions with `userEvent.setup()` instead of `fireEvent`
- Working with `<select>` elements (`selectOptions` + `getByRole("option")`)
- Testing async behavior: mocking `fetch` and waiting for the profile to load
- Handling edge cases: empty name fallback, invalid input, division by zero
- Scoping queries with `within()` when multiple matching elements exist

## Example test

```jsx
it("multiplies two numbers", async () => {
  const user = userEvent.setup();
  render(<MathOperations />);

  const inputs = screen.getAllByRole("spinbutton");
  await user.clear(inputs[0]);
  await user.type(inputs[0], "6");
  await user.clear(inputs[1]);
  await user.type(inputs[1], "7");

  await user.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: "×" }),
  );

  await user.click(screen.getByRole("button", { name: "=" }));
  expect(screen.getByText(/Result:/)).toHaveTextContent("42");
});
```

## Notes to self

- Call `userEvent.setup()` once per test, right after `render()`
- Prefer role-based queries — they double as accessibility checks
- Pass `advanceTimers: vi.advanceTimersByTime` if using fake timers
- `data-testid` is a last resort, not a first choice
- `act(() => result.current.decrement())` triggers updates to your components

``
Swap in your actual repo name, and trim the "What I practiced" section to whatever you actually covered. If you mocked `fetch`, add a one-liner under "Notes to self" about `vi.mock` or `vi.spyOn(global, "fetch")`.
``
