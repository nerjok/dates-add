"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  background-color: hsl(0, 0%, 100%);
  padding: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f0f4ff;
    box-shadow: 6px 6px 12px -3px #6e6e6e;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    transform: translate(0, -0.025rem) rotate(0) skew(0) skewY(0) scaleX(1)
      scaleY(1);
  }
  text-align: center;
  border: 1px solid hsl(214.3 31.8% 91.4%);
  border-radius: 0.5rem;
  min-width: 20rem;
`;

export const IconStyle = styled.span`
  font-size: 1.5rem;
  line-height: 2rem;
`;

export const IconDiv = styled.div`
  width: 4rem;
  height: 4rem;
  background-image: linear-gradient(to right, #3b82f6, #ec4899);
  margin-left: auto;
  margin-right: auto;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type TestimonialsDivProps = {
  $bgColor?: string; // optional prop
};

export const TestimonialsDiv = styled.div<TestimonialsDivProps>`
  width: 3rem;
  height: 3rem;
  background: ${(props) => props.$bgColor || "pink"};
  margin-left: auto;
  margin-right: auto;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Category({
  children,
  link,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
  link: string;
}) {
  const t = useTranslations();
  return (
    <Container className={className}>
      <IconDiv>
        <IconStyle>{children}</IconStyle>
      </IconDiv>
      <div>
        <h3>
          <Link href={link}>{t(link)}</Link>
        </h3>
      </div>
      <i>{t("find_connection")}</i>
    </Container>
  );
}
