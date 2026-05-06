/* eslint-disable eqeqeq */
/* eslint-disable no-fallthrough */
import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom";

import QShort from '../components/qa/QShort'
import QSorting from '../components/qa/QSorting'
import QMatching from '../components/qa/QMatching'
import QMultiCheckbox from '../components/qa/QMultiCheckbox'
import QMultiRadio from '../components/qa/QMultiRadio'

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default function Result() {

    //Результат теста

    let res = JSON.parse(localStorage.getItem("Result"));
    //console.log(res);
    let res_type = res.resultDisplayMethod;
    let is_multidim_test = localStorage.getItem("type") === "MULTIDIMENSIONAL" ? true : false;

    let questions, grade, grades, percent, timeH, timeM, timeS, tname, author, sw_cnt = 1, status_en;
    let q_elements = [];

    switch (res_type) {
        case "CORRECT":
            sw_cnt++;
        case "SELECTED":
            sw_cnt++;
        case "INCORRECT":
            questions = res.items;
            for (var i = 0; i < questions.length; i++) {
                switch (questions[i].status) {
                    case "pass":
                        status_en = true;
                        break;
                    case "failed":
                        status_en = false;
                        break;
                    default:
                        status_en = false;
                        break;
                }
                switch (questions[i].itemType) {
                    case "MULTIPLE_CHOICE":
                        q_elements.push(<div key={i}><QMultiRadio qname={questions[i].question} cnt={questions[i].answers.length}
                            a_arr={questions[i].answers} Qpic={questions[i].pictures[0] ?? ""} rtype={sw_cnt} status={status_en} /></div>);
                        break;
                    case "MULTIPLE_ANSWER":
                        q_elements.push(<div key={i}><QMultiCheckbox qname={questions[i].question} cnt={questions[i].answers.length}
                            a_arr={questions[i].answers} Qpic={questions[i].pictures[0] ?? ""} rtype={sw_cnt} status={status_en} /></div>);
                        break;
                    case "SORTING":
                        q_elements.push(<div key={i}><QSorting qname={questions[i].question} cnt={questions[i].answers.length}
                            a_arr={questions[i].answers} Qpic={questions[i].pictures[0] ?? ""} rtype={sw_cnt} status={status_en} /></div>);
                        break;
                    case "MATCHING":
                        q_elements.push(<div key={i}><QMatching qname={questions[i].question} cnt={questions[i].answers.length}
                            a_arr={questions[i].answers} Qpic={questions[i].pictures[0] ?? ""} rtype={sw_cnt} status={status_en} /></div>);
                        break;
                    case "TEXT":
                    case "NUMBER":
                        q_elements.push(<div key={i}><QShort qname={questions[i].question} qa={questions[i].answers[0]?.answer ?? ""}
                            correctN={questions[i].answers[0]?.correctNumber ?? ""} correctT={questions[i].answers[0]?.correctAnswer ?? ""}
                            Qpic={questions[i].pictures[0] ?? ""} rtype={sw_cnt} status={status_en} /></div>);
                    default: break;
                }
            }
        case "GRADE_ONLY": 
            grade = res.grade;
            grades = res.grades;
        //case "HIDDEN":
        default:
            timeH = Math.floor((parseFloat(res.fullTime) / (60 * 60)) % 24);
            timeM = Math.floor((parseFloat(res.fullTime) / 60) % 60);
            timeS = Math.floor(parseFloat(res.fullTime) % 60);
            tname = res.test.name;
            percent = res.percentage;
            //author = res.test.author.name;(Преп. {author})
            break;
    }//Процент выполненных заданий: {percent}%<br /><br />
    return (
        <main>
            <div className="content-block">
                <div className="result-info">
                    {res_type != "HIDDEN" &&
                    <>
                        <h1>
                            <i>{tname}<br /> <br /> Тестируемый {student}</i>
                        </h1>
                        <br /><br />
                        <span>
                            {!is_multidim_test && <>Ваша оценка: {grade}</>}
                            {is_multidim_test &&
                                grades.map(attr => (
                                    <i key={attr.name}>Ваша оценка по {attr.name}: {attr.grade}<br /></i>
                                ))
                            }
                            <br /><br />
                            
                            Время тестирования: {timeH}ч {timeM}м {timeS}с
                        </span>
                        <br /><br />
                    </>
                    }
                    <Link className="btn btn-1" to="/tests/">Закрыть</Link>
                </div>
                {q_elements && q_elements}
            </div>

        </main>
    )
}
