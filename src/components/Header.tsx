import React, { useRef, useEffect } from "react";
//Styles
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTimes } from '@fortawesome/free-solid-svg-icons'

import { RootState } from "../Types";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logout } from "../redux/actions/authActions";
import gsap from "gsap";

const Header = () => {
  const HeaderRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const theme = useTheme()
  const xsdown = useMediaQuery(theme.breakpoints.down('xs'))

  const logoutHandler = () => {
    dispatch(logout());
  };
  const deleteAccountHandler = () => {
    dispatch(deleteUser(user._id))
  }
  useEffect(() => {
    gsap.fromTo(
      HeaderRef.current,
      {
        duration: 2,
        autoAlpha: 0,
        translateY: "-100%",
        ease: "circ.out",
      },
      {
        autoAlpha: 1,
        translateY: "0%",
      }
    );
  }, []);
  return (
    <AppBar
      ref={HeaderRef}
      position="fixed"
      style={{
        minHeight: "10vh",
        position: "sticky",
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(0.5rem)",
      }}
    >
      <Toolbar>
        <Typography variant={xsdown ? 'h5' : 'h4'} style={{ flex: 1 }}>
          Expense Tracker
        </Typography>
        {isAuthenticated ? (
          <>
            <Tooltip title="Logout">
              <IconButton onClick={logoutHandler}>
                <ExitToAppIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Account">
              <IconButton onClick={deleteAccountHandler}>
                <FontAwesomeIcon icon={faUserTimes} color='white' />
              </IconButton>
            </Tooltip>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
