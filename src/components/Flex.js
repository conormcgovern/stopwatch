import styled from "@emotion/styled";

const Flex = styled.div(({ spacing = 1, justifyContent }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexBasis: "100%",
  gap: `${spacing}rem`,
  justifyContent: justifyContent,
}));

export default Flex;
