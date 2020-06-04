/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const addRedirect = (title, slug, toPath) => {
    // Replace non alpha numeric chars and double dashes with single dashes
    const cleanTitle = title.replace(/[^a-z0-9-_]+/gi, '-').replace(/--+/g, '-')
    const cleanTo = `/${toPath}`.replace(/^\/\//, '/')
    createRedirect({
      fromPath: `/${cleanTitle}-${slug}`,
      toPath: cleanTo,
      isPermanent: true,
    })
    createRedirect({ fromPath: `/${slug}`, toPath: cleanTo, isPermanent: true })
  }

  const pages = await graphql(`
    query {
      allPages(filter: { status: { eq: "published" } }) {
        nodes {
          title
          slug
          url
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      Promise.reject(result.errors)
    }
    result.data.allPages.nodes.forEach(({ title, slug, url }) => {
      const pagePath = url
      addRedirect(title, slug, pagePath)
      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/page.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: slug,
        },
      })
    })
  })

  const materials = await graphql(`
    query {
      allMaterials(filter: { status: { eq: "published" } }) {
        nodes {
          title
          slug
          slug_url
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      Promise.reject(result.errors)
    }
    result.data.allMaterials.nodes.forEach(({ title, slug, slug_url }) => {
      const pagePath = `/resources/materials/${slug_url}`
      addRedirect(title, slug, pagePath)
      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/material.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: slug,
        },
      })
    })
  })

  return Promise.all([pages, materials])
}
