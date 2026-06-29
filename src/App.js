import { useState, useRef, useCallback, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BillingPayments from "./components/BillingPayments";
import Campaigns from "./components/Campaigns";

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("activeTab") || "campaigns";
  });
  const scrollRef = useRef(null);
  const scrollTimer = useRef(null);

  // Persist active tab across refreshes within the same session
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const defaultUrl = "/adsmanager/manage/campaigns?act=1144652500847915&date=2026-06-21_2026-06-22%2Cyesterday&insights_date=2026-06-21_2026-06-22%2Cyesterday&nav_source=no_referrer&treenav=true&selected_campaign_ids=1202461195576847362";
    if (window.location.pathname === "/" || window.location.pathname === "") {
      window.history.pushState(null, "", defaultUrl);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.classList.add("scrolling");
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      el.classList.remove("scrolling");
    }, 400);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: '"Optimistic 95", system-ui, sans-serif',
        fontSize: "12px",
        backgroundColor: "#F0F2F5",
      }}
    >
      {/* ── Left Sidebar ── */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ── Main Content (Header + Page) ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        {/* Topbar Header — hidden on Billing (it has its own) */}
        {activeTab !== "billing" && <Header activeTab={activeTab} />}

        {/* Page Content */}
        <Box
          ref={scrollRef}
          onScroll={handleScroll}
          id="app-main-content"
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent",
              borderRadius: "4px",
              transition: "background 0.4s",
            },
            "&.scrolling::-webkit-scrollbar-thumb": {
              background: "rgba(0,0,0,0.45)",
            },
            "&.scrolling::-webkit-scrollbar-thumb:hover": {
              background: "rgba(0,0,0,0.6)",
            },
            "&::-webkit-scrollbar-button": {
              display: "none",
            },
          }}
        >
          {activeTab === "campaigns" ? (
            <Campaigns />
          ) : (
            <BillingPayments />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
