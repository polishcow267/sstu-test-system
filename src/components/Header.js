import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";


import Home from '../pages/Home';
import Tests from '../pages/Tests';
import Attestation from '../pages/Attestation';
import ActiveTest from '../pages/ActiveTest';
import Result from '../pages/Result';
import Guid from '../pages/Guid';

import setAuthTokenStored from '../components/setTokenStored';
import Spinner from '../components/Spinner';

export default function Header() {
    
    setAuthTokenStored();

    /* авторизация через модальное окно */
    const [auth, setAuth] = React.useState(false);
    const [open, setOpenAuthorization] = React.useState(false);
    const [open1, setOpenRegistration] = React.useState(false);
    const [status, setStatus] = React.useState('EXTERNAL');
    const [open2, setOpenRemind] = React.useState(false);
    const [open3, setOpenWrongPass] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const baseURL = "https://maile.fita.cc";

    useEffect(() => {
        localStorage.getItem("accessToken") ? setAuth(true) : setAuth(false);
    }, []);

    const handleClickOpenAuthorization = () => {
        setOpenAuthorization(true);
    }
    const handleCloseAuthorization = () => {
        setOpenAuthorization(false);
    }
    const handleClickOpenRegistration = () => {
        setOpenRegistration(true);
    }
    const handleCloseRegistration = () => {
        setOpenRegistration(false);
    }

    const handleClickOpenRemind = () => {
        setOpenRemind(true);
    }
    const handleCloseRemind = () => {
        setOpenRemind(false);
    }

    const handleCloseWrongPass = () => {
        setOpenWrongPass(false);
    }

    const [open4, setFastCloseWarn] = React.useState(false);
    const handleClosefastExit = () => {
        setFastCloseWarn(true);
    }
    const handleClose2 = () => {
        setFastCloseWarn(false);
    }
    const handleAccept2 = () => {
        setFastCloseWarn(false);
        handleExit();
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handleRegistr = () => {   //Запрос регистрации ДОБАВИТЬ ЗАЩИТУ ДАННЫХ
        setLoading(true);
        const regPayload = {
            "firstName": document.getElementById("name1_reg").value,
            "lastName": document.getElementById("name2_reg").value,
            "patronymic": document.getElementById("name3_reg").value,
            "birthdate": document.getElementById("date_reg").value,
            "email": document.getElementById("mail_reg").value,
            "status": document.getElementById("status_reg").value,
            "workPlace": document.getElementById("status_reg").value
        }
        console.log(regPayload);

        axios.post(baseURL + '/waitlist', regPayload)
            .then(function (response) {
                console.log(response);
                setLoading(false);
            })
            .catch((err) => {
                /*if (err.toJSON().status === 500) { //пользователь существует
                }*/
                console.log(err);
                setLoading(false);
            });
        setOpenRegistration(false);
    }

    const handleAuth = () => {  //Запрос авторизации
        setLoading(true); 
        const loginPayload = {
            "login": document.getElementById("name_login").value.trim(),
            "password": document.getElementById("pass_login").value.trim()
        }
        //console.log(loginPayload);
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];

        axios.post(baseURL + '/auth/login', loginPayload)
            .then(function (response) {
                //console.log(response);
                const token = response.data.accessToken;
                localStorage.setItem("accessToken", token);
                setAuthTokenStored();
                setAuth(true);
                //console.log(token);

                //setAuthToken(token);
                //localStorage.getItem("token") ? flag=true : flag=false

                setLoading(false);
            })
            .catch((err) => {
                if (err.toJSON().status === 500) {
                    setOpenWrongPass(true);
                }
                console.log(err);
                setLoading(false);
            });
        setOpenAuthorization(false);
    }

    const handleExit = () =>
    {
        localStorage.clear();
        setAuth(false);
        window.location.href = 'http://localhost:3000/';
    }

    const StyleButton = withStyles({
        root: {
          width: '93%',
          height: '50px',
          backgroundColor: '#0059A8',
          borderRadius: '30px',
          color: "white",
          textTransform: "none",
          fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'].join(','),
          fontSize: "1rem",
          marginTop: "10px",
          marginBottom: "15px",
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#0372D4',
          },
          '&:active': {
            backgroundColor: '#0059A8',
          },
          '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
          },
        },
      })(Button);

      const AskButton = withStyles({
        root: {
            color: "#0059A8",
            textTransform: 'none',
            },
      })(Button);
      const AskRegButton = withStyles({
        root: {
          color: "#0059A8",
          textTransform: "none",
          fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'].join(','),
          fontSize: "1rem",
          marginTop: "-15px",
          marginBottom: "15px",
          fontWeight: 700,
            },
      })(Button);

      const AskActions = withStyles({
        root: {
            display: "flex",
            justifyContent: 'right',
            marginRight: '15px',
            marginTop: '-10px',
        },
      })(DialogActions);

      const StyleActions = withStyles({
        root: {
            display: "flex",
            justifyContent: "center",
        },
      })(DialogActions);

      const StyleAction = withStyles({
        root: {
            display: "flex",
            justifyContent: "center",
        },
      })(DialogActions);

      const StyleTitle = withStyles({
        root: {
          color: '#0059A8',
          fontSize: '2rem ',
          textAlign: "center",
          fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'].join(','),
          fontWeight: 700,
          lineHeight: 1.6,
          letterSpacing: '0.0075em',
        },
      })(DialogTitle);

      const StyleSelect = withStyles({
        root: {
            fontFamily: ['Google Sans', "Arial", "sans-serif"].join(','),
            fontSize: "20px",
            color: "#0059A8",
            borderRadius: '15px',
            boxShadow: "inset 0px 2px 3px -1px rgba(0, 0, 0, 0.15)",
        },
      })(Select);

      const StyleInputLabel = withStyles({
        root: {
            fontFamily: ['Google Sans', "Arial", "sans-serif"].join(','),
            color: "#0059A8",
        },
      })(InputLabel);
    
    /*const StyledDialog = withStyles({
        root: {
          borderRadius: '15px',
          
          
        },
      })(Dialog);
    
      const StyleDialog = styled(Dialog)({
        border: 0,
        borderRadius: '15px',
      });
*/

  return (
    <>
        <React.StrictMode>
            <header>
                <div className="container">
                    <div className="header-inner">

                          <div className="logo"><img src='../img/logowhite.png' alt="АИСТ" width="14%" />&nbsp;Система тестирования&nbsp;</div>

                        <div>
                            <nav>
                                <a className="nav-link" href="/"> &nbsp;Домашняя страница&nbsp;</a>
                                  {auth && <a className="nav-link" href="/tests"> &nbsp;Тестирование&nbsp;</a>}

                                  {!auth && <a className="nav-link in-out" onClick={handleClickOpenAuthorization}> &nbsp;Войти&nbsp; </a>}
                                  {auth && <a className="nav-link in-out" onClick={() => {
                                      if (localStorage.getItem("question_id") !== null) {
                                          setFastCloseWarn(true);
                                      }
                                      else
                                      {
                                          handleExit();
                                      }
                                  }}> &nbsp;Выйти&nbsp; </a>}
                                  <Dialog PaperProps={{
                                      style: { borderRadius: 15, width: 512, padding: '10px 18px 0 18px', }
                                  }}
                                      open={open} onClose={handleCloseAuthorization} aria-labelledby="authorization" className='styledialog'>
                                   <StyleTitle disableTypography id="authorization">Авторизация</StyleTitle> 
                                    <DialogContent>
                                        
                                        <TextField                              
                                            autoFocus
                                            margin="dense"
                                            id="name_login"
                                            placeholder="  Логин"
                                            type="text"
                                            variant="outlined"                       
                                            fullWidth
                                        /><p />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="pass_login"
                                            placeholder="  Пароль"
                                            type="password"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </DialogContent>

                                    
                                    <AskActions>
                                        <AskButton color="primary" onClick={handleClickOpenRemind} >Забыли логин или пароль?</AskButton> 
                                    </AskActions>

                                    <StyleActions>     
                                          <StyleButton variant="contained" color="primary" onClick={() => { handleAuth(); }} >Авторизоваться</StyleButton>  
                                    </StyleActions>

                                    <StyleActions>      
                                        <AskRegButton color="primary" onClick={handleClickOpenRegistration} >Регистрация</AskRegButton>   
                                    </StyleActions>
                                    
                                    
                                </Dialog>

                                <Dialog PaperProps={{
                                      style: { borderRadius: 15, width: 512, padding: '10px 18px 0 18px', }
                                  }}
                                   open={open2} onClose={handleCloseRemind} aria-labelledby="reminder">
                                   <StyleTitle disableTypography id="reminder">Восстановление данных</StyleTitle> 
                                    <DialogContent>
                                        
                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="mail_remind"
                                        placeholder="Почта"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        />
                                    </DialogContent>                      
                                    <StyleAction>
                                        <StyleButton variant="contained" color="primary" onClick={handleCloseRemind} >Напомнить данные</StyleButton>
                                    </StyleAction>
                                </Dialog>

                                <Dialog PaperProps={{
                                      style: { borderRadius: 15, width: 512, }
                                  }}
                                  open={open3} onClose={handleCloseWrongPass} aria-labelledby="warning">
                                    <StyleTitle id="warning">Ошибка</StyleTitle> 
                                    <DialogContent>
                                        <DialogContentText>Логин или пароль введены неверно.</DialogContentText>
                                    </DialogContent>
                                    <StyleAction>
                                          <StyleButton variant="contained" color="primary" onClick={() => { setOpenWrongPass(false); setOpenAuthorization(true); } } >Ввести заново</StyleButton>                           
                                    </StyleAction>
                                </Dialog>

                                <Dialog PaperProps={{
                                      style: { borderRadius: 15, width: 512, padding: '10px 18px 0 18px',}
                                  }}
                                  open={open1} onClose={handleCloseRegistration} aria-labelledby="registration">
                                   <StyleTitle disableTypography id="registration">Заявка на регистрацию</StyleTitle> 
                                    <DialogContent>
                                        
                                          <TextField
                                              autoFocus
                                              margin="dense"
                                              id="name2_reg"
                                              placeholder="  Фамилия"
                                              type="text"
                                              variant="outlined"
                                              fullWidth
                                          /><p />
                                          <TextField
                                              autoFocus
                                              margin="dense"
                                              id="name1_reg"
                                              placeholder="  Имя"
                                              type="text"
                                              variant="outlined"
                                              fullWidth
                                          /><p />                                         
                                          <TextField
                                              autoFocus
                                              margin="dense"
                                              id="name3_reg"
                                              placeholder="  Отчество"
                                              type="text"
                                              variant="outlined"
                                              fullWidth
                                          /><p />
                                        
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="mail_reg"
                                            placeholder="  Почта"
                                            type="email"
                                            variant="outlined"
                                            fullWidth
                                        /><br /><br />

                                        <StyleInputLabel htmlFor="date"> Дата рождения</StyleInputLabel>
                                        <TextField
                                            margin="dense"
                                            id="date_reg"                                        
                                            type="date"
                                            variant="outlined"                                   
                                        /><br /><br />

                                        <p><StyleInputLabel htmlFor="status"> Статус в системе</StyleInputLabel></p>
                                        <StyleSelect                                                              
                                            autoFocus
                                            value={status}
                                            onChange={handleStatusChange}
                                            inputProps={{
                                            name: 'status',
                                            id: 'status_reg',                       
                                            }}
                                            variant="outlined"
                                        >
                                            <MenuItem value="EMPLOYEE">Сотрудник СГТУ</MenuItem>
                                            <MenuItem value="STUDENT">Студент СГТУ</MenuItem>
                                            <MenuItem value="EXTERNAL">Внешний испытуемый</MenuItem>
                                        </StyleSelect><br />
                                    </DialogContent>

                                    <StyleAction>     
                                        <StyleButton variant="contained" color="primary" onClick={handleRegistr} >Подать заявку</StyleButton> 
                                    </StyleAction>

                                </Dialog>

                                <Dialog PaperProps={{
                                    style: { borderRadius: 15 }
                                }}
                                    open={open4} onClose={handleClosefastExit} aria-labelledby="time-warning">
                                    <StyleTitle disableTypography id="fastclose-warning">Предупреждение</StyleTitle>
                                    <DialogContent>
                                        <DialogContentText>Тестирование еще не завершено, вы точно хотите выйти из системы?</DialogContentText>
                                    </DialogContent>
                                    <StyleActions>
                                        <StyleButton onClick={handleAccept2} color="primary">Да</StyleButton>
                                        <StyleButton onClick={handleClose2} color="primary">Нет</StyleButton>
                                    </StyleActions>
                                </Dialog>

                                {loading && <Spinner></Spinner>}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </React.StrictMode>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/tests" element={<Tests/>} />
                <Route exact path="/attestation" element={<Attestation/>} />
                <Route exact path="/activetest" element={<ActiveTest/>} />
                <Route exact path="/Result" element={<Result/>} />
                <Route exact path="/Guid" element={<Guid/>} />
            </Routes>
        </Router>

    </>
  )
}