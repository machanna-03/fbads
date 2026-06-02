import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BillingPayments from "./components/BillingPayments";
import Campaigns from "./components/Campaigns";

function App() {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
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
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f0f2f5",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0,0,0,0.2)",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(0,0,0,0.4)",
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
