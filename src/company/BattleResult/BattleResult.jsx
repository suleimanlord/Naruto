import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userLose, userWin } from "../../store/company/companyActions";

const BattleResult = ({ resultModal, cardsForBattle }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userWin(id));
    dispatch(userLose(cardsForBattle));
  }, [resultModal]);

  return (
    <div>
      {resultModal && (
        <>
          {resultModal === 1 ? (
            <div>
              <h1>Победа</h1>
              <p>
                Поздравляю, вы стали на шаг ближе к становлению Хокаге (+1 к
                уровню)
              </p>
              <Link to="/company">Вернуться</Link>
            </div>
          ) : (
            <div>
              <h1>Поражение</h1>
              <p>К сожалению вы потеряли половину своих очков</p>
              <Link to="/company">Вернуться</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BattleResult;
