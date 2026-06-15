import { useState } from "react";
import { Box, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
const FONT = '"Optimistic 95", system-ui, sans-serif';
const TEXT = "rgba(28, 43, 51, 1)";
const MUTED = "#65676B";
const BLUE = "#1877F2";
const BORDER = "1px solid #a6aab0ff";

/* ── SVG Icons ── */
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M3.5 10A6.5 6.5 0 0 1 16 7" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16.5 10A6.5 6.5 0 0 1 4 13" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M13.5 7H16V4.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 13H4V15.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = ({ color = TEXT, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SolidArrowDown = () => (
  <svg width="9" height="6" viewBox="0 0 7 5" fill="#1c2b33" style={{ marginLeft: "4px" }}>
    <path d="M0 0h7L3.5 5z" />
  </svg>
);

const OpportunityBadge = ({ score = 100 }) => (
  <Box sx={{ position: "relative", display: "inline-flex", width: 28, height: 28, flexShrink: 0 }}>
    <svg width="28" height="28" viewBox="0 0 36 36">
      {/* Background track with gap at the bottom */}
      <path
        d="M 8.5 27.5 A 13.5 13.5 0 1 1 27.5 27.5"
        fill="none"
        stroke="#E4E6EB"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Active progress track with gap at the bottom */}
      <path
        d="M 8.5 27.5 A 13.5 13.5 0 1 1 27.5 27.5"
        fill="none"
        stroke="#1877F2"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
    <Box
      sx={{
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: "10px", fontWeight: 750, fontFamily: FONT, color: TEXT, lineHeight: 1 }}>
        {score}
      </Typography>
    </Box>
  </Box>
);

const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <circle cx="4" cy="10" r="1.5" fill={MUTED} />
    <circle cx="10" cy="10" r="1.5" fill={MUTED} />
    <circle cx="16" cy="10" r="1.5" fill={MUTED} />
  </svg>
);

const AdAccountIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke={MUTED} strokeWidth="1.2" />
    <path d="M1.5 6.5H14.5" stroke={MUTED} strokeWidth="1.2" />
    <rect x="3.5" y="9" width="3" height="1.5" rx="0.5" fill={MUTED} />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 6H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 6V4H12V6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="5" y="6" width="10" height="11" rx="1.5" stroke="#000" strokeWidth="1.5" />
    <path d="M8 9V14M12 9V14" stroke="#000" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

function IconBtn({ children, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 32, height: 32,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: BORDER, borderRadius: "4px",
        backgroundColor: "transparent", cursor: "pointer", flexShrink: 0,
        transition: "background-color 0.15s",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
      }}
    >
      {children}
    </Box>
  );
}

function OutlineBtn({ children, onClick, sx = {} }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex", alignItems: "center", gap: "6px",
        height: 32, px: "12px", border: BORDER, borderRadius: "6px",
        backgroundColor: "transparent", cursor: "pointer", flexShrink: 0,
        userSelect: "none", transition: "background-color 0.15s",
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const accountId = "988692073881733";

  return (
    <Box
      sx={{
        height: 56, minHeight: 56,
        background: "linear-gradient(to right, #fcf0f0, #e5f0fa)",
        borderBottom: BORDER,
        display: "flex", alignItems: "center",
        px: "16px", gap: "8px",
        zIndex: 99, flexShrink: 0,
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {/* ── Page Title ── */}
      <Typography
        sx={{
          fontSize: "18px", fontWeight: 700,
          fontFamily: FONT, color: "rgb(28, 43, 51) ",
          whiteSpace: "nowrap", mr: "4px", flexShrink: 0, lineHeight: '22px'
        }}
      >
        Ad sets
      </Typography>

      {/* ── Account Selector ── */}
      <OutlineBtn onClick={(e) => setAnchorEl(e.currentTarget)}>
        <AdAccountIcon />
        <Typography sx={{ fontSize: "14px", fontWeight: 500, fontFamily: FONT, color: TEXT, whiteSpace: "nowrap" }}>
          {accountId} ({accountId.slice(0, 7)}...)
        </Typography>
        <ArrowDropDownIcon sx={{ fontSize: "24px" }} />
      </OutlineBtn>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: "4px",
            minWidth: 260,
            border: BORDER,
            boxShadow: "0px 4px 16px rgba(0,0,0,0.12)",
            borderRadius: "4px",
          },
        }}
      >
        <Box sx={{ p: "8px 12px", borderBottom: BORDER, display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke={MUTED} strokeWidth="2" />
            <path d="M12.5 12.5L17 17" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <Typography sx={{ fontSize: "12px", fontFamily: FONT, color: MUTED }}>
            Search ad accounts
          </Typography>
        </Box>
        <MenuItem
          onClick={() => setAnchorEl(null)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            py: "10px",
            px: "16px",
            borderLeft: `3px solid ${BLUE}`,
            backgroundColor: "#F2F3F5",
            minHeight: "56px",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: FONT, color: TEXT }}>
            Ashwayana Reality Group
          </Typography>
          <Typography sx={{ fontSize: "11px", color: MUTED, fontFamily: FONT }}>
            ID: {accountId}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setAnchorEl(null)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            py: "10px",
            px: "16px",
            minHeight: "56px",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: 500, fontFamily: FONT, color: TEXT }}>
            Personal Account
          </Typography>
          <Typography sx={{ fontSize: "11px", color: MUTED, fontFamily: FONT }}>
            ID: 498042116267790
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setAnchorEl(null)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            py: "10px",
            px: "16px",
            minHeight: "56px",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: 500, fontFamily: FONT, color: TEXT }}>
            Sandbox Testing Group
          </Typography>
          <Typography sx={{ fontSize: "11px", color: MUTED, fontFamily: FONT }}>
            ID: 988692073881999
          </Typography>
        </MenuItem>
      </Menu>

      {/* ── Opportunity Score Badge ── */}
      <Box
        sx={{
          display: "flex", alignItems: "center", gap: "8px",
          px: "8px", py: "4px",
          borderRadius: "4px", cursor: "pointer", flexShrink: 0,
          "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
        }}
      >
        <OpportunityBadge score={100} />
        <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#1c2b33", fontFamily: FONT, whiteSpace: "nowrap" }}>
          Opportunity score
        </Typography>
        <SolidArrowDown />
      </Box>

      {/* ── Spacer ── */}
      <Box sx={{ flex: 1 }} />

      {/* ── Updated just now ── */}
      <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#000", fontFamily: FONT, whiteSpace: "nowrap", flexShrink: 0 }}>
        Updated just now
      </Typography>

      {/* ── Refresh ── */}
      <IconBtn>
        <RefreshIcon />
      </IconBtn>

      {/* ── Discard Drafts ── */}
      <OutlineBtn>
        <TrashIcon />
        <Typography sx={{ fontSize: "13px", fontWeight: 500, fontFamily: FONT, color: TEXT, whiteSpace: "nowrap" }}>
          Discard Drafts
        </Typography>
      </OutlineBtn>

      {/* ── Review and publish ── */}
      <Box
        sx={{
          display: "flex", alignItems: "center", gap: "6px",
          height: 32, px: "14px",
          backgroundColor: "#0b78be", borderRadius: "6px",
          cursor: "pointer", flexShrink: 0,
          transition: "background-color 0.15s",
        }}
      >
        <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#fff", fontFamily: FONT, whiteSpace: "nowrap" }}>
          Review and publish (2)
        </Typography>
      </Box>

      {/* ── Three dots ── */}
      <IconBtn>
        <DotsIcon />
      </IconBtn>

      {/* ── User Avatar ── */}
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0, position: "relative" }}>
        <Avatar
          sx={{
            width: 28,
            height: 28,
            bgcolor: "#d7daddff",
            color: "#65676B",
            border: "1px solid #a8b3bf"
          }}
        >
          <PersonIcon sx={{ fontSize: "22px" }} />
        </Avatar>
        <Box
          sx={{
            width: 14, height: 14, borderRadius: "50%",
            bgcolor: BLUE, display: "flex", alignItems: "center", justifyContent: "center",
            position: "absolute", bottom: -2, right: -2,
            border: "1.5px solid #fff", zIndex: 1,
          }}
        >
          <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#fff", fontFamily: FONT, lineHeight: 1 }}>
            f
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}