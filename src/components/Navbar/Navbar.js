import React, { useEffect } from "react";
import "./navbar.scss";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Link from "@mui/material/Link";

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Navbar = () => {
	const pages = [
		{ name: "Home", url: "/" },
		{ name: "Likes", url: "/likes" },
	];

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [themeSwitch, setThemeSwitch] = React.useState(false);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const MaterialUISwitch = styled(Switch)(({ theme }) => ({
		width: 62,
		height: 34,
		padding: 7,
		"& .MuiSwitch-switchBase": {
			margin: 1,
			padding: 0,
			transform: "translateX(6px)",
			"&.Mui-checked": {
				color: "#fff",
				transform: "translateX(22px)",
				"& .MuiSwitch-thumb:before": {
					backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
						"#fff"
					)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
				},
				"& + .MuiSwitch-track": {
					opacity: 1,
					backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
				},
			},
		},
		"& .MuiSwitch-thumb": {
			backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
			width: 32,
			height: 32,
			"&:before": {
				content: "''",
				position: "absolute",
				width: "100%",
				height: "100%",
				left: 0,
				top: 0,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					"#fff"
				)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
			},
		},
		"& .MuiSwitch-track": {
			opacity: 1,
			backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
			borderRadius: 20 / 2,
		},
	}));

	const handleThemeSwitch = () => {
		let body = document.getElementsByTagName("body");

		if (localStorage.getItem("nasa-apod_theme") === null) {
			localStorage.setItem("nasa-apod_theme", "dark");
			body[0].setAttribute("data-theme", "dark");
		} else if (localStorage.getItem("nasa-apod_theme") === "dark") {
			localStorage.setItem("nasa-apod_theme", "light");
			body[0].setAttribute("data-theme", "light");
		} else {
			localStorage.setItem("nasa-apod_theme", "dark");
			body[0].setAttribute("data-theme", "dark");
		}
	};

	useEffect(() => {
		let body = document.getElementsByTagName("body");

		if (localStorage.getItem("nasa-apod_theme") === null) {
			setThemeSwitch(false);
			body[0].setAttribute("data-theme", "light");
		} else if (localStorage.getItem("nasa-apod_theme") === "dark") {
			setThemeSwitch(true);
			body[0].setAttribute("data-theme", "dark");
		} else {
			setThemeSwitch(false);
			body[0].setAttribute("data-theme", "light");
		}
	}, []);

	return (
		<AppBar position="sticky" className="space-navbar">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
						<TravelExploreIcon style={{ fontSize: "32px" }} />
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<Link href={page.url} key={page.name}>
									<MenuItem onClick={handleCloseNavMenu}>{page.name}</MenuItem>
								</Link>
							))}

							<FormGroup>
								<FormControlLabel
									control={
										<MaterialUISwitch sx={{ m: 1 }} onClick={() => handleThemeSwitch()} defaultChecked={themeSwitch} />
									}
									label="Switch Light Mode"
								/>
							</FormGroup>
						</Menu>
					</Box>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<TravelExploreIcon style={{ fontSize: "32px" }} />
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Link
								href={page.url}
								sx={{
									color: "#fff",
									textDecoration: "none",
								}}
								key={page.name}
							>
								<Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", textDecoration: "none" }}>
									{page.name}
								</Button>
							</Link>
						))}
					</Box>
					<Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
						<FormGroup>
							<FormControlLabel
								control={
									<MaterialUISwitch sx={{ m: 1 }} onClick={() => handleThemeSwitch()} defaultChecked={themeSwitch} />
								}
								label="Switch Light Mode"
							/>
						</FormGroup>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
