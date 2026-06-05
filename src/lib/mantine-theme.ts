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
    color: "var(--foreground)",
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
    borderColor: "var(--border)",
    borderRadius: "0.5rem",
    backgroundColor: "var(--surface)",
    color: "var(--foreground)",
    fontFamily: "var(--font-nunito), system-ui, sans-serif",
    fontSize: "1rem",
    transition: "border-color 200ms ease, box-shadow 200ms ease",

    "&::placeholder": {
      color: "var(--text-muted)",
    },

    "&:focus, &:focus-within": {
      borderColor: "var(--brand)",
      boxShadow: "0 0 0 2px color-mix(in srgb, var(--brand) 20%, transparent)",
    },

    "&[data-error]": {
      borderColor: "var(--color-error, #ef4444)",
    },
  },
  error: {
    color: "var(--color-error, #ef4444)",
    fontSize: "0.875rem",
    marginTop: "0.375rem",
  },
  description: {
    color: "var(--text-muted)",
    fontSize: "0.875rem",
    marginTop: "0.375rem",
  },
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
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        size: "md",
        radius: "md",
      },
      styles: fieldStyles,
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

          "&[data-combobox-active]": {
            backgroundColor: "var(--background-warm)",
          },

          "&[data-combobox-selected]": {
            backgroundColor: "var(--brand-strong)",
            color: "#ffffff",
          },
        },
      },
    }),
  },
});
