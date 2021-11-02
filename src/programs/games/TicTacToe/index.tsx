import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import useIsMobile from "../../../hooks/useIsMobile";

import Window from "../../../components/organisms/Window";

import { Window as WindowProps } from "../../../Redux/reducers/windows";
import TextField from "../../../components/atoms/TextField";
import Button from "../../../components/atoms/Button";

import { db, functions, httpsCallable } from '../../../firebase';

/*



*/

interface IGame {
  id: string;
  player_started: string;
  player_turn: string;
  grid: (0 | number)[][];
  status_message: string;
  players: {
    [name: string]: "X" | "O";
  };
  status: "in-progress" | "end";
}

const TicTacToe: React.FC<WindowProps> = (props) => {
  // const testGame: IGame = {
  //   id: "12345",
  //   player_started: "player1",
  //   player_turn: "player1",
  //   grid: [
  //     [0, 0, 0],
  //     [0, 0, 0],
  //     [0, 0, 0],
  //   ],
  //   status_message: "player1 won.",
  //   players: {
  //     player1: "O",
  //     player2: "X",
  //   },
  //   status: "in-progress",
  // };

  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const [game, setGame] = useState<IGame | null>(null);
  const gameId = useRef<string>();
  const playerName = useRef<string>();

  const joinGame = () => {
    const func = httpsCallable(functions, 'games-tictactoe-joinGame')
  };

  const createGame = async () => {
    const func = httpsCallable(functions, 'games-tictactoe-createGame')

    const res = await func({ name: playerName.current }).then(res => res.data);

    console.log(res)
  };

  return (
    <Window
      {...props}
      dismiss={() => dispatch({ type: "windows/kill", payload: props.id })}
      draggable
      resizable
      style={{
        minWidth: !isMobile ? 700 : undefined,
        height: 500,
      }}
    >
      {!game ? (
        <div>
          <TextField
            id="game-id"
            onChangeText={(text: string) => {
              gameId.current = text;
            }}
          ></TextField>
          <TextField
            id="player-name"
            onChangeText={(text: string) => {
              playerName.current = text;
            }}
          ></TextField>

          <Button onClick={joinGame}>Join Game</Button>

          <p>OR</p>

          <Button onClick={createGame}>Create Game</Button>
        </div>
      ) : (
        <div>
          <p>{game.id}</p>
          {game.grid.map((row, rowIndex) => {
            return (
              <div style={{ display: "flex" }}>
                {row.map((cell, cellIndex) => {
                  const markGrid = () => { };
                  return (
                    <div
                      style={{ height: 50, width: 50, borderWidth: 1, borderColor: "#000", borderStyle: "dashed" }}
                      onClick={markGrid}
                    >
                      {cell !== 0 ? game.players[cell] : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </Window>
  );
};

export default TicTacToe;
