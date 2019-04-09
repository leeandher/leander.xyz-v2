import React from "react"
import { graphql } from "gatsby"
import { FaCode, FaLink } from "react-icons/fa"
import styled from "styled-components"

import Page from "../components/Page"
import Tag from "../components/Tag"
import AnchorLink from "../components/AnchorLink"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaPostContent,
  MediaPreContent,
  MediaSection,
} from "../components/page-specific/Media"

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const ProjectTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { date, title, repo, link, tech } = frontmatter
  return (
    <Page
      accent="random"
      accentBg
      title="Writing is hard"
      design="ProjectHeaderbubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <MediaHeader />
      <MediaSection>
        <ContentWrapper>
          <MediaPreContent>
            <ProjectHeader>
              <h1>
                <span>{title}</span>
              </h1>
              <div>
                <AnchorLink
                  href={repo}
                  title="Take a peek at the code! (Repository link)"
                >
                  <FaCode />
                </AnchorLink>
                <AnchorLink
                  href={link}
                  title="View the live project! (Live link)"
                >
                  <FaLink />
                </AnchorLink>
              </div>
            </ProjectHeader>
            <time>Completed: {date}</time>
          </MediaPreContent>
          <hr />
          <MediaContent
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <MediaPostContent>
            {tech.map(techName => (
              <Tag tag={techName} key={Math.random()} />
            ))}
          </MediaPostContent>
        </ContentWrapper>
      </MediaSection>
    </Page>
  )
}

export default ProjectTemplate

export const projectQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        repo
        link
        tech
      }
    }
  }
`