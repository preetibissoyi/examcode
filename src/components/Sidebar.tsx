"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Tooltip,
  CssBaseline,
  alpha,
} from "@mui/material"
import {
  Add as AddIcon,
  ViewList as ViewListIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"

const DRAWER_WIDTH = 280

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false)
    }
  }, [location.pathname, isMobile])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    {
      text: "Generate Code",
      icon: <AddIcon />,
      path: "/",
      description: "Create new exam codes",
    },
    {
      text: "View Codes",
      icon: <ViewListIcon />,
      path: "/display",
      description: "See all generated codes",
    },
    {
      text: "Mark Foil",
      icon: <AssignmentIcon />,
      path: "/markfoil",
      description: "Manage exam mark foils",
    },
  ]

  const drawer = (
    <>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: theme.palette.primary.main,
          color: "white",
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
          }
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "white",
            color: theme.palette.primary.main,
            boxShadow: theme.shadows[4],
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        >
          <SchoolIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
            Exam Portal
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Nimapara Autonomous College
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2, mt: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            px: 2, 
            mb: 2, 
            fontWeight: 600, 
            textTransform: "uppercase", 
            fontSize: "0.75rem", 
            letterSpacing: 1,
            color: theme.palette.primary.main,
          }}
        >
          Main Menu
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <Tooltip title={item.description} placement="right" arrow>
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      px: 2,
                      transition: "all 0.2s",
                      "&.Mui-selected": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.primary.main, 0.15),
                        },
                        "&::before": {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          background: theme.palette.primary.main,
                          borderRadius: '0 4px 4px 0',
                        }
                      },
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 40, 
                        color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
                        transition: 'color 0.2s',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
                      }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          display: { sm: 'none' },
          bgcolor: 'white',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            borderRight: 'none',
            boxShadow: theme.shadows[2],
            bgcolor: theme.palette.background.paper,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar
