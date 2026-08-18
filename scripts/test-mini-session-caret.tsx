import assert from "node:assert/strict";
import test, { afterEach } from "node:test";
import { JSDOM } from "jsdom";
import type { CampaignEditorState } from "../src/components/features/admin-mini-sessions/types";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/admin/media",
});

Object.defineProperties(globalThis, {
  window: { value: dom.window },
  document: { value: dom.window.document },
  navigator: { value: dom.window.navigator },
  HTMLElement: { value: dom.window.HTMLElement },
  HTMLInputElement: { value: dom.window.HTMLInputElement },
  HTMLTextAreaElement: { value: dom.window.HTMLTextAreaElement },
  Node: { value: dom.window.Node },
  MutationObserver: { value: dom.window.MutationObserver },
  getComputedStyle: { value: dom.window.getComputedStyle.bind(dom.window) },
  IS_REACT_ACT_ENVIRONMENT: { value: true, writable: true },
});

globalThis.requestAnimationFrame = (callback) =>
  setTimeout(() => callback(performance.now()), 0) as unknown as number;
globalThis.cancelAnimationFrame = (handle) => clearTimeout(handle);

type UserEventInstance = ReturnType<
  (typeof import("@testing-library/user-event"))["default"]["setup"]
>;

let cleanupAfterTest: () => void = () => undefined;

afterEach(() => cleanupAfterTest());

async function renderEditor() {
  const [React, testingLibrary, userEventModule, editorModule, utilsModule] =
    await Promise.all([
      import("react"),
      import("@testing-library/react"),
      import("@testing-library/user-event"),
      import("../src/components/features/admin-mini-sessions/CampaignEditor"),
      import("../src/components/features/admin-mini-sessions/utils"),
    ]);
  const { useState } = React;
  const { CampaignEditor } = editorModule;
  cleanupAfterTest = testingLibrary.cleanup;

  function createEditorState(): CampaignEditorState {
    const draft = utilsModule.createEmptyCampaignDraft();
    return {
      campaignId: "campaign-1",
      sourceStatus: "draft",
      sourceUpdatedAt: "2026-08-18T20:00:00.000Z",
      draft: {
        ...draft,
        headline: "Fall Mini Session",
        summary: "Short summary",
        description: "<p>Experience copy</p>",
        vibeContent: "<p>Vibe copy</p>",
        faqEyebrow: "Good to know",
        faqHeadline: "Mini Session questions.",
        faqIntro: "Everything you need to know.",
        bookingEyebrow: "Reserve your session",
        bookingHeadline: "Choose your time.",
        faqs: [
          {
            id: "faq-1",
            question: "First question",
            answerHtml: "<p>First answer</p>",
            sortOrder: 0,
          },
          {
            id: "faq-2",
            question: "Second question",
            answerHtml: "<p>Second answer</p>",
            sortOrder: 1,
          },
        ],
      },
    };
  }

  function EditorHarness() {
    const [editor, setEditor] = useState(createEditorState);
    return (
      <CampaignEditor
        editor={editor}
        errors={{}}
        isDirty
        isLifecycleMutating={false}
        isSaving={false}
        lifecycleError=""
        lifecycleMessage=""
        lifecycleWarning=""
        message=""
        publishedMedia={[]}
        requestError=""
        stale={null}
        readiness={[]}
        onChange={(update) => setEditor((current) => update(current))}
        onLifecycleAction={async () => false}
        onLoadLatest={() => undefined}
        onSave={() => undefined}
      />
    );
  }

  testingLibrary.render(<EditorHarness />);
  return {
    fireEvent: testingLibrary.fireEvent,
    screen: testingLibrary.screen,
    user: userEventModule.default.setup({ document }),
  };
}

async function typeInTextControl(
  user: UserEventInstance,
  control: HTMLInputElement | HTMLTextAreaElement,
  offset: number,
  text: string
) {
  control.focus();
  control.setSelectionRange(offset, offset);
  await user.type(control, text, { skipClick: true });
}

function setContentEditableCaret(editor: HTMLElement, offset: number) {
  const textNode = editor.querySelector("p")?.firstChild;
  assert.ok(textNode, "expected rich-text content to contain a text node");
  const selection = window.getSelection();
  const range = document.createRange();
  range.setStart(textNode, offset);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

async function typeInRichText(
  user: UserEventInstance,
  editor: HTMLElement,
  offset: number,
  text: string
) {
  editor.focus();
  setContentEditableCaret(editor, offset);
  await user.type(editor, text, { skipClick: true });
}

test("standard inputs and textareas preserve a middle caret during campaign rerenders", async () => {
  const { screen, user } = await renderEditor();
  const headline = screen.getByLabelText(/^Headline/) as HTMLInputElement;
  const summary = screen.getByLabelText(/^Short summary/) as HTMLTextAreaElement;
  const faqHeadline = screen.getByLabelText(/^FAQ section heading/) as HTMLInputElement;
  const faqIntro = screen.getByLabelText(/^FAQ section introduction/) as HTMLTextAreaElement;
  const bookingEyebrow = screen.getByLabelText(/^Small label above calendar/) as HTMLInputElement;
  const bookingHeadline = screen.getByLabelText(/^Booking section heading/) as HTMLInputElement;
  const vibeEyebrow = screen.getByLabelText(/^Small label above Vibe section/) as HTMLInputElement;

  await typeInTextControl(user, headline, 4, "XYZ");
  assert.equal(headline.value, "FallXYZ Mini Session");
  assert.equal(headline.selectionStart, 7);

  await typeInTextControl(user, summary, 5, "XYZ");
  assert.equal(summary.value, "ShortXYZ summary");
  assert.equal(summary.selectionStart, 8);

  await typeInTextControl(user, faqHeadline, 4, "XYZ");
  assert.equal(faqHeadline.value, "MiniXYZ Session questions.");
  assert.equal(faqHeadline.selectionStart, 7);

  await typeInTextControl(user, faqIntro, 10, "XYZ");
  assert.equal(faqIntro.value, "EverythingXYZ you need to know.");
  assert.equal(faqIntro.selectionStart, 13);

  await typeInTextControl(user, bookingEyebrow, 7, "XYZ");
  assert.equal(bookingEyebrow.value, "ReserveXYZ your session");
  assert.equal(bookingEyebrow.selectionStart, 10);

  await typeInTextControl(user, bookingHeadline, 6, "XYZ");
  assert.equal(bookingHeadline.value, "ChooseXYZ your time.");
  assert.equal(bookingHeadline.selectionStart, 9);

  await typeInTextControl(user, vibeEyebrow, 3, "XYZ");
  assert.equal(vibeEyebrow.value, "TheXYZ vibe");
  assert.equal(vibeEyebrow.selectionStart, 6);
});

test("public FAQ section renders campaign-owned intro copy with an accessible heading", async () => {
  const [testingLibrary, faqModule] = await Promise.all([
    import("@testing-library/react"),
    import("../src/components/features/mini-sessions/MiniSessionsFaqs"),
  ]);
  const { MiniSessionsFaqs } = faqModule;
  cleanupAfterTest = testingLibrary.cleanup;
  testingLibrary.render(
    <MiniSessionsFaqs
      eyebrow="Before you arrive"
      headline="Questions for fall families"
      intro="A few helpful details for a relaxed session."
      faqs={[{
        id: "faq-public",
        question: "What should we bring?",
        answerHtml: "<p>Bring yourselves.</p>",
        sortOrder: 0,
      }]}
    />
  );

  const section = testingLibrary.screen.getByRole("region", {
    name: "Questions for fall families",
  });
  assert.ok(section.textContent?.includes("Before you arrive"));
  assert.ok(section.textContent?.includes("A few helpful details for a relaxed session."));
});

test("public booking section renders campaign-owned labels with an accessible heading", async () => {
  const [testingLibrary, bookingModule, utilsModule] = await Promise.all([
    import("@testing-library/react"),
    import("../src/components/features/mini-sessions/MiniSessionsBooking"),
    import("../src/components/features/admin-mini-sessions/utils"),
  ]);
  cleanupAfterTest = testingLibrary.cleanup;
  const draft = utilsModule.createEmptyCampaignDraft();
  draft.bookingEyebrow = "Book your fall session";
  draft.bookingHeadline = "Find a time that works.";
  const campaign = utilsModule.draftToPreviewCampaign(
    {
      campaignId: "campaign-booking-copy",
      sourceStatus: "draft",
      sourceUpdatedAt: null,
      draft,
    },
    []
  );

  testingLibrary.render(
    <bookingModule.MiniSessionsBooking
      campaign={campaign}
      previewMode
      utmParams={{}}
    />
  );

  const section = testingLibrary.screen.getByRole("region", {
    name: "Find a time that works.",
  });
  assert.ok(section.textContent?.includes("Book your fall session"));
});

test("public Vibe section renders its campaign-owned label", async () => {
  const [testingLibrary, pageModule, utilsModule] = await Promise.all([
    import("@testing-library/react"),
    import("../src/components/features/mini-sessions/MiniSessionsPage"),
    import("../src/components/features/admin-mini-sessions/utils"),
  ]);
  cleanupAfterTest = testingLibrary.cleanup;
  const draft = utilsModule.createEmptyCampaignDraft();
  draft.vibeEyebrow = "Come as you are";
  draft.vibeHeadline = "Relax into the moment";
  const campaign = utilsModule.draftToPreviewCampaign(
    {
      campaignId: "campaign-vibe-copy",
      sourceStatus: "draft",
      sourceUpdatedAt: null,
      draft,
    },
    []
  );

  testingLibrary.render(
    <pageModule.MiniSessionsPage campaign={campaign} previewMode utmParams={{}} />
  );

  const section = testingLibrary.screen.getByRole("region", {
    name: "Relax into the moment",
  });
  assert.ok(section.textContent?.includes("Come as you are"));
});

test("FAQ questions update by persistent ID without remounting sibling rows", async () => {
  const { screen, user } = await renderEditor();
  const questions = screen.getAllByLabelText("Question") as HTMLInputElement[];
  const untouchedQuestion = questions[1];

  await typeInTextControl(user, questions[0], questions[0].value.length, " XYZ");
  const updatedQuestions = screen.getAllByLabelText("Question") as HTMLInputElement[];

  assert.equal(updatedQuestions[0].value, "First question XYZ");
  assert.equal(updatedQuestions[0].selectionStart, "First question XYZ".length);
  assert.equal(updatedQuestions[1], untouchedQuestion);
  assert.equal(updatedQuestions[1].value, "Second question");
});

test("Experience, Vibe, and FAQ rich text preserve middle and end carets", async () => {
  const { screen, user } = await renderEditor();
  const experience = screen.getByLabelText("Experience");
  const vibe = screen.getByLabelText("Vibe content");
  const answer = screen.getAllByLabelText("Answer")[0];

  await typeInRichText(user, experience, 4, "XYZ");
  assert.equal(experience.textContent, "ExpeXYZrience copy");
  assert.equal(window.getSelection()?.anchorOffset, 7);

  await typeInRichText(user, vibe, "Vibe copy".length, " XYZ");
  assert.equal(vibe.textContent, "Vibe copy XYZ");
  assert.equal(window.getSelection()?.anchorOffset, "Vibe copy XYZ".length);

  await typeInRichText(user, answer, 5, "XYZ");
  assert.equal(answer.textContent, "FirstXYZ answer");
  assert.equal(window.getSelection()?.anchorOffset, 8);
});

test("rich-text formatting controls keep the active selection in the editor", async () => {
  const { screen, user } = await renderEditor();
  const experience = screen.getByLabelText("Experience");
  const originalNode = experience.querySelector("p")?.firstChild;
  assert.ok(originalNode);
  const commands: string[] = [];
  Object.defineProperty(document, "execCommand", {
    configurable: true,
    value: (command: string) => {
      commands.push(command);
      return true;
    },
  });

  experience.focus();
  setContentEditableCaret(experience, 4);
  for (const label of [
    "Bold",
    "Italic",
    "Underline",
    "Bulleted list",
    "Numbered list",
  ]) {
    await user.click(screen.getAllByLabelText(label)[0]);
    assert.equal(document.activeElement, experience);
    assert.equal(window.getSelection()?.anchorNode, originalNode);
    assert.equal(window.getSelection()?.anchorOffset, 4);
  }

  assert.deepEqual(commands, [
    "bold",
    "italic",
    "underline",
    "insertUnorderedList",
    "insertOrderedList",
  ]);
});

test("rich-text composition updates do not replace the active editable DOM", async () => {
  const { fireEvent, screen, user } = await renderEditor();
  const experience = screen.getByLabelText("Experience");
  const originalNode = experience.querySelector("p")?.firstChild;
  assert.ok(originalNode);

  experience.focus();
  setContentEditableCaret(experience, 4);
  fireEvent.compositionStart(experience);
  await user.type(experience, "語", {
    skipClick: true,
  });
  fireEvent.compositionEnd(experience);

  assert.equal(experience.querySelector("p")?.firstChild, originalNode);
  assert.equal(experience.textContent, "Expe語rience copy");
  assert.equal(document.activeElement, experience);
});
