import  { Box, Typography, Button, styled } from '@mui/material';
import { Search } from 'lucide-react';

const StyledButton = styled(Button)({
  borderRadius: '4px',
  textTransform: 'none',
  fontWeight: 'normal',
  padding: '8px 20px',
  fontSize: '14px'
});

export default function EmptyState() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      py: 10,
      bgcolor: '#f8f9fa',
      height: '50vh'
    }}>
      {/* <Box 
        component="img"
        src="https://images.unsplash.com/photo-1607703703520-bb638e84caf2?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzJTIwVUl8ZW58MHx8fHwxNzQ4OTI3MjUyfDA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800"
        alt="Marketing analytics whiteboard"
        sx={{
          width: 200,
          height: 130,
          objectFit: 'cover',
          borderRadius: 2,
          mb: 3
        }}
      /> */}
      
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        Get set up to run ads
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 3, color: '#666', textAlign: 'center', maxWidth: 450 }}>
        Confirm a few details in Account overview so that you can publish your first ad campaign.
      </Typography>
      
      <StyledButton variant="contained" sx={{ bgcolor: '#1976d2' }}>
        Go to Account overview
      </StyledButton>
    </Box>
  );
}
  