"use client"; // This is a client component

import React from 'react';
import quiz from '../utils/quiz.json';
import style from '../styles/menu.module.css';
import Link from 'next/link';

export default function Page() {
    return (  
    <section className={style.container_menu}>
      <div className={style.box_menu}>
        <div className={style.progress_bar}>
          <div className={style.progress}></div>
        </div>
        <h1 className={style.title}>Zeus Quiz</h1>
        <h4 className={style.subtitle}>Escolha o quiz que deseja responder abaixo:</h4>
        <div className={style.box_btn}>
          {
            quiz.objQuiz.map((e,index) => {
              {
                return (
                  <div key={index} className={style.menu_item}>
                    <Link href={`/${index}`} className={style.btn_menuItem} >
                      {e.slug}
                    </Link>
                    <Link href={`/${index}`} className={style.btn_menlink_menuItemuItem}> {e.title} </Link>
                  </div>
                )
              }
            })
              
          }
        </div>
      </div>
    </section>
    )
  }