import React from "react";
import {
  Container,
  Wrapper,
  Row,
  Column,
  Link,
  Title,
  PhoneNumber,
} from "../../styles/footerStyles";

const FooterComponents = ({ children, ...restProps }: any) => {
  return <Container {...restProps}>{children}</Container>;
};

FooterComponents.Wrapper = function FooterWrapper({ children, ...restProps }: any) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

FooterComponents.Row = function FooterRow({ children, ...restProps }: any) {
  return <Row {...restProps}>{children}</Row>;
};

FooterComponents.Column = function FooterColumn({ children, ...restProps }: any) {
  return <Column {...restProps}>{children}</Column>;
};

FooterComponents.Link = function FooterLink({ children, ...restProps }: any) {
  return <Link {...restProps}>{children}</Link>;
};

FooterComponents.Title = function FooterTitle({ children, ...restProps }: any) {
  return <Title {...restProps}>{children}</Title>;
};

FooterComponents.PhoneNumber = function FooterTitle({ children, ...restProps }: any) {
  return <PhoneNumber {...restProps}>{children}</PhoneNumber>;
};

export default FooterComponents;
