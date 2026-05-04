// import { createTheme, type MantineThemeOverride } from '@mantine/core';

// export const theme: MantineThemeOverride = createTheme({
//   primaryColor: 'blue',
//   fontFamily: 'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//   fontFamilyMonospace: 'var(--font-mono), "Fira Code", "Fira Mono", Consolas, monospace',
//   headings: {
//     fontFamily: 'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//   },
//   defaultRadius: 'md',
//   colors: {
//     dark: [
//       '#C1C2C5',
//       '#A6A7AB',
//       '#909296',
//       '#5C5F66',
//       '#373A40',
//       '#2C2E33',
//       '#25262B',
//       '#1A1B1E',
//       '#141517',
//       '#101113',
//     ],
//   },
// });

'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const brand: MantineColorsTuple = [
  '#e8f7ff',
  '#d3ecff',
  '#a6d7fc',
  '#74c0fa',
  '#4dacf7',
  '#319ff6',
  '#1c97f7',
  '#0083dd',
  '#0074c6',
  '#0064ad',
];

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand,
  },
  fontFamily: 'var(--font-sans), system-ui, sans-serif',
  fontFamilyMonospace: 'var(--font-mono), monospace',
  headings: {
    fontFamily: 'var(--font-sans), system-ui, sans-serif',
    fontWeight: '600',
  },
  radius: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    },
    Input: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
    Modal: {
      defaultProps: {
        radius: 'lg',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'lg',
      },
    },
  },
});
