const textLight = {
  primary: 'rgba(52, 49, 76, 1)',
  secondary: 'rgba(52, 49, 76, 0.54)',
  disabled: 'rgba(52, 49, 76, 0.38)',
  hint: 'rgba(52, 49, 76, 0.38)',
};

const textDark = {
  primary: '#fff',
  secondary: 'rgba(255, 255, 255, 0.7)',
  disabled: 'rgba(255, 255, 255, 0.64)',
  hint: 'rgba(255, 255, 255, 0.64)',
};


const errorColor = {
  main: '#FF3D57',
};

export const themeColors = {
  nemFra: {
    palette: {
      type: 'dark',
      primary: {
        main: '#4D148c',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#F15A29',
        contrastText: textLight.primary,
      },
      error: errorColor,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
      text: textDark,
    },
  },


  whiteBlue: {
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
        contrastText: textLight.primary,
      },
      secondary: {
        main: '#1976d2',
        contrastText: '#ffffff',
      },
      background: {
        paper: '#fff',
        default: '#fafafa',
      },
      text: textLight,
    },
  },
  
  slateDark1: {
    palette: {
      type: 'dark',
      primary: {
        main: '#222A45',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ff9e43',
        contrastText: textLight.primary,
      },
      error: errorColor,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
      text: textDark,
    },
  },
  
  

  
 
};

export const themeShadows = [
  '0px 4px 5px -2px rgba(0, 0, 0, 0.06),0px 7px 10px 1px rgba(0, 0, 0, 0.042),0px 2px 16px 1px rgba(0, 0, 0, 0.036)',
  


];
