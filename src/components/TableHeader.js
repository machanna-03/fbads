import  { 
  Box, 
  Checkbox, 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell,
  TableBody,
  styled
} from '@mui/material';
import { ChevronUp, Info } from 'lucide-react';

const StyledTableCell = styled(TableCell)({
  borderBottom: '1px solid #eee',
  padding: '10px 16px',
  fontSize: '14px',
  fontWeight: 'bold'
});

export default function TableHeader() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: '60px' }}>
              <Checkbox size="small" />
            </StyledTableCell>
            <StyledTableCell>
              Off/On
            </StyledTableCell>
            <StyledTableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Campaign <ChevronUp size={14} />
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Delivery <ChevronUp size={14} color="#1976d2" />
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Bid strategy <ChevronUp size={14} />
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Budget <ChevronUp size={14} />
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Attribution setting <ChevronUp size={14} />
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Info size={14} /> Results <ChevronUp size={14} />
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              Reach
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Empty table body to show just the headers */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
  