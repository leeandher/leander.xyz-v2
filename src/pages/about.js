import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Hero from "../components/Hero"
import Page from "../components/Page"
import MainWrapper from "../components/MainWrapper"
import { Skewed } from "../components/PageSections"
import FAQ from "../components/FAQ"

const Questions = styled(Skewed)`
  padding: 10rem 0 3rem 0;
  margin: 10rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
  button {
    display: block;
    margin: 1rem auto;
    margin-top: 4rem;
  }
`

const About = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes: faqs } = allMarkdownRemark
  return (
    <Page accent="red" bgDesign="snow" seoProfile="about-page">
      <Hero expanding height="50vh">
        <h1>All About Me</h1>
      </Hero>
      <Questions skew="4deg">
        <MainWrapper maxWidth="960px">
          <h2 className="title">FAQs</h2>
          <h3 className="subtitle">
            ( People don't actually ask these,
            <br />
            this is just where I talk about myself )
          </h3>
          {faqs.map(({ html, frontmatter }) => (
            <FAQ question={frontmatter.question} key={frontmatter.question}>
              <span dangerouslySetInnerHTML={{ __html: html }} />
            </FAQ>
          ))}
        </MainWrapper>
      </Questions>
    </Page>
  )
}

export default About

export const faQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "faq" } } }) {
      nodes {
        html
        frontmatter {
          question
        }
      }
    }
  }
`
