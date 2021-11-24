import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import useIsMobile from "../../../hooks/useIsMobile";

import Window from "../../../components/organisms/Window";

import { Window as WindowProps } from "../../../Redux/reducers/windows";
import TextField from "../../../components/atoms/TextField";
import Button from "../../../components/atoms/Button";

import { dbRef, fireFunction } from '../../../firebase';
import { onValue, off } from 'firebase/database';

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
  status: "waiting" | "in-progress" | "end";
}

const TicTacToe: React.FC<WindowProps> = (props) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const [game, setGame] = useState<IGame | null>(null);
  const gameID = useRef<string>();
  const playerName = useRef<string>();

  const players = game ? Object.keys(game?.players) : [];

  React.useEffect(() => {
    return () => {
      if (game) {
        const gameRef = dbRef(`games/tictactoe/${game?.id}`)

        off(gameRef, 'value')
      }
    }
  }, [])

  const joinGame = async () => {
    if (!playerName.current) {
      alert("Please input your name")
      return
    }

    if (!gameID.current) {
      alert("Please input a game ID")
      return
    }

    const func = fireFunction('games-tictactoe-joinGame')

    const res: {
      gameID: string,
      gameData: IGame
    } = await func({ id: gameID.current, player_name: playerName.current })
      .then((res: any) => res.data).catch((err: any) => {
        alert(err.message)
      });

    if (res) {
      setGame(res.gameData)
      listenToGame(res.gameData)
    }
  };

  const createGame = async () => {
    if (!playerName.current) {
      alert("Please input your name")
      return
    }

    const func = fireFunction('games-tictactoe-createGame')

    const res: {
      gameData: IGame
    } = await func({ player_name: playerName.current }).
      then((res: any) => res.data)
      .catch((err: any) => {
        alert(err.message)
      });

    if (res) {
      setGame(res.gameData)
      listenToGame(res.gameData)
    }
  };

  const markGrid = async (x: number, y: number) => {
    if (game?.status !== 'in-progress') {
      return
    }

    if (game?.player_turn !== playerName.current) {
      return
    }

    const func = fireFunction('games-tictactoe-markGrid')

    await func({ gameID: game?.id, player_name: playerName.current, x: x, y: y })
      .catch(err => {
        alert(err.message)
      })
  }

  const listenToGame = async (game: IGame) => {
    const gameRef = dbRef(`games/tictactoe/${game.id}`)

    onValue(gameRef, (snapshot) => {
      setGame(snapshot.val())
    })
  }

  const restartGame = async () => {
    const func = fireFunction('games-tictactoe-restart')

    await func({ id: game?.id })
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
        <div className={styles.Container} style={{ marginTop: 30 }}>
          <h3>Tic Tac Toe Multiplayer</h3>
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
                      onClick={() => cell === 0 && markGrid(rowIndex, cellIndex)}
                    >
                      {cell !== 0 ? game.players[cell] : null}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {(players.length > 1 && game.status === 'end') && <Button onClick={restartGame}>Restart</Button>}
          {game.status === 'waiting' && <p style={{ fontWeight: 'bold' }}>Waiting for opponent...</p>}
          {game.status === 'in-progress' && <p>Turn: {game.player_turn}</p>}
          {game.status_message && <p style={{ fontWeight: 'bold' }}>{game.status_message}</p>}
        </div>
      )}
    </Window>
  );
};

export default TicTacToe;
