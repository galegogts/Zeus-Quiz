"use client"; // This is a client component

import React from 'react';
import RandomOrder from '../../components/random_order';
import quiz from '../../utils/quiz.json';
import style from '../../styles/quiz.module.css';
import Link from 'next/link';


export default function Page({params}) {
  const objQuiz = quiz.objQuiz[params.id];
  const objQuizLength = objQuiz ? objQuiz.quiz.length : 0;
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [questionOrder, setQuestionOrder]= React.useState(RandomOrder(objQuizLength));



  React.useEffect(() => {
    if(params.id >= quiz.objQuiz.length ){
      document.querySelector( `.${style.title}` ).innerHTML = "Nada por aqui";
      document.querySelector( `.${style.question}` ).innerHTML = "Volte para o menu!";
      document.querySelector( `.${style.box_btn} button` ).innerHTML = "Menu";
      document.querySelector( `.${style.answers}` ).innerHTML = '';
      return;
    }

    const answersLength = objQuiz.quiz[questionOrder[questionIndex]].answers.length;
    const answersOrder = RandomOrder(answersLength);

    document.querySelector( `.${style.title}` ).innerHTML = "Questão " + (questionIndex + 1);
    document.querySelector( `.${style.question}` ).innerHTML = objQuiz.quiz[questionOrder[questionIndex]].question;
    document.querySelector( `.${style.answers}` ).innerHTML = '';
    document.querySelector( `.${style.progress}` ).style.width = (((questionIndex + 1) * 100)/objQuiz.quiz.length) + '%';

    for (let i = 0; i < answersLength; i++) {
      const p = document.createElement( "p" );
      p.classList.add('btn-black-color');
      p.innerHTML = objQuiz.quiz[questionOrder[questionIndex]].answers[answersOrder[i]];
      p.onclick = function () {
        VerifyAnswer(p, objQuiz.quiz[questionOrder[questionIndex]].rightQuestion);
      };
      document.querySelector( `.${style.answers}` ).appendChild(p); 
    }
  },[questionIndex]);

  function VerifyAnswer(obj, answer){
    obj.classList.remove('btn-black-color');
    if(obj.innerHTML == answer){
      obj.classList.add('btn-primary-color');
      document.querySelector( `.${style.box_btn} .btn-nextQuestion` ).classList.remove('display-none');
    }else{
      obj.classList.add('btn-secondary-color');
    }
  }
  
  function NextQuestion(obj){
    obj.classList.add('display-none');
    if(questionIndex < objQuiz.quiz.length - 1) setQuestionIndex(questionIndex + 1);
    else{
      document.querySelector( `.${style.title}` ).innerHTML = "Parabéns!";
      document.querySelector( `.${style.question}` ).innerHTML = "Você concluiu o Quiz";
      document.querySelector( `.${style.answers}` ).innerHTML = '';
      document.querySelector( `.${style.box_btn} .btn-lastQuestion` ).classList.remove('display-none');
    }
  }

    return ( 
    <section className={style.container_quiz}>
      <div className={style.box_quiz}>
        <div className={style.progress_bar}>
          <div className={style.progress}></div>
        </div>
        <h1 className={style.title}></h1>
        <h4 className={style.question}></h4>
        <div className={style.answers}></div>
        <div className={style.box_btn}>
          <Link href={"/"} className="btn btn-black-color">
            Desistir
          </Link>
          <Link href={"/"} className="btn btn-primary-color btn-lastQuestion display-none">
            Finalizar
          </Link>
          <button className="btn btn-primary-color btn-nextQuestion display-none"  onClick={(e) => NextQuestion(e.target)}>
            Próximo
          </button>
        </div>
      </div>
    </section>
    )
  }