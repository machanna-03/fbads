import { Box } from "@mui/material";
import FilterBar from "./FilterBar";
import SubHeader from "./SubHeader";
import CampaignTable from "./CampaignTable";

export default function Campaigns() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* ── 1. Filter bar: All ads | search ── */}
      <FilterBar />

      {/* ── 2. Tabs + action toolbar ── */}
      <SubHeader />

      {/* ── 3. Table header + empty state ── */}
      <CampaignTable />
    </Box>
  );
}