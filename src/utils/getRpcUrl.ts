import random from 'lodash/random'

// Array of available nodes to connect to
const nodes = [
  process.env.REACT_APP_NODE_1,
  process.env.REACT_APP_NODE_2,
  process.env.REACT_APP_NODE_3,
  process.env.REACT_APP_NODE_4,
  process.env.REACT_APP_NODE_5,

  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6,
  process.env.REACT_APP_NODE_6
]

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)

  /* return 'https://polygon-rpc.com/' */
  return 'https://rpc.ftm.tools/'
}

export default getNodeUrl
