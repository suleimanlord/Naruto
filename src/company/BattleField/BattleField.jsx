import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  attackLogic,
  clearCardsForBattle,
  enemyAttackLogic,
  getCardsForBattle,
  getPowersForBattle,
} from "../../store/company/companySlice";
import {
  cleanBattleSlots,
  getOneLevel,
} from "../../store/company/companyActions";
import CardInvet from "../../components/cards/CardInvent/CardInvet";
import { useParams } from "react-router-dom";
import { getTeamPowers } from "../../helpers/functions";
import BattleResult from "../BattleResult/BattleResult";

const BattleField = () => {
  const {
    oneLevel,
    cardsForBattle,
    oneCardPower,
    enemyPower,
    step,
    resultModal,
  } = useSelector((state) => state.company);
  //   const [count, setCount] = useState(0);
  //   const [count2, setCount2] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  // console.log(cardsForBattle);

  useEffect(() => {
    dispatch(getOneLevel(id));
    dispatch(getCardsForBattle(cardsForBattle, enemyPower));
  }, []);

  useEffect(() => {
    dispatch(enemyAttackLogic());
    // if (cardsForBattle.length === 0 || enemyPower === 0) {
    // battleResult(cardsForBattle, enemyPower);
    // }
  }, [step]);

  useEffect(() => {
    if (oneLevel) {
      dispatch(
        getPowersForBattle({
          enemyTotal: oneLevel.enemy.power,
          powersArray: getTeamPowers(),
        })
      );
    }
  }, [oneLevel]);

  useEffect(() => {
    return () => {
      //   cleanBattleSlots();
      //   dispatch(clearCardsForBattle());
    };
  }, []);

  //   useEffect(() => {
  //     let totalPower = getTotalPower();
  //     if (count < totalPower) {
  //       const timer = setTimeout(() => {
  //         setCount(count + 1);
  //       }, 2000 / totalPower);
  //       return () => clearTimeout(timer);
  //     }
  //   }, [count]);

  //   useEffect(() => {
  //     if (oneLevel) {
  //       let totalPower = oneLevel.enemy.power;
  //       if (count2 < totalPower) {
  //         const timer = setTimeout(() => {
  //           setCount2(count2 + 1);
  //         }, 2000 / totalPower);
  //         return () => clearTimeout(timer);
  //       }
  //     }
  //   }, [count2, oneLevel]);

  return (
    <>
      <>
        {resultModal && (
          <BattleResult
            resultModal={resultModal}
            cardsForBattle={cardsForBattle}
          />
        )}
      </>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div>
          {oneLevel && (
            <>
              <h1 style={{ fontSize: "25px" }}>HP/Power: {enemyPower}</h1>
              <CardInvet card={oneLevel.enemy} />
            </>
          )}
        </div>
        <p style={{ fontSize: "200px" }}>VS</p>
        <div>
          <>
            {cardsForBattle.map((card, index) => (
              <div key={`card${card.id}`}>
                <h1 style={{ fontSize: "25px" }}>
                  HP/Power: {oneCardPower[index]}
                </h1>
                <CardInvet card={card} />
                <button
                  onClick={() => {
                    dispatch(attackLogic(index));
                  }}
                >
                  Attack
                </button>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
};

export default BattleField;
