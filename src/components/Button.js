import styled from "@emotion/styled";

const Button = styled.button(({ theme, bg }) => ({
  backgroundColor: bg?.light ? bg.light : theme.colors.grey.light,
  width: 88,
  height: 36,
  border: "none",
  borderRadius: 2,
  color: theme.colors.white,
  fontSize: 14,
  fontWeight: "bold",
  boxShadow: theme.shadows[1],
  ":hover": {
    cursor: "pointer",
    boxShadow: theme.shadows[2],
    backgroundColor: bg?.dark ? bg?.dark : theme.colors.grey.dark,
  },
  transition:
    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
}));

export default Button;
