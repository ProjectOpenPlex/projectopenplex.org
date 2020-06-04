import React from 'react'
import { graphql } from 'gatsby'

export default ({ data }) => {
  const {
    materials: { title, html },
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
    materials(slug: { eq: $slug }) {
      html
      title
    }
  }
`
