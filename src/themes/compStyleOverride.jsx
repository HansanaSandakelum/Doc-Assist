import { lighten } from "@mui/material";

export default function componentStyleOverrides(theme) {
  const bgColor = theme.colors?.grey50;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,

          borderRadius: `${theme?.customization?.borderRadius}px`,
        },

        contained: {
         
          color: theme.paper,
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          color: theme.paper,
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: "none",
        },

        rounded: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDark,

          padding: "24px",
        },

        title: {
          fontSize: "1.125rem",
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },

    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,

          paddingTop: "10px",

          paddingBottom: "10px",

          "&.Mui-selected": {
            color: theme.menuSelected,

            backgroundColor: theme.menuSelectedBack,

            "&:hover": {
              backgroundColor: theme.menuSelectedBack,
            },

            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },

          "&:hover": {
            backgroundColor: theme.menuSelectedBack,

            color: theme.menuSelected,

            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,

          minWidth: "36px",
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textDark,
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,

          "&::placeholder": {
            color: theme.darkTextSecondary,

            fontSize: "0.875rem",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,

          borderRadius: `${theme?.customization?.borderRadius}px`,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors?.grey500,
          },

          "&:hover $notchedOutline": {
            borderColor: theme.colors?.primaryMain,
          },

          "&.MuiInputBase-multiline": {
            padding: 1,
          },
        },

        input: {
          fontWeight: 500,

          background: bgColor,

          padding: "10px 50px",

          borderRadius: `${theme?.customization?.borderRadius}px`,

          "&.MuiInputBase-inputSizeSmall": {
            padding: "10px 149px",

            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0,
            },
          },
        },

        inputAdornedStart: {
          paddingLeft: 4,
        },

        notchedOutline: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: theme.colors?.grey300,
          },
        },

        mark: {
          backgroundColor: theme.paper,

          width: "4px",
        },

        valueLabel: {
          color: theme?.colors?.primaryLight,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,

          opacity: 1,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,

          background: theme.colors?.primary200,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-deletable .MuiChip-deleteIcon": {
            color: "inherit",
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.paper,

          background: theme.colors?.grey700,
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          ".MuiTable-root": {
            minHeight: "100% !important",
          },

          "& .MuiTableCell-head": {
            backgroundColor: theme.colors?.primaryMain,

            fontWeight: "bold",

            color: theme.paper,
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          ".MuiDataGrid-overlay": {
            minHeight: "100% !important",
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.colors?.primaryMain,

            color: theme.paper,
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important",
          },

          "& .edited-row": {
            backgroundColor: lighten(theme.colors?.secondaryLight, 0.5),
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiButtonBase-root.MuiTab-root": {
            borderBottom: `1px solid ${theme.divider}`,
          },

          "& .MuiTabs-indicator": {
            backgroundColor: theme.colors?.secondaryMain,
          },
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: theme.colors?.secondaryMain,

            opacity: 1,
          },

          "&.Mui-selected": {
            color: theme.colors?.secondaryMain,

            fontWeight: 550,
          },

          "&.Mui-focusVisible": {
            backgroundColor: theme.colors?.secondaryLight,
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          ".Mui-disabled": {
            color: theme.colors?.grey300,
          },
        },
      },
    },
  };
}
