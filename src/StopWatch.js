/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import useStateMachine from "./useStateMachine";
import formatTime from "./formatTime";
import Button from "./components/Button";
import Flex from "./components/Flex";
import List from "./components/List";
import ListItem from "./components/ListItem";

function StopWatch() {
  const theme = useTheme();
  const interval = useRef();

  const [time, setTime] = useState(0);
  const [previousSplit, setPreviousSplit] = useState(0);
  const [laps, setLaps] = useState([]);

  const stateMachineConfig = {
    initial: "idle",
    states: {
      idle: {
        transitions: { start: "running" },
        onEntry: () => {
          setTime(0);
          clearInterval(interval.current);
          setLaps([]);
          setPreviousSplit(0);
        },
      },
      running: {
        transitions: { lap: "lapped", stop: "stopped" },
        onEntry: () => {
          interval.current = setInterval(() => {
            setTime((t) => t + 1);
          }, 100);
        },
      },
      lapped: {
        transitions: { lap: "lapped", stop: "stopped" },
        onEntry: () => {
          setLaps([currentLap, ...laps]);
          setPreviousSplit(time);
        },
      },
      stopped: {
        transitions: { start: "running", reset: "idle" },
        onEntry: () => clearInterval(interval.current),
      },
    },
  };
  const [machine, send] = useStateMachine(stateMachineConfig);
  const currentLap = time - previousSplit;

  return (
    <Flex css={{ maxWidth: 400, margin: "2rem" }}>
      <h1 css={{ textAlign: "center", width: "100%", fontSize: 42 }}>
        {formatTime(time)}
      </h1>
      <Flex spacing={2} justifyContent="space-between">
        {machine.nextEvents.includes("lap") && (
          <Button onClick={() => send("lap")}>Lap</Button>
        )}
        {machine.currentState === "idle" && <Button disabled>Lap</Button>}
        {machine.nextEvents.includes("reset") && (
          <Button onClick={() => send("reset")}>Reset</Button>
        )}
        {machine.nextEvents.includes("start") && (
          <Button bg={theme.colors.green} onClick={() => send("start")}>
            Start
          </Button>
        )}
        {machine.nextEvents.includes("stop") && (
          <Button bg={theme.colors.red} onClick={() => send("stop")}>
            Stop
          </Button>
        )}
      </Flex>
      <List css={{ marginTop: "1rem" }}>
        <ListItem>
          <Flex justifyContent="space-between">
            <span>{`Lap ${laps.length + 1}`}</span>
            <span>{formatTime(currentLap)}</span>
          </Flex>
        </ListItem>
        {laps.map((lap, index) => (
          <ListItem key={index}>
            <Flex justifyContent="space-between">
              <span>{`Lap ${laps.length - index}`}</span>
              <span>{formatTime(lap)}</span>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}

export default StopWatch;
