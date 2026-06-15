import { useState } from "react";
import { Box, Checkbox, Switch, Typography } from "@mui/material";
import { ChevronsUpDown, ChevronDown, Info, ArrowDown } from "lucide-react";
import ImportExportIcon from '@mui/icons-material/ImportExport';
const FONT = '"Optimistic 95", system-ui, sans-serif';
// eslint-disable-next-line no-unused-vars
const FONT_ROBOTO = 'Roboto, Arial, sans-serif';
const BORDER_COLOR = "#DADDE1";
const BORDER = `1px solid ${BORDER_COLOR}`;
const HEADER_BG = "#F2F3F5";
const TEXT = "#1c2b33";
const MUTED = "#65676B";
const BLUE = "#1877F2";
const BLUE_LIGHT = "#e6f5f0";
const GREEN = "#31A24C";
const ROW_HIGHLIGHT = "#e6f5f0";   /* exact Meta blue tint for highlighted row */
const ROW_HOVER = "#e6f5f0";

/* ── Reusable text ── */
function T({ children, sx = {} }) {
  return (
    <Typography sx={{ fontFamily: FONT, fontSize: "13px", color: TEXT, lineHeight: 1.4, ...sx }}>
      {children}
    </Typography>
  );
}

/* ── Sortable header cell ── */
function HeaderCell({ label, sortActive = false, info = false, right = false, wrap = false, showSort = true, showCaret = true }) {
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center",
        px: "10px", height: "100%", cursor: "pointer", userSelect: "none",
        justifyContent: "space-between",
        "&:hover .caretIcon": { opacity: 1 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-start", flex: 1 }}>
        {info && <Info size={11} color={MUTED} style={{ flexShrink: 0 }} />}
        {wrap ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontFamily: FONT, fontSize: "13px", fontWeight: 700, color: TEXT, lineHeight: 1.2 }}>
              {label.split(" ")[0]} {label.split(" ")[1]}
            </Typography>
            <Typography sx={{ fontFamily: FONT, fontSize: "13px", fontWeight: 700, color: TEXT, lineHeight: 1.2 }}>
              {label.split(" ").slice(2).join(" ")}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontFamily: FONT, fontSize: "13px", fontWeight: 700, color: TEXT, whiteSpace: "nowrap" }}>
            {label}
          </Typography>
        )}

        {showSort && (
          <Box sx={{ display: "flex", alignItems: "center", ml: "2px" }}>
            {sortActive ? (
              <ArrowDown size={14} color={BLUE} />
            ) : (
              <ImportExportIcon sx={{ fontSize: 16, color: TEXT }} />
            )}
          </Box>
        )}
      </Box>

      {showCaret && (
        <Box className="caretIcon" sx={{ display: "flex", alignItems: "center", ml: "4px" }}>
          <Box sx={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `4px solid ${TEXT}` }} />
        </Box>
      )}
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
    deliveryColor: "#006b4e",
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
    <Box sx={{ backgroundColor: "#f3f6f8", }}>
      <Box
        sx={{
          flex: 1, display: "flex", flexDirection: "column",
          overflow: "hidden", backgroundColor: "#F5F6F7",
          mx: "6px",
        }}
      >
        {/* ── Table wrapper ── */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderTop: BORDER,
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex", flexDirection: "column",
            flex: 1,
            position: "relative",
          }}
        >
          {/* Shared container to enforce identical row widths for perfect flex alignment */}
          <Box sx={{ minWidth: 1112, display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>

            {/* ── Table header ── */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "44px 88px minmax(250px, 2fr) 140px minmax(120px, 1fr) 110px 110px 140px 110px",
                height: "52px",
                backgroundColor: "#ffffff",
                borderBottom: BORDER,
                flexShrink: 0,
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
                  width: 88, minWidth: 88, height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "flex-start", px: "10px",
                  borderRight: BORDER, flexShrink: 0, gap: "4px", cursor: "pointer",
                }}
              >
                <Typography sx={{ fontFamily: FONT, fontSize: "13px", fontWeight: 700, color: TEXT }}>
                  Off...
                </Typography>
                <ImportExportIcon sx={{ fontSize: 16, color: TEXT }} />
              </Box>

              {/* Campaign */}
              <Box sx={{ flex: 2, minWidth: 250, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Campaign" />
              </Box>

              {/* Delivery */}
              <Box sx={{ width: 140, minWidth: 140, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Delivery" sortActive />
              </Box>

              {/* Actions */}
              <Box sx={{ flex: 1, minWidth: 120, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Actions" showSort={false} />
              </Box>

              {/* Results */}
              <Box sx={{ width: 110, minWidth: 110, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Results" info />
              </Box>

              {/* Cost per result */}
              <Box sx={{ width: 110, minWidth: 110, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Cost per result" wrap />
              </Box>

              {/* Budget */}
              <Box sx={{ width: 140, minWidth: 140, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Budget" />
              </Box>

              {/* Amount spent */}
              <Box sx={{ width: 110, minWidth: 110, flexShrink: 0, height: "100%", px: "10px", display: "flex", alignItems: "center", justifyContent: "flex-end", borderRight: BORDER }}>
                <Typography sx={{ fontFamily: FONT, fontSize: "13px", fontWeight: 700, color: TEXT }}>
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
                    display: "grid",
                    gridTemplateColumns: "44px 88px minmax(250px, 2fr) 140px minmax(120px, 1fr) 110px 110px 140px 110px",
                    height: "52px",
                    backgroundColor: rowBg,
                    borderBottom: BORDER,
                    transition: "background-color 0.15s",
                    cursor: "default",
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
                      display: "flex", alignItems: "center", justifyContent: "flex-start",
                      px: "10px",
                      borderRight: BORDER, flexShrink: 0,
                    }}
                  >
                    <CampaignToggle checked={row.on} />
                  </Box>

                  {/* Campaign name */}
                  <Box
                    sx={{
                      flex: 2, minWidth: 250,
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
                      width: 140, minWidth: 140, flexShrink: 0,
                      display: "flex", alignItems: "center",
                      px: "10px", borderRight: BORDER, gap: "6px",
                    }}
                  >
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${row.deliveryColor}`, flexShrink: 0 }} />
                    <T sx={{ fontSize: "13px", color: TEXT }}>{row.delivery}</T>
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
                      width: 110, minWidth: 110, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>—</T>
                  </Box>

                  {/* Cost per result */}
                  <Box
                    sx={{
                      width: 110, minWidth: 110, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>—</T>
                  </Box>

                  {/* Budget */}
                  <Box
                    sx={{
                      width: 140, minWidth: 140, flexShrink: 0,
                      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ fontSize: "13px" }}>{row.budget}</T>
                    {row.budgetSub && (
                      <T sx={{ fontSize: "12px", color: MUTED, mt: "1px" }}>{row.budgetSub}</T>
                    )}
                  </Box>

                  {/* Amount spent */}
                  <Box
                    sx={{
                      width: 110, minWidth: 110, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      px: "10px", borderRight: BORDER,
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
                display: "grid",
                gridTemplateColumns: "44px 88px minmax(250px, 2fr) 140px minmax(120px, 1fr) 110px 110px 140px 110px",
                height: "40px",
                borderBottom: BORDER,
                backgroundColor: "#fff",
                flexShrink: 0,
              }}
            >
              {/* Span across Checkbox, Off/On, and Campaign */}
              <Box
                sx={{
                  gridColumn: "1 / 4",
                  display: "flex", alignItems: "center", justifyContent: "flex-end",
                  px: "10px", gap: "6px",
                  borderRight: BORDER,
                }}
              >
                <T sx={{ fontSize: "14px", color: TEXT }}>Results from {campaigns.length} campaign</T>
                <Info size={14} color={TEXT} style={{ cursor: "pointer", fontWeight: 600, }} />
              </Box>
            </Box>

            {/* ── Remaining space: white to match reference ── */}
            <Box sx={{ flex: 1, backgroundColor: "#ffffff" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
