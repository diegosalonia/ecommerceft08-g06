import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.dark,
    width: "100%",
    overflow: "hidden",
    padding: "2em ",
    display: "flex",
    alignItems: "bottom",
  },
  link: {
    fontSize: "1.25em",
    color: "#fff",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  copylight: {
    color: "#fff",
    fontSize: "1em",
    padding: "1em"
  },
}));

const Footer = () => {
  const classes = useStyles();
  const path = [
    { name: "Home", link: "/" },
    { name: "Contact", link: "/contact" },
  ];
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justify="center">
          {path.map(({ name, link }) => (
            <Grid item key={link}>
              <Link href={link}>
                <Typography
                  className={classes.link}
                >
                  {name}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          container
          justify="center"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography className={classes.copylight}>
            &copy; Copyright The SpecialGarden {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
