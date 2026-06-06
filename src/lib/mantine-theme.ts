import {
  createTheme,
  NumberInput,
  Select,
  Textarea,
  TextInput,
  type MantineThemeOverride,
} from "@mantine/core";

const fieldStyles = {
  label: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.4,
    marginBottom: "0.5rem",
  },
  required: {
    color: "var(--accent)",
    marginLeft: "0.25rem",
  },
  input: {
    minHeight: "3rem",
    borderRadius: "0.5rem",
    fontFamily: "var(--font-nunito), system-ui, sans-serif",
    fontSize: "1rem",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  },
  error: {
    fontSize: "0.875rem",
    marginTop: "0.375rem",
  },
  description: {
    fontSize: "0.875rem",
    marginTop: "0.375rem",
  },
};

const fieldClassNames = {
  label: "mantine-field-label",
  input: "mantine-field-input",
  error: "mantine-field-error",
  description: "mantine-field-description",
};

export const mantineTheme: MantineThemeOverride = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#f0f6fb",
      "#dce9f3",
      "#bdd5e8",
      "#98b4cc",
      "#7898b8",
      "#5a7898",
      "#4a6684",
      "#3c536e",
      "#30445a",
      "#223242",
    ],
  },
  fontFamily: "var(--font-nunito), system-ui, sans-serif",
  headings: {
    fontFamily: "var(--font-josefin-slab), Georgia, serif",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        size: "md",
        radius: "md",
      },
      styles: fieldStyles,
      classNames: fieldClassNames,
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        size: "md",
        radius: "md",
      },
      styles: {
        ...fieldStyles,
        input: {
          ...fieldStyles.input,
          minHeight: "7.5rem",
          resize: "vertical",
        },
      },
      classNames: fieldClassNames,
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        size: "md",
        radius: "md",
      },
      styles: fieldStyles,
      classNames: fieldClassNames,
    }),
    Select: Select.extend({
      defaultProps: {
        size: "md",
        radius: "md",
      },
      styles: {
        ...fieldStyles,
        dropdown: {
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        },
        option: {
          color: "var(--foreground)",
        },
      },
      classNames: {
        ...fieldClassNames,
        option: "mantine-field-option",
      },
    }),
  },
});
