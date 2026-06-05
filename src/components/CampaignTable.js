import { useState } from "react";
import { Box, Checkbox, Switch, Typography } from "@mui/material";
import { ChevronsUpDown, ChevronDown, Info } from "lucide-react";
import ImportExportIcon from '@mui/icons-material/ImportExport';
const FONT = '-apple-system, "system-ui", Arial, sans-serif';
const BORDER_COLOR = "#DADDE1";
const BORDER = `1px solid ${BORDER_COLOR}`;
const HEADER_BG = "#F2F3F5";
const TEXT = "#1C1E21";
const MUTED = "#65676B";
const BLUE = "#1877F2";
const BLUE_LIGHT = "#f5fced";
const GREEN = "#31A24C";
const ROW_HIGHLIGHT = "#f5fced";   /* exact Meta blue tint for highlighted row */
const ROW_HOVER = "#f5fced";

/* ── Reusable text ── */
function T({ children, sx = {} }) {
  return (
    <Typography sx={{ fontFamily: FONT, fontSize: "13px", color: TEXT, lineHeight: 1.4, ...sx }}>
      {children}
    </Typography>
  );
}

/* ── Sortable header cell ── */
function HeaderCell({ label, sortActive = false, info = false, right = false, wrap = false }) {
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center", gap: "3px",
        px: "10px", height: "100%", cursor: "pointer", userSelect: "none",
        justifyContent: right ? "flex-end" : "flex-start",
        "&:hover .sortIcon": { opacity: 1 },
      }}
    >
      {info && <Info size={11} color={MUTED} style={{ flexShrink: 0 }} />}
      {wrap ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <Typography sx={{ fontFamily: FONT, fontSize: "14px", fontWeight: 700, color: TEXT, lineHeight: 1.2 }}>
            {label.split(" ")[0]}
          </Typography>
          <Typography sx={{ fontFamily: FONT, fontSize: "14px", fontWeight: 700, color: TEXT, lineHeight: 1.2 }}>
            {label.split(" ").slice(1).join(" ")}
          </Typography>
        </Box>
      ) : (
        <Typography
          sx={{ fontFamily: FONT, fontSize: "14px", fontWeight: 700, color: TEXT, whiteSpace: "nowrap" }}
        >
          {label}
        </Typography>
      )}

      <Box sx={{ display: "flex", alignItems: "center", opacity: 0.5 }}>
        <ChevronDown size={14} color={TEXT} />
      </Box>
    </Box>
  );
}

/* ── Campaign row toggle switch ── */
function CampaignToggle({ checked }) {
  const [on, setOn] = useState(checked);
  return (
    <Switch
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
      size="small"
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked": { color: BLUE },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: BLUE },
      }}
    />
  );
}

/* ── Campaign data ── */
const campaigns = [
  {
    id: 1,
    name: "Leads",
    delivery: "In draft",
    deliveryColor: GREEN,
    results: null,
    costPerResult: null,
    budget: "Using ad set budget",
    budgetSub: "Not shared",
    amountSpent: null,
    actions: null,
    on: true,
  },
];

export default function CampaignTable() {
  const [selected, setSelected] = useState([]);
  const [hovered, setHovered] = useState(null);

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const allChecked = campaigns.length > 0 && selected.length === campaigns.length;
  const indeterminate = selected.length > 0 && selected.length < campaigns.length;

  return (
    <Box
      sx={{
        flex: 1, display: "flex", flexDirection: "column",
        overflow: "hidden", backgroundColor: "#F5F6F7",
      }}
    >
      {/* ── Table wrapper ── */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderTop: BORDER,
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          flex: 1,
        }}
      >
        {/* ── Table header ── */}
        <Box
          sx={{
            display: "flex", alignItems: "stretch",
            height: "52px",
            backgroundColor: "#ffffff",
            borderBottom: BORDER,
            flexShrink: 0,
            overflowX: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* Checkbox col */}
          <Box
            sx={{
              width: 44, minWidth: 44, height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRight: BORDER, flexShrink: 0,
            }}
          >
            <Checkbox
              size="small"
              checked={allChecked}
              indeterminate={indeterminate}
              onChange={(e) => setSelected(e.target.checked ? campaigns.map((c) => c.id) : [])}
              sx={{ p: "2px", color: MUTED, "&.Mui-checked": { color: BLUE }, "&.MuiCheckbox-indeterminate": { color: BLUE } }}
            />
          </Box>

          {/* Off/On */}
          <Box
            sx={{
              width: 88, minWidth: 88, px: "10px", height: "100%",
              display: "flex", alignItems: "center",
              borderRight: BORDER, flexShrink: 0, gap: "4px", cursor: "pointer",
            }}
          >
            <Typography sx={{ fontFamily: FONT, fontSize: "14px", fontWeight: 700, color: TEXT }}>
              Off...
            </Typography>
            <ImportExportIcon size={14} color={TEXT} />
          </Box>

          {/* Campaign */}
          <Box sx={{ flex: 2, minWidth: 200, height: "100%", borderRight: BORDER }}>
            <HeaderCell label="Campaign" />
          </Box>

          {/* Delivery */}
          <Box sx={{ width: 140, minWidth: 140, height: "100%", borderRight: BORDER }}>
            <HeaderCell label="Delivery" sortActive />
          </Box>

          {/* Actions */}
          <Box sx={{ flex: 1, minWidth: 120, height: "100%", borderRight: BORDER }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px", px: "10px", height: "100%" }}>
              <Typography sx={{ fontFamily: FONT, fontSize: "14px", fontWeight: 700, color: TEXT }}>
                Actions
              </Typography>
              <ChevronsUpDown size={14} color={TEXT} />
            </Box>
          </Box>

          {/* Results */}
          <Box sx={{ width: 110, minWidth: 110, height: "100%", borderRight: BORDER }}>
            <HeaderCell label="Results" info />
          </Box>

          {/* Cost per result */}
          <Box sx={{ width: 100, minWidth: 100, height: "100%", borderRight: BORDER }}>
            <HeaderCell label="Cost per result" wrap />
          </Box>

          {/* Sort icon sep col */}
          <Box
            sx={{
              width: 36, minWidth: 36, height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRight: BORDER, flexShrink: 0, cursor: "pointer",
            }}
          >
            <ChevronsUpDown size={14} color={TEXT} />
          </Box>

          {/* Budget */}
          <Box sx={{ width: 140, minWidth: 140, height: "100%", borderRight: BORDER }}>
            <HeaderCell label="Budget" />
          </Box>

          {/* Amount spent */}
          <Box sx={{ width: 110, minWidth: 110, height: "100%", px: "10px", display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontFamily: FONT, fontSize: "14px", fontWeight: 700, color: TEXT }}>
              Amount spent
            </Typography>
          </Box>
        </Box>

        {/* ── Data rows ── */}
        {campaigns.map((row) => {
          const isSelected = selected.includes(row.id);
          const isHovered = hovered === row.id;
          const rowBg = isSelected
            ? BLUE_LIGHT
            : isHovered
              ? ROW_HOVER
              : ROW_HIGHLIGHT;

          return (
            <Box
              key={row.id}
              onMouseEnter={() => setHovered(row.id)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                display: "flex", alignItems: "stretch",
                height: "52px",
                backgroundColor: rowBg,
                borderBottom: BORDER,
                transition: "background-color 0.15s",
                cursor: "default",
                overflowX: "auto",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {/* Checkbox */}
              <Box
                sx={{
                  width: 44, minWidth: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: BORDER, flexShrink: 0,
                }}
              >
                <Checkbox
                  size="small"
                  checked={isSelected}
                  onChange={() => toggleSelect(row.id)}
                  sx={{
                    p: "2px", color: MUTED,
                    "&.Mui-checked": { color: BLUE },
                  }}
                />
              </Box>

              {/* Toggle */}
              <Box
                sx={{
                  width: 88, minWidth: 88,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: BORDER, flexShrink: 0,
                }}
              >
                <CampaignToggle checked={row.on} />
              </Box>

              {/* Campaign name */}
              <Box
                sx={{
                  flex: 2, minWidth: 200,
                  display: "flex", alignItems: "center",
                  px: "10px", borderRight: BORDER,
                }}
              >
                <T sx={{ color: BLUE, fontWeight: 600, fontSize: "13px", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                  {row.name}
                </T>
              </Box>

              {/* Delivery */}
              <Box
                sx={{
                  width: 140, minWidth: 140,
                  display: "flex", alignItems: "center",
                  px: "10px", borderRight: BORDER, gap: "6px",
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: row.deliveryColor, flexShrink: 0 }} />
                <T sx={{ fontSize: "12px", fontWeight: 500, color: TEXT }}>{row.delivery}</T>
              </Box>

              {/* Actions */}
              <Box
                sx={{
                  flex: 1, minWidth: 120,
                  display: "flex", alignItems: "center",
                  px: "10px", borderRight: BORDER,
                }}
              >
                <T sx={{ color: MUTED }}>—</T>
              </Box>

              {/* Results */}
              <Box
                sx={{
                  width: 110, minWidth: 110,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  px: "10px", borderRight: BORDER,
                }}
              >
                <T sx={{ color: MUTED }}>—</T>
              </Box>

              {/* Cost per result */}
              <Box
                sx={{
                  width: 100, minWidth: 100,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  px: "10px", borderRight: BORDER,
                }}
              >
                <T sx={{ color: MUTED }}>—</T>
              </Box>

              {/* Sort sep */}
              <Box
                sx={{
                  width: 36, minWidth: 36,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: BORDER, flexShrink: 0,
                }}
              />

              {/* Budget */}
              <Box
                sx={{
                  width: 140, minWidth: 140,
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  px: "10px", borderRight: BORDER,
                }}
              >
                <T sx={{ fontSize: "12px", fontWeight: 400 }}>{row.budget}</T>
                {row.budgetSub && (
                  <T sx={{ fontSize: "11px", color: MUTED, mt: "1px" }}>{row.budgetSub}</T>
                )}
              </Box>

              {/* Amount spent */}
              <Box
                sx={{
                  width: 110, minWidth: 110,
                  display: "flex", alignItems: "center", justifyContent: "flex-end",
                  px: "10px",
                }}
              >
                <T sx={{ color: MUTED }}>—</T>
              </Box>
            </Box>
          );
        })}

        {/* ── Results footer ── */}
        <Box
          sx={{
            display: "flex", alignItems: "center",
            px: "16px", height: "40px",
            borderBottom: BORDER, backgroundColor: "#fff",
            flexShrink: 0, gap: "6px",
          }}
        >
          <T sx={{ fontSize: "12px", color: MUTED }}>Results from {campaigns.length} campaign</T>
          <Info size={13} color={MUTED} style={{ cursor: "pointer" }} />
        </Box>

        {/* ── Remaining space: white to match reference ── */}
        <Box sx={{ flex: 1, backgroundColor: "#ffffff" }} />
      </Box>
    </Box>
  );
}
