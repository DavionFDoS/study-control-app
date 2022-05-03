import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddSubjectBatton from "../addSubjectBatton/AddSubjectBatton";
import style from "./SubjectContent.module.scss";
import stateFormAdd from "../../store/stateFormAdd";

import { observer } from "mobx-react-lite";
import AddSubjectModal from "../addSubjectModal/AddSubjectModal";
import AddControlModal from "../addControlModal/AddControlModal";
import AddTasckModal from "../addTasckModal/AddTasckModal";

export default observer(function SubjectContent(props) {
  console.log("propsDataControl", props.data);
  let subjectCardId = props.dataFromState.subjectCardId; //id карточки дисциплины
  let subjectCardControls = props.dataFromState.controls; //id карточки дисциплины
  console.log("subjectCardControls: ", subjectCardControls);

  const [controlItem, setControlItem] = useState([]); //установка состояния props.data
  const [idControl, setIdControl] = useState(); //установка состояния

  useEffect(() => {
    if (props.data != null) {
      setControlItem(props.data);
    }
  });

  //функция удаления элемента и обнавления стейта

  console.log("props", props);
  console.log("propsDataControl", props.data);
  let data = props.data;

  //функция удаления элемента и обнавления стейта
  //регистрация формы
  const updatingDataServer = async (id, newAllData) => {
    const res = await fetch(
      `https://backend.revenant-games.online/api/controltasks/${id}`,
      {
        method: "DELETE",
      },
    );
    const respons = await res;
    if (respons.ok) {
      props.setSubject(newAllData);
    }
  };
  const removeTask = () => {
    let newAllData = data.filter(
      (controlTasks) =>
        Number(controlTasks.controlTaskId) !=
        Number(controlTasks.controlTaskId),
    );
    updatingDataServer(data.controlTaskId, newAllData);
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Список контролей</h2>

      {controlItem.map((item, key) => {
        let tasks = item.controlTasks;
        // console.log("tasks1234: ", tasks);
        return (
          <div key={item.controlId} className={style.controlWrap}>
            <h3 className={style.controlTitle}>
              {item.controlType == 0 ? "ТК - 1. " : ""}
              {item.controlType == 2 ? "ТК - 2. " : ""}
              {item.controlType == 1 ? "ПК - 1. " : ""}
              {item.controlType == 3 ? "ПК - 2. " : ""}
              Срок проведения: до: {item.deadline}
            </h3>
            {tasks.map((task) => {
              let key = task.controlTaskId;
              return (
                <div key={key} className={style.tasckWrap}>
                  {/* <input
                                        type="checkbox"
                                        className={style.tasckCheck}
                                    /> */}
                  <div className={style.tasckWrapText}>
                    <span className={style.tasckText}>{task.taskText}</span>
                  </div>
                  <div className={style.tasckButtonWrap}>
                    {/* <Image
                                            src="/calendar.png"
                                            alt="calendar-icon"
                                            width="24"
                                            height="24"
                                        /> */}

                    <Image
                      //обработчик удаления
                      src="/del.png"
                      alt="del-icon"
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
              );
            })}
            <div
              className={style.controlButtonAddWrap}
              onClick={(e) => {
                setIdControl(e.target.id);
                console.log("idControl", idControl);
                stateFormAdd.setTaskItem(item);
                stateFormAdd.setFlagFormTasck();
              }}
            >
              <button className={style.controlButtonAdd} id={item.controlId}>
                +
              </button>
            </div>
          </div>
        );
      })}
      <AddSubjectBatton
        click={() => stateFormAdd.setFlagForm()}
        addSubjectText="Добавить контроль"
      />
      {stateFormAdd.flag == true ? (
        <AddControlModal
          //передача props
          subjectCardId={subjectCardId}
          subjectCardControls={subjectCardControls}
          controlItem={controlItem}
          setControlItem={setControlItem}
        />
      ) : (
        <></>
      )}
      {stateFormAdd.flagTask == true ? (
        <AddTasckModal
          controlItem={controlItem}
          setControlItem={setControlItem}
          idControl={idControl}
        />
      ) : (
        <></>
      )}
    </div>
  );
});
