import React from 'react'
import { graphql } from 'gatsby'

export default ({ data }) => {
  const {
    pages: { title, html, url },
  } = data

  return (
    <div id='main'>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    pages(slug: { eq: $slug }) {
      html
      title
      url
    }
  }
`
