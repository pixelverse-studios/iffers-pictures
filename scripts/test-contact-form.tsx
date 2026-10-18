import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/contact" });
Object.defineProperties(globalThis, {
  window: { value: dom.window }, document: { value: dom.window.document },
  navigator: { value: dom.window.navigator }, HTMLElement: { value: dom.window.HTMLElement },
  HTMLInputElement: { value: dom.window.HTMLInputElement },
  HTMLTextAreaElement: { value: dom.window.HTMLTextAreaElement },
  HTMLAnchorElement: { value: dom.window.HTMLAnchorElement },
  HTMLButtonElement: { value: dom.window.HTMLButtonElement },
  HTMLSelectElement: { value: dom.window.HTMLSelectElement },
  Element: { value: dom.window.Element }, Node: { value: dom.window.Node },
  ShadowRoot: { value: dom.window.ShadowRoot },
  Document: { value: dom.window.Document },
  MutationObserver: { value: dom.window.MutationObserver },
  getComputedStyle: { value: dom.window.getComputedStyle.bind(dom.window) },
  IS_REACT_ACT_ENVIRONMENT: { value: true, writable: true },
});
window.matchMedia = (query) => ({
  matches: false, media: query, onchange: null, addListener() {}, removeListener() {},
  addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; },
});
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
globalThis.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 0) as unknown as number;
globalThis.cancelAnimationFrame = (handle) => clearTimeout(handle);
window.requestAnimationFrame = globalThis.requestAnimationFrame;
window.cancelAnimationFrame = globalThis.cancelAnimationFrame;

test("contact form supports calendar selection, conditional requirements, and clean submission", async () => {
  const React = await import("react");
  const { render, screen, waitFor, cleanup } = await import("@testing-library/react");
  const { default: userEvent } = await import("@testing-library/user-event");
  const { SearchParamsContext } = await import("next/dist/shared/lib/hooks-client-context.shared-runtime");
  const { MantineProvider } = createRequire(import.meta.url)("@mantine/core") as typeof import("@mantine/core");
  const { mantineTheme } = await import("../src/lib/mantine-theme");
  const { ContactForm } = await import("../src/app/contact/ContactForm");
  const user = userEvent.setup();
  const originalFetch = globalThis.fetch;
  let submitted: Record<string, string> | undefined;
  const getSubmission = () => submitted;
  globalThis.fetch = async (_input, init) => {
    submitted = JSON.parse(String(init?.body));
    return new Response("{}", { status: 201 });
  };
  try {
    render(<SearchParamsContext.Provider value={new URLSearchParams("session=events")}><MantineProvider theme={mantineTheme} env="test"><ContactForm /></MantineProvider></SearchParamsContext.Provider>);
    assert.equal((screen.getByRole("combobox", { name: "Session Type" }) as HTMLInputElement).value, "Event Sessions");
    await user.click(screen.getByRole("combobox", { name: "Session Type" }));
    await user.click(screen.getByRole("option", { name: "Custom" }));
    await user.click(screen.getByRole("combobox", { name: "How did you hear about me?" }));
    await user.click(screen.getByRole("option", { name: "Other" }));
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    await screen.findByText("Please briefly describe the custom session you have in mind");
    await screen.findByText("Please tell me how you heard about me");
    await screen.findByText("Event time is required");
    const customMessage = screen.getByRole("textbox", { name: "Tell me about your custom session" });
    assert.equal(customMessage.getAttribute("aria-invalid"), "true");
    assert.ok(customMessage.hasAttribute("data-error"));
    await user.click(screen.getByRole("button", { name: "Event Date" }));
    await screen.findByRole("button", { name: /^1 [A-Za-z]+ \d{4}$/ });
    const days = screen.getAllByRole("button").filter((button) => /^\d{1,2}$/.test(button.textContent ?? "") && !button.hasAttribute("data-outside") && !button.hasAttribute("disabled"));
    assert.ok(days.length > 0, "calendar exposes selectable days");
    await user.click(days[0]);
    await user.type(screen.getByRole("textbox", { name: "First Name" }), "Test");
    await user.type(screen.getByRole("textbox", { name: "Last Name" }), "Visitor");
    await user.type(screen.getByRole("textbox", { name: "Email Address" }), "visitor@example.com");
    await user.type(screen.getByLabelText("Event time hours"), "02");
    await user.type(screen.getByLabelText("Event time minutes"), "00");
    await user.click(screen.getByRole("button", { name: "PM" }));
    await user.type(screen.getByRole("textbox", { name: "Event Location" }), "Bergen County");
    assert.equal(screen.getByRole("textbox", { name: "Tell me about your custom session" }).getAttribute("aria-required"), "true");
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    await screen.findByText("Please briefly describe the custom session you have in mind");
    await screen.findByText("Please tell me how you heard about me");
    assert.equal(submitted, undefined);
    await user.type(screen.getByRole("textbox", { name: "How did you hear about me? Please specify" }), "Venue newsletter");
    await user.click(screen.getByRole("combobox", { name: "How did you hear about me?" }));
    await user.click(screen.getByRole("option", { name: "Google" }));
    assert.equal(screen.queryByRole("textbox", { name: "How did you hear about me? Please specify" }), null);
    await user.type(screen.getByRole("textbox", { name: "Tell me about your custom session" }), "Graduation celebration");
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() => assert.ok(submitted));
    assert.equal(getSubmission()?.eventTime, "14:00");
    assert.equal(getSubmission()?.service, "custom");
    assert.equal(getSubmission()?.message, "Graduation celebration");
    assert.equal(getSubmission()?.referralSource, "Google");
    assert.equal(getSubmission()?.referralSourceOther, undefined);
    assert.match(getSubmission()?.eventDate ?? "", /^\d{4}-\d{2}-\d{2}$/);
    await screen.findByRole("button", { name: "Send Another Message" });
  } finally {
    cleanup();
    globalThis.fetch = originalFetch;
  }
});
