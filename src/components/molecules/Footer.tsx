import React from "react";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import QRCode from "react-qr-code";
import { makeStyles, Theme } from "@material-ui/core/styles";
import FooterComponents from "../atoms/FooterComponents";

const useStyles = makeStyles((theme: Theme) => ({
  codeQR: {
    marginLeft: "1.5%",
  },
  mainIconsGrid: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "20%",
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: "25%",
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "25%",
    },
  },
  youtubeIcon: {
    paddingLeft: "80%",
  },
  githubIcon: {
    paddingLeft: "90%",
  },
  copyRight: {
    textAlign: "center",
    color: "white",
    marginTop: "4%",
    fontSize: 18,
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <FooterComponents.Wrapper>
        <FooterComponents.Row>
          <FooterComponents.Column>
            <FooterComponents.Title>About Us</FooterComponents.Title>
            <FooterComponents.Link href="#">Story</FooterComponents.Link>
            <FooterComponents.Link href="#">Clients</FooterComponents.Link>
            <FooterComponents.Link href="#">Testimonials</FooterComponents.Link>
            <FooterComponents.Link target="_blank" href={process.env.REACT_APP_ENTERTAINMENT_LINK}>
              Entertainment
            </FooterComponents.Link>
          </FooterComponents.Column>
          <FooterComponents.Column>
            <FooterComponents.Title>Services</FooterComponents.Title>
            <FooterComponents.Link href="#">Marketing</FooterComponents.Link>
            <FooterComponents.Link href="#">Consulting</FooterComponents.Link>
            <FooterComponents.Link href="#">Development</FooterComponents.Link>
            <FooterComponents.Link href="#">Design</FooterComponents.Link>
          </FooterComponents.Column>
          <FooterComponents.Column>
            <FooterComponents.Title>Contact Me</FooterComponents.Title>
            <FooterComponents.PhoneNumber> +48 535 385 263</FooterComponents.PhoneNumber>
            <div className={classes.codeQR}>
              <QRCode value="tel:+48 535 385 263" level="L" size={180} />
            </div>
          </FooterComponents.Column>
          <FooterComponents.Column>
            <FooterComponents.Title>Social</FooterComponents.Title>
            <Grid className={classes.mainIconsGrid} container spacing={0}>
              <Grid container item xs={4} spacing={1}>
                <FooterComponents.Link
                  href="https://www.facebook.com/pawel.kapusta.50"
                  target="_blank">
                  <FacebookIcon />
                  <p>Facebook</p>
                </FooterComponents.Link>
                <FooterComponents.Link
                  href="https://www.instagram.com/pawel.sony/?hl=pl"
                  target="_blank">
                  <InstagramIcon />
                  <p>Instagram</p>
                </FooterComponents.Link>
              </Grid>
              <Grid container item xs={4} spacing={1}>
                <FooterComponents.Link
                  href="https://www.youtube.com/channel/UCulp9rimI0x3rUUyDTgW0EQ"
                  target="_blank">
                  <div className={classes.youtubeIcon}>
                    <YouTubeIcon />
                    <p>Youtube</p>
                  </div>
                </FooterComponents.Link>
                <FooterComponents.Link href="https://github.com/PawelKapusta" target="_blank">
                  <div className={classes.githubIcon}>
                    <GitHubIcon />
                    <p>GitHub</p>
                  </div>
                </FooterComponents.Link>
              </Grid>
            </Grid>
          </FooterComponents.Column>
        </FooterComponents.Row>
        <p className={classes.copyRight}>Copyright ©2021 All rights reserved </p>
      </FooterComponents.Wrapper>
    </div>
  );
};

export default Footer;
