import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'
import axios from 'axios'


import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import background from '../icons/Ecommerce0Cliche.png'
import Zero from '../../headers/icons/ZeroClichê.png'
import Slider from '../Slider/Slider'




function Login() {
    
    const [usuario, setUsuario] = useState({
        email: '', senha: ''
    })

    const onChange = e =>{
        const {name, value} = e.target
        setUsuario({...usuario, [name]: value})
    }
    const submitHandle = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login',{...usuario})
            localStorage.setItem('primeiroLogin', true)
            window.location.href = '/'
        } catch (err) {
            alert(err.response.data.msg)
            
        }
    }
    function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
      const useStyles = makeStyles((theme) => ({
        root: {
          height: '100vh',
        },
       /* image: {
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },*/
        paper: {
          margin: theme.spacing(8, 4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      
        const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} /*className={classes.image}*/ >
        <Slider />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          
          <img src={Zero} alt='ZeroClichê' width='120' className='zero'/>
          
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={submitHandle} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email "
              name="email"
              autoComplete="email"
              autoFocus
              value={usuario.email} 
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="senha"
              id="password"
              value={usuario.senha} 
              onChange={onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="#FFDAB9"
              id='btn_login'
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link to='/registro'>
                  {"Você não possui conta? Registre-se"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    )
}
export default Login

/* <div className='login'>
            <form onSubmit={submitHandle}>
                <h2>Login</h2>
                <input type='email' name='email' required placeholder='email' value={usuario.email} onChange={onChange}/>
                <input type='senha' name='senha' required placeholder='senha' value={usuario.senha} onChange={onChange}/>
                <div className='row'>
                    <Button type='submit'>Login</Button>
                    <Link to='/registro'>Registro</Link>
                </div>
            </form>
        </div>*/