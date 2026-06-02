import { useState } from "react";
import { Box, Typography, Avatar, Menu, MenuItem } from "@mui/material";

/* ─── SVG Icons ─── */

// Refresh / Sync icon
const RefreshIcon = ({ size = 16, color = "#1c2b33" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M3.5 10A6.5 6.5 0 0 1 16 7M16.5 10A6.5 6.5 0 0 1 4 13"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M13.5 7H16V4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 13H4V15.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Chevron Down
const ChevronDown = ({ size = 14, color = "#1c2b33" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Three dots / More
const DotsIcon = ({ size = 16, color = "#1c2b33" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="4" cy="10" r="1.5" fill={color} />
    <circle cx="10" cy="10" r="1.5" fill={color} />
    <circle cx="16" cy="10" r="1.5" fill={color} />
  </svg>
);

// Ad Account icon (small screen / card icon)
const AdAccountIcon = ({ size = 14, color = "#1c2b33" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke={color} strokeWidth="1.2" />
    <path d="M1.5 6.5H14.5" stroke={color} strokeWidth="1.2" />
    <rect x="3.5" y="9" width="3" height="1.5" rx="0.5" fill={color} />
  </svg>
);

// Opportunity score circle (100 badge)
const OpportunityBadge = ({ score = 100 }) => (
  <Box
    sx={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      border: "2px solid #1877f2",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Typography
      sx={{
        fontSize: "9px",
        fontWeight: 700,
        color: "#1c2b33",
        fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
        lineHeight: 1,
      }}
    >
      {score}
    </Typography>
  </Box>
);

/* ─── Topbar Button ─── */
function TopbarBtn({ children, onClick, sx = {} }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        height: "30px",
        px: "10px",
        border: "1px solid #cbd2d9",
        borderRadius: "4px",
        backgroundColor: "#fff",
        cursor: "pointer",
        flexShrink: 0,
        userSelect: "none",
        transition: "background-color 0.15s",
        "&:hover": { backgroundColor: "#f0f2f5" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/* ─── Main Header Component ─── */
export default function Header({ activeTab }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const accountName = "498042116267790 (4980421...)";

  return (
    <Box
      sx={{
        height: 44,
        minHeight: 44,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #cbd2d9",
        display: "flex",
        alignItems: "center",
        px: "16px",
        gap: "10px",
        zIndex: 99,
        flexShrink: 0,
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {/* ── Page Title ── */}
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
          color: "#1c2b33",
          whiteSpace: "nowrap",
          mr: "4px",
          flexShrink: 0,
        }}
      >
        Campaigns
      </Typography>

      {/* ── Account Selector ── */}
      <TopbarBtn onClick={(e) => setAnchorEl(e.currentTarget)}>
        <AdAccountIcon size={14} color="#1c2b33" />
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
            color: "#1c2b33",
            whiteSpace: "nowrap",
          }}
        >
          {accountName}
        </Typography>
        <ChevronDown size={13} color="#1c2b33" />
      </TopbarBtn>

      {/* Account Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: "4px",
            minWidth: 220,
            border: "1px solid #cbd2d9",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
            borderRadius: "4px",
          },
        }}
      >
        <MenuItem
          onClick={() => setAnchorEl(null)}
          sx={{ fontSize: "13px", fontFamily: '-apple-system, "system-ui", Arial, sans-serif', color: "#1c2b33" }}
        >
          498042116267790
        </MenuItem>
      </Menu>

      {/* ── Opportunity Score ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          px: "8px",
          py: "4px",
          borderRadius: "4px",
          flexShrink: 0,
          "&:hover": { backgroundColor: "#f0f2f5" },
        }}
      >
        <OpportunityBadge score={100} />
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
            color: "#1c2b33",
            whiteSpace: "nowrap",
          }}
        >
          Opportunity score
        </Typography>
        <ChevronDown size={13} color="#1c2b33" />
      </Box>

      {/* ── Spacer ── */}
      <Box sx={{ flex: 1 }} />

      {/* ── Refresh button ── */}
      <Box
        sx={{
          width: 30,
          height: 30,
          border: "1px solid #cbd2d9",
          borderRadius: "4px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          transition: "background-color 0.15s",
          "&:hover": { backgroundColor: "#f0f2f5" },
        }}
      >
        <RefreshIcon size={15} color="#1c2b33" />
      </Box>

      {/* ── Review and publish button ── */}
      <TopbarBtn
        sx={{
          px: "14px",
          gap: "4px",
          border: "1px solid #cbd2d9",
          backgroundColor: "#fff",
          "&:hover": { backgroundColor: "#f0f2f5" },
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
            color: "#1c2b33",
            whiteSpace: "nowrap",
          }}
        >
          Review and publish
        </Typography>
      </TopbarBtn>

      {/* ── Three dots menu ── */}
      <Box
        sx={{
          width: 30,
          height: 30,
          border: "1px solid #cbd2d9",
          borderRadius: "4px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          transition: "background-color 0.15s",
          "&:hover": { backgroundColor: "#f0f2f5" },
        }}
      >
        <DotsIcon size={16} color="#1c2b33" />
      </Box>

      {/* ── User Avatar ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0px",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <Avatar
          sx={{
            width: 28,
            height: 28,
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
            bgcolor: "#1877f2",
          }}
        >
          A
        </Avatar>
        {/* Facebook 'f' badge overlay — small blue circle */}
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: "#1877f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ml: "-8px",
            mt: "14px",
            border: "1.5px solid #fff",
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "9px",
              fontWeight: 700,
              color: "#fff",
              fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
              lineHeight: 1,
            }}
          >
            f
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}