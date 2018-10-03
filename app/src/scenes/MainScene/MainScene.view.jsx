import React from 'react';
import { Layout, Row } from 'antd'

import AddWidget from './components/AddWidget'

const MainSceneView = () => {
  return (
    <Layout>
      <Layout.Content>
        <Row >
          <AddWidget/>    
        </Row>
        <Row >
          
        </Row>
      </Layout.Content>
    </Layout>
  )
}
export default MainSceneView