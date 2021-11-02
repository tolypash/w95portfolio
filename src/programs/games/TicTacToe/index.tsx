import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import useIsMobile from "../../../hooks/useIsMobile";

import Window from "../../../components/organisms/Window";

import { Window as WindowProps } from "../../../Redux/reducers/windows";
import TextField from "../../../components/atoms/TextField";
import Button from "../../../components/atoms/Button";

import { dbRef, fireFunction } from '../../../firebase';
import { onValue } from 'firebase/database';

import styles from './TicTacToe.module.scss'

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
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const [game, setGame] = useState<IGame | null>(null);
  const gameID = useRef<string>();
  const playerName = useRef<string>();

  const players = game ? Object.keys(game?.players) : [];

  React.useEffect(() => {

  }, [])

  const joinGame = async () => {
    if (!playerName.current) {
      alert("Please input your name")
      return
    }

    const func = fireFunction('games-tictactoe-joinGame')

    const res: { id: string, game: IGame } = await func({ id: gameID.current, name: playerName.current }).then((res: any) => res.data);

    console.log(res)
    setGame(res.game);
  };

  const createGame = async () => {
    if (!playerName.current) {
      alert("Please input your name")
      return
    }

    const func = fireFunction('games-tictactoe-createGame')

    const res: { data: IGame } = await func({ name: playerName.current }).then((res: any) => res.data);

    setGame(res.data)
    listenToGame(res.data)
  };

  const markGrid = async () => {
    if (game?.player_turn !== playerName.current) {

    }

    const func = fireFunction('games-tictactoe-markGrid')
  }

  const listenToGame = async (game: IGame) => {
    const gameRef = dbRef(`games/tictactoe/${game.id}`)

    onValue(gameRef, (snapshot) => {
      setGame(snapshot.val())
    })
  }

  const restartGame = async () => {
    const func = fireFunction('games-tictactoe-restart')
  }

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
        <div className={styles.Container}>
          <TextField
            id="player-name"
            placeholder="Your Name"
            onChangeText={(text: string) => {
              playerName.current = text;
            }}
          />

          <Button onClick={createGame}>Create Game</Button>

          <p>- OR -</p>

          <TextField
            id="game-id"
            placeholder="Game ID"
            onChangeText={(text: string) => {
              gameID.current = text;
            }}
          />

          <Button onClick={joinGame}>Join Game</Button>
        </div>
      ) : (
        <div className={styles.Container}>
          <p>Game ID: {game.id}</p>
          <p>{players[0] + ' vs ' + (players[1] || '?')}</p>
          {game.grid.map((row, rowIndex) => {
            return (
              <div key={'row' + rowIndex} style={{ display: "flex" }}>
                {row.map((cell, cellIndex) => {
                  return (
                    <div
                      key={'row' + rowIndex + 'cell' + cellIndex}
                      className={styles.Cell}
                      onClick={markGrid}
                    >
                      {cell !== 0 ? game.players[cell] : null}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {(players.length > 1 && game.status === 'end') && <Button onClick={restartGame}>Restart</Button>}
        </div>
      )}
    </Window>
  );
};

export default TicTacToe;
