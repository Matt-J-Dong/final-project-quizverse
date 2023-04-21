import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
//import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        QuizVerse
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Shop() {
  const navigate = useNavigate();
  let token = 'Zappy!';
  useEffect(() => {
    try {
      token = JSON.parse(localStorage.getItem('info')).token;
    } catch {
      console.log('Oh noes!');
      navigate('/');
    }
  });
  function linkItems() {
    navigate('/items');
  }
  function linkStudy() {
    navigate('/daily-quiz');
  }
  function purchase(itemName) {
    axios
      // post new message to server
      .post('http://localhost:3001/shop', {})
      .then((response) => {
        console.log(`${itemName} purchased!`);
        return 'Logout Successful!';
      })
      .catch((err) => {
        console.log('Purchase fail!');
        return 'Oh noes big error!';
      });
  }
  return (
    <ThemeProvider theme={useTheme()}>
      <CssBaseline />
      <main>
        <div className="shop-background">
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6
            }}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom>
                Item Shop
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Redeem your coins here! Earn coins by studying everyday.
              </Typography>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" onClick={linkStudy}>
                  Study to Earn Coins
                </Button>
                <Button variant="outlined" onClick={linkItems}>
                  View my Items
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 3 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '20%'
                    }}
                    src="http://localhost:3001/static/images/QuizVerseLogo.png"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Coins x2
                    </Typography>
                    <Typography>Double your coins when studying. Cost: 50 coins.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Buy</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '20%'
                    }}
                    src="http://localhost:3001/static/images/QuizVerseLogo.png"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Time Travel Ticket
                    </Typography>
                    <Typography>
                      Go back in time to redo a daily study session. Cost: 100 coins.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Buy</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '20%'
                    }}
                    src="http://localhost:3001/static/images/QuizVerseLogo.png"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Streak Freeze
                    </Typography>
                    <Typography>
                      Protect your streak for 1 day in the future. Cost: 150 coins.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => purchase('Streak Freeze')}>
                      Buy
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
