import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title,description}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to E-Commerce Web",
    description:"We sell the best products for cheap"
}

export default Meta
