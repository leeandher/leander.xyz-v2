import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import {
  FaGithub,
  FaStackOverflow,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"

import { media, themer } from "../../../styles/helpers"

const CardWrapper = styled.div`
  background: ${themer("shade.lightest")};
  position: relative;
  &:active {
    box-shadow: 0;
  }
  &:before {
    content: "My Business Card";
    background: ${themer("accent")};
    position: absolute;
    padding: 1rem 2rem;
    font-weight: bold;
    z-index: 1000;
    transform: rotate(-15deg);
    top: -15px;
    left: -30px;
  }
  max-width: 650px;
  padding: 1.5rem;
  border-radius: 1.5rem;
  display: grid;
  grid-template-columns: 250px repeat(4, 1fr);
  grid-template-rows: 50px 25px 125px 50px;
  justify-items: start;
  align-items: center;
  ${media.tablet`
    transform: scale(0.8);
  `}
`
const CardImage = styled(Img)`
  grid-area: 1 / 1 / 6 / 1;
  max-width: 100%;
  height: 100%;
  border-radius: 1rem;
`

const CardHeader = styled.h1`
  display: block;
  grid-area: 1 / 2 / 1 / 6;
  padding-left: 1.5rem;
  margin: 0;
  font-weight: 300;
  font-size: 2.75rem;
  span {
    font-weight: 500;
    text-decoration: underline ${themer("accent")};
  }
  ${media.tablet`
    font-size: 2.25rem;
  `}
`

const CardSubtitle = styled.h2`
  display: block;
  grid-area: 2 / 2 / 2 / 6;
  margin: 0;
  margin-left: 1.5rem;
  font-weight: 300;
  font-size: 1.5rem;
  letter-spacing: 2px;
  width: calc(100% - 1.5rem);
  height: 100%;
  border-bottom: 2px solid ${themer("accent")};
  span {
    font-weight: 500;
    text-decoration: underline ${themer("accent")};
  }
`

const CardTitles = styled.div`
  padding-left: 3rem;
  grid-area: 3 / 2 / 3 / 3;
  font-weight: 500;
  font-size: 1.5rem;
  p {
    margin: 0;
    margin-bottom: 0.75rem;
  }
`

const CardValues = styled.div`
  padding-left: 4rem;
  grid-area: 3 / 3 / 3 / 6;
  font-weight: 300;
  font-size: 1.5rem;
  p {
    margin: 0;
    margin-bottom: 0.75rem;
  }
`

const CardAnchorLink = styled.a`
  display: block;
  grid-area: 4 / ${({ order }) => order + 1} / 5 / ${({ order }) => order + 1};
  justify-self: center;
  color: ${themer("accent")};
  border-radius: 100%;
  line-height: 0;
  font-size: 2.5rem;
  ${({ theme }) => theme.transition.default("background")};
  svg {
    margin: 1rem;
  }
  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
    color: ${themer("shade.lightest")};
    background: ${themer("accent")};
  }
`

const BusinessCard = props => {
  const {
    file: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query PROFILE_IMAGE_QUERY {
      file(relativePath: { eq: "profile_pic.jpg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <CardWrapper {...props}>
      <CardImage fixed={fixed} />
      <CardHeader>
        Hi, I'm <span>Leander Rodrigues</span>
      </CardHeader>
      <CardSubtitle>Full-stack Web Developer</CardSubtitle>
      <CardTitles>
        <p>Age</p>
        <p>Location</p>
        <p>Email</p>
      </CardTitles>
      <CardValues>
        <p>20 years old</p>
        <p>Toronto, ON</p>
        <p>me@leander.xyz</p>
      </CardValues>
      <CardAnchorLink order={1} href="https://github.com/leeandher">
        <FaGithub />
      </CardAnchorLink>
      <CardAnchorLink
        order={2}
        href="https://stackoverflow.com/users/story/10996907?view=Timeline"
      >
        <FaStackOverflow />
      </CardAnchorLink>
      <CardAnchorLink
        order={3}
        href="https://www.linkedin.com/in/leander-rodrigues/"
      >
        <FaLinkedin />
      </CardAnchorLink>
      <CardAnchorLink order={4} href="https://twitter.com/LeeAndHer">
        <FaTwitter />
      </CardAnchorLink>
    </CardWrapper>
  )
}

export default BusinessCard
