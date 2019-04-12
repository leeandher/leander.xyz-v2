import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"

import Page from "../components/Page"
import Button from "../components/Button"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaSection,
  MediaPostContent,
} from "../components/page-specific/Media"

const PageLink = styled(Link)`
  padding: 2rem;
  display: block;
  text-align: left;
  font-style: italic;
  font-weight: bold;
  margin: 1rem 2rem;
  &:after {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.accent};
    height: 10%;
    top: 100%;
  }
`

const NoteCategoryTemplate = ({ data, location }) => {
  const { markdownRemark, allFile } = data
  const { html } = markdownRemark
  const { distinct: noteTitles } = allFile
  const noteTitleSlugs = noteTitles.map(
    noteTitle => `${location.pathname}/${slugify(noteTitle, { lower: true })}`
  )
  return (
    <Page
      accent="random"
      accentBg
      title="Writing is hard"
      design="bubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <MediaHeader>
        <Button>
          <Link to="/notes">&lt;-- /notes</Link>
        </Button>
      </MediaHeader>
      <MediaSection>
        <ContentWrapper>
          <MediaContent dangerouslySetInnerHTML={{ __html: html }} />
          <MediaPostContent>
            {noteTitles.map((noteTitle, i) => (
              <PageLink key={noteTitle} to={noteTitleSlugs[i]}>
                {noteTitle}
              </PageLink>
            ))}
          </MediaPostContent>
        </ContentWrapper>
      </MediaSection>
    </Page>
  )
}

export default NoteCategoryTemplate

export const noteQuery = graphql`
  query($absolutePath: String!, $relativeDirectory: String!) {
    markdownRemark(fileAbsolutePath: { eq: $absolutePath }) {
      html
    }
    allFile(
      filter: {
        relativeDirectory: { eq: $relativeDirectory }
        name: { ne: "README" }
      }
    ) {
      distinct(field: name)
    }
  }
`
