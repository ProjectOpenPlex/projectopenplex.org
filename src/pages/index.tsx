import React from "react"

import { Canberra } from "../components/canberra"
import { SpringFadeUp, TrailFadeUp } from "../utils/animations"


  // // return (
  // //   <div>
  // //     <ul id="nav">
  // //       {
  // //         allPages.nodes.map(node => <li><Link to={node.url}>{node.title}</Link></li>)
  // //       }
  // //       <li><Link to={`blog`}>Blog</Link></li>
  // //     </ul>  
  //     <div id= "main">
  //       <div dangerouslySetInnerHTML={{ __html: home.html }} />
  //     </div>
  //   </div>
  // )

export default (props) => {
  const { data: { allPages } } = props
  const home = allPages.nodes.find(page => page.url === '/')

  return (
		<>
			<Canberra title="Home" />

      <SpringFadeUp>
        <div dangerouslySetInnerHTML={{ __html: home.html }} />
      </SpringFadeUp>
		</>
	)
}


export const query = graphql`
  query {
    allPages(filter: {status: {eq: "published"}}) {
      nodes {
        title
        blurb
        status
        url
        html
      }
    }
  }
`


