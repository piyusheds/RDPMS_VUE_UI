import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light', // or 'dark'
    themes: {
      light: {
        colors: {
          primary: '#1976D2', // Custom primary color
          secondary: '#424242', // Custom secondary color
        },
      },
    },
  },
});

export default vuetify;
