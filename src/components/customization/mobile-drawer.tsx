import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

const MobileDrawer = ({steps, navigationDrawer,toggleNavigationDrawer, handleStepClick }: any) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          height: "600px",
          borderRadius: "16px 16px 0 0",
          background: "#f8f8f8",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
      anchor="bottom"
      open={navigationDrawer}
      onClose={toggleNavigationDrawer}
    >
      <List>
        <ListItem
          style={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            padding: "16px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Custom Card
        </ListItem>
        {steps.map((step:any, index:any) => (
          <ListItem
            button
            key={index}
            onClick={() => handleStepClick(index)}
            style={{
              borderBottom: "1px solid #e0e0e0",
              padding: "12px 16px",
              transition: "background 0.3s",
            }}
            sx={{
              "&:hover": {
                background: "#e0e0e0",
              },
            }}
          >
            <ListItemText primary={step.name} primaryTypographyProps={{ variant: "body2", sx: { color: "#555" } }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileDrawer;
