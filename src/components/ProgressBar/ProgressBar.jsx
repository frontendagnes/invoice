import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ProgressBar({ uploading, uploadProgress }) {
  return (
    <>
      {uploading && (
        <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#4caf50",
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
            <Box sx={{ minWidth: 45 }}>
              <Typography variant="body2" color="text.secondary">
                {`${uploadProgress}%`}
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            Przesyłanie...
          </Typography>
        </Box>
      )}
    </>
  );
}

export default ProgressBar;
