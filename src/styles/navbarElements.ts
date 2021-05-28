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
  @media (max-width: 1400px) {
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

  @media (max-width: 1400px) {
    width: 100vw;
  }
  span {
    font-size: 30px;
    @media only screen and (max-width: 1400px) {
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

    &:hover {
      color: #0dadea;
    }
  }
  li {
    cursor: pointer;
    margin: 1.9rem;
  }
  @media (max-width: 1400px) {
    flex-flow: column nowrap;
    background-color: #fdfdfdfa;
    position: fixed;
    transform: ${props => (props.open ? "translateX(0)" : "translateX(100%)")};
    top: -16px;
    font-size: 1.1em;
    right: 0;
    height: 100%;
    width: 170px;
    padding-top: 5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 11;
    justify-content: normal;
    a {
      margin-right: 18%;
    }
    li {
      color: #000;
      text-align: center;
      width: 90px;
      &:hover {
        color: #0dadea;
      }
    }
  }
`;

export const UserMenu = styled.div`
  margin-right: 2%;
  margin-left: 2%;
  width: 145px;
  border-radius: 5px;
  text-align: center;
  color: #ffffff;
  @media (max-width: 1400px) {
    margin-top: 10%;
    margin-right: 18%;
    margin-bottom: 10%;
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
  margin: auto;
  display: none;
  @media (max-width: 1400px) {
    margin-bottom: 10%;
    display: flex;
    width: 140px;
    height: 80px;
    object-fit: contain;
  }
`;

export const LoginButton = styled.div`
  @media (max-width: 1400px) {
    display: flex;
    width: 160px;
  }
`;
