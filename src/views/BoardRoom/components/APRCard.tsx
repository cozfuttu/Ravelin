import { BLOCKS_PER_YEAR } from 'config'
import React from 'react'
import { Masonry } from 'state/types'
import Card from './Card'

interface CardProps {
  masonry: Masonry
}

const APRCard: React.FC<CardProps> = ({ masonry }) => {
  console.log('masonry: ', masonry)
  const tombPrice = 0.9338

  return (
    <Card heading='APR' value='832.02%' />
  )
}

export default APRCard