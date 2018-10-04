import React from 'react';
import { Layout, Row } from 'antd'

import AddWidget from './components/AddWidget'
import WidgetsList from './components/WidgetsList'

const MainSceneView = () => {
  return (
    <Layout style={{minHeight : '100vh'}}>
      <Layout.Content style={{padding: 16}}>
        <Row >
          <AddWidget/>    
        </Row>
        <Row gutter={16}>
          <WidgetsList/>
        </Row>
      </Layout.Content>
    </Layout>
  )
}
export default MainSceneView