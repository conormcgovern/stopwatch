/** @jsxImportSource @emotion/react */
import { ThemeProvider } from "@emotion/react";
import Flex from "./components/Flex";
import StopWatch from "./StopWatch";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Flex justifyContent="center">
        <StopWatch />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
