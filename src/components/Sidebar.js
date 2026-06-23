import React, { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import logo from "../assets/meta.png";
import { ReactComponent as CampaignIcon } from '../assets/icons/campaign-icon.svg';
import { ReactComponent as AccountOverviewIcon } from '../assets/icons/account-icon.svg';
import { ReactComponent as AdsReportIcon } from '../assets/icons/ads-report-icon.svg';
import { ReactComponent as Audience } from '../assets/icons/audience-icon.svg';
import { ReactComponent as AdvertisingSettings } from '../assets/icons/advertising-icon.svg';
import { ReactComponent as BillingPayments } from '../assets/icons/billing-icon.svg';
import { ReactComponent as EventsManager } from '../assets/icons/events-manager-icon.svg';
import { ReactComponent as AllTools } from '../assets/icons/all-tools-icon.svg';
import { ReactComponent as Notifications } from '../assets/icons/notification-icon.svg';
import { ReactComponent as FolderIcon } from '../assets/icons/folder-icon.svg';
import { ReactComponent as HelpIcon } from '../assets/icons/report-a-problem-icon.svg';
import { ReactComponent as NotesIcon } from '../assets/icons/drafts-icon.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings-icon.svg';
import { ReactComponent as ReportIcon } from '../assets/icons/report-a-problem-icon.svg';

import { ReactComponent as SearchIcon } from '../assets/icons/search-icon.svg';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


/* ─── Sidebar Items Config ─── */
const topItems = [
  { id: "home", icon: AccountOverviewIcon, label: "Account overview", tab: null },
  { id: "campaigns", icon: CampaignIcon, label: "Campaigns", tab: "campaigns" },
  { id: "adreporting", icon: AdsReportIcon, label: "Ad Reporting", tab: "null" },
  { id: "audiences", icon: Audience, label: "Audiences", tab: null },
  { id: "advertisingSettings", icon: AdvertisingSettings, label: "AdventisingSettings", tab: null },
  { id: "billing", icon: BillingPayments, label: "Billing & payments", tab: "billing" },
  { id: "events", icon: EventsManager, label: "Events Manager", tab: null },
  { id: "more", icon: AllTools, label: "All tools", tab: null },
];

const bottomItems = [
  { id: "help", icon: QuestionMarkIcon, label: "Help", tab: null },
  { id: "notes", icon: NotesIcon, label: "Drafts", tab: null },
  { id: "settings", icon: SettingsIcon, label: "Settings", tab: null },
  { id: "search", icon: SearchIcon, label: "Search", tab: null },
  { id: "pixel", icon: ReportIcon, label: "Report a problem", tab: null },
];

/* ─── Single Nav Item ─── */
function NavItem({ item, isExpanded, isActive, onClick }) {
  const Icon = item.icon;
  const activeColor = "#1877f2";
  const defaultColor = "rgb(28, 43, 51)";
  const iconColor = isActive ? activeColor : defaultColor;

  return (
    <Tooltip
      title={isExpanded ? "" : item.label}
      placement="right"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: "12px",
            bgcolor: "#1c2b33",
            color: "#fff",
            borderRadius: "4px",
            py: "4px",
            px: "8px",
          },
        },
      }}
    >
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          px: "14px",
          py: "10px",
          cursor: "pointer",
          borderRadius: "6px",
          mx: "4px",
          position: "relative",
          backgroundColor: isActive ? "rgba(24,119,242,0.08)" : "transparent",
          color: isActive ? activeColor : defaultColor,
          transition: "background-color 0.15s ease, color 0.15s ease",
          whiteSpace: "nowrap",
          overflow: "hidden",
          "&:hover": {
            backgroundColor: isActive
              ? "rgba(24,119,242,0.12)"
              : "rgba(0,0,0,0.04)",
          },
          // Active left border indicator
          "&::before": isActive
            ? {
              content: '""',
              position: "absolute",
              left: "-4px",
              top: "6px",
              bottom: "6px",
              width: "3px",
              backgroundColor: activeColor,
              borderRadius: "0 2px 2px 0",
            }
            : {},
        }}
      >
        {/* Icon */}
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center", color: iconColor }}>
          <Icon width={24} height={24} fill="currentColor" />
        </Box>

        {/* Label — only visible when expanded */}
        <Typography
          sx={{
            fontFamily: 'Roboto, Arial, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            color: "rgb(28, 43, 51)",
            fontSize: "16px",
            lineHeight: "20px",
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            transition: "opacity 0.2s ease, width 0.2s ease",
            overflow: "hidden",
          }}
        >
          {item.label}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/* ─── Main Sidebar Component ─── */
export default function Sidebar({ activeTab, setActiveTab }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (tab) => {
    if (tab) setActiveTab(tab);
  };

  return (
    <Box
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      sx={{
        width: isExpanded ? 220 : 56,
        minWidth: isExpanded ? 220 : 56,
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #cbd2d9",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowX: "hidden",
        overflowY: "auto",
        zIndex: 100,
        flexShrink: 0,
        // Hide scrollbar
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {/* ── Meta Logo + "Meta" text ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: "16px",
          pt: "20px",
          pb: "4px",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Meta" style={{ width: "28px", height: "28px" }} />
        </Box>
        <Typography
          sx={{
            ml: "0px",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: '"Optimistic 95", system-ui, sans-serif',
            color: "rgb(28, 30, 33)",
            lineHeight: "20px",
            whiteSpace: "nowrap",
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            transition: "opacity 0.2s ease",
            overflow: "hidden",
            lineHeight: "15px"
          }}
        >
          Meta
        </Typography>
      </Box>

      {/* ── "Ads Manager" heading ── */}
      <Typography
        sx={{
          px: "16px",
          pt: "2px",
          pb: "12px",
          fontSize: "24px",
          fontWeight: 700,
          fontFamily: '"Optimistic 95", system-ui, sans-serif',
          color: "rgb(28, 43, 51)",
          lineHeight: "28px",
          letterSpacing: "-0.2px",
          whiteSpace: "nowrap",
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? "auto" : 0,
          transition: "opacity 0.2s ease, height 0.2s ease",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        Ads Manager
      </Typography>

      {/* ── Notifications ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          px: "14px",
          py: "10px",
          mx: "4px",
          cursor: "pointer",
          borderRadius: "6px",
          color: "#1c2b33",
          whiteSpace: "nowrap",
          overflow: "hidden",
          transition: "background-color 0.15s ease",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center", color: "inherit" }}>
          <Notifications width={24} height={24} fill="currentColor" />
        </Box>
        <Typography
          sx={{
            fontFamily: '"Optimistic 95", system-ui, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            color: "rgb(28, 43, 51)",
            fontSize: "16px",
            fontSize: "16px",
            lineHeight: "20px",
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            transition: "opacity 0.2s ease, width 0.2s ease",
            overflow: "hidden",
          }}
        >
          Notifications
        </Typography>
      </Box>

      {/* ── Divider ── */}
      <Box
        sx={{
          height: "1.5px",
          backgroundColor: "#cbd2d9",
          mx: "8px",
          my: "4px",
          flexShrink: 0,
        }}
      />

      {/* ── Top Nav Items ── */}
      <Box sx={{ pt: "8px", flex: 1 }}>
        {topItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isExpanded={isExpanded}
            isActive={item.tab === activeTab}
            onClick={() => handleClick(item.tab)}
          />
        ))}
      </Box>

      {/* ── Divider ── */}
      <Box
        sx={{
          height: "1.5px",
          backgroundColor: "#cbd2d9",
          mx: "8px",
          mb: "8px",
          flexShrink: 0,
        }}
      />

      {/* ── Bottom Nav Items (horizontal icon row when expanded) ── */}
      <Box
        sx={{
          pb: "12px",
          px: "12px",
          display: "flex",
          flexDirection: isExpanded ? "row" : "column",
          alignItems: "center",
          justifyContent: isExpanded ? "space-around" : "center",
          gap: isExpanded ? "0px" : "4px",
          transition: "all 0.22s ease",
        }}
      >
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Tooltip
              key={item.id}
              title={item.label}
              placement={isExpanded ? "top" : "right"}
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    fontFamily: '"Optimistic 95", system-ui, sans-serif',
                    color: "#fff",
                    bgcolor: "rgb(28, 43, 51)",
                    borderRadius: "4px",
                    py: "4px",
                    px: "8px",
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "rgb(28, 43, 51)",
                  transition: "background-color 0.15s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.06)",
                  },
                }}
              >
                <Icon width={20} height={20} fill="currentColor" />
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
