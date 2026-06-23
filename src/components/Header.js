import { useState } from "react";
import { Box, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import { ReactComponent as NumberIcon } from '../assets/icons/score-icon.svg';
import { ReactComponent as DownArrowIcon } from '../assets/icons/down-arrow-dot-icon.svg';
import { ReactComponent as RefreshIcon } from '../assets/icons/refresh-icon.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete-icon.svg';

const FONT = '"Optimistic 95", system-ui, sans-serif';
const FONT_13 = '"Roboto", Arial, sans-serif';
const TEXT = "#rgb(28, 43, 51)";
const MUTED = "#65676B";
const BLUE = "#1877F2";
const BORDER = "1px solid #a6aab0ff";



const OpportunityBadge = () => (
  <Box sx={{ display: "inline-flex", width: 34, height: 34, flexShrink: 0, alignItems: "center", justifyContent: "center" }}>
    <NumberIcon width={30} height={30} />
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

const AdAccountSwitcherIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2" y="3.5" width="11" height="11" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
    <line x1="2" y1="10.5" x2="13" y2="10.5" stroke={color} strokeWidth="1.8" />
    <line x1="16" y1="6" x2="18.5" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="9" x2="18.5" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="12" x2="18.5" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
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
  const accountId = "1144652500438518";

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
          fontFamily: 500, color: "rgb(28, 43, 51) ",
          whiteSpace: "nowrap", mr: "4px", flexShrink: 0, lineHeight: '22px'
        }}
      >
        Campaigns
      </Typography>

      {/* ── Account Selector ── */}
      <OutlineBtn onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ backgroundColor: '#fff', gap: "8px", pl: "8px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            borderRadius: "50%",
            backgroundColor: "#e1edf7",
            flexShrink: 0,
          }}
        >
          <AdAccountSwitcherIcon size={16} color="#1c2b33" />
        </Box>
        <Typography sx={{ fontSize: "14px", fontWeight: 400, fontFamily: FONT, color: "rgb(28, 43, 51)", whiteSpace: "nowrap", lineHeight: '20px', }}>
          {accountId} ({accountId.slice(0, 7)}...)
        </Typography>
        <ArrowDropDownIcon sx={{ fontSize: "24px" }} />
      </OutlineBtn>

      {/* <Menu
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

      </Menu> */}

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
        <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#rgb(28, 43, 51)", fontFamily: FONT, whiteSpace: "nowrap" }}>
          Opportunity score
        </Typography>
        <DownArrowIcon width={16} height={16} />
      </Box>

      {/* ── Spacer ── */}
      <Box sx={{ flex: 1 }} />

      {/* ── Updated just now ── */}
      <Typography sx={{ fontSize: "14px", fontWeight: 400, fontStyle: "normal", color: TEXT, fontFamily: FONT, whiteSpace: "nowrap", flexShrink: 0, lineHeight: "20px" }}>
        Updated just now
      </Typography>

      {/* ── Refresh ── */}
      <IconBtn>
        <RefreshIcon width={16} height={16} />
      </IconBtn>

      {/* ── Discard Drafts ── */}
      <OutlineBtn>
        <DeleteIcon />
        <Typography sx={{ fontSize: "14px", fontWeight: 400, fontFamily: FONT, color: TEXT, whiteSpace: "nowrap" }}>
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
        <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#fff", fontFamily: FONT, whiteSpace: "nowrap", lineHeight: '20px' }}>
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