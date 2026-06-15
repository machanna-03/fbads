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
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            "&::-webkit-scrollbar": {
              width: "16px",
              height: "16px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#a0a0a0",
              borderRadius: "8px",
              border: "2px solid #f1f1f1",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#808080",
            },
            "&::-webkit-scrollbar-button:single-button": {
              backgroundColor: "#f1f1f1",
              display: "block",
              height: "16px",
              width: "16px",
            },
            "&::-webkit-scrollbar-button:single-button:vertical:decrement": {
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2365676B'><path d='M3 16l9-9 9 9z'/></svg>")`,
              backgroundSize: "14px 14px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            },
            "&::-webkit-scrollbar-button:single-button:vertical:increment": {
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2365676B'><path d='M3 8l9 9 9-9z'/></svg>")`,
              backgroundSize: "14px 14px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
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
