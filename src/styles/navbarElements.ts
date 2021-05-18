import styled from "styled-components";

interface INav {
  open: boolean;
  href?: string;
}

export const StyledBurger = styled.div<INav>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  font-family: "Zilla Slab";
  @media (max-width: 1280px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${props => (props.open ? "#000" : "#000")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;
    &:nth-child(1) {
      transform: ${props => (props.open ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      transform: ${props => (props.open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${props => (props.open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${props => (props.open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const Nav = styled.nav`
  font-family: "Zilla Slab";
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  align-items: center;
  position: relative;

  @media (max-width: 1280px) {
    width: 100vw;
  }
  span {
    font-size: 30px;
    @media only screen and (max-width: 1280px) {
      font-size: 20px;
      :nth-child(2) {
        font-size: 16px !important;
        margin-top: 0px !important;
      }
    }
  }
`;

export const Ul = styled.ul<INav>`
  font-family: "Zilla Slab";
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  width: 90%;
  top: 0;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.45em;

  a {
    text-decoration: none;
    text-transform: none;
    width: auto;
    color: #000;
    cursor: pointer;
    &:hover {
      color: #0dadea;
    }
  }
  li {
    margin: 2em;
  }
  @media (max-width: 1280px) {
    flex-flow: column nowrap;
    background-color: #fdfdfdfa;
    position: fixed;
    transform: ${props => (props.open ? "translateX(0)" : "translateX(100%)")};
    top: -16px;
    font-size: 1.1em;
    right: 0;
    height: 100%;
    width: 180px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 11;
    justify-content: normal;
    li {
      color: #000;
      margin-right: 90px;
      &:hover {
        color: #0dadea;
      }
    }
  }
`;

export const Logo = styled.img`
  margin: 0px 50px 8px 7%;
  width: 130px;
  z-index: 10;
  @media (max-width: 1250px) {
    margin: 20px 50px 20px 7%;
  }
`;

export const LogoUl = styled.img`
  margin: 20px 50px 20px 5%;
  display: none;
  @media (max-width: 980px) {
    display: flex;
    width: 160px;
    height: 80px;
    object-fit: contain;
  }
`;

export const LoginButton = styled.div`
  @media (max-width: 980px) {
    margin-right: 30px;
    display: flex;
    width: 160px;
  }
`;
