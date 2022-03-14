import React from "react";
import Image from "next/image";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.foterIner}>
        <div className={style.item}>
          <a href="http://localhost:3000/" className={style.itemLink}>
            <Image
              src="/subjectIcon.png"
              alt="subject-icon"
              width="32"
              height="32"
            />
            <span className={style.itemText}>Предметы</span>
          </a>
        </div>
        <div className={style.item}>
          <a href="#" className={style.itemLink}>
            <Image
              src="/controlIcon.png"
              alt="control-icon"
              width="32"
              height="31"
            />
            <span className={style.itemText}>Контроль</span>
          </a>
        </div>
        <div className={style.item}>
          <a href="#" className={style.itemLink}>
            <Image
              src="/cabinetIcon.png"
              alt="cabinet-icon"
              width="24"
              height="27"
            />
            <span className={style.itemText}>Кабинет</span>
          </a>
        </div>
      </div>
    </div>
  );
}
