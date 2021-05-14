import React from 'react'
import SidebarContainer from './Sidebar/SidebarContainer'
import {
  Container,
} from '@material-ui/core'
import MainContainerProvider from '../Global/context/MainContainerContext';
import TabContainer from './Tab/TabContainer';
import NavContainer from './Nav/NavContainer';

const styles = {
  container: {
    height: '90vh',
    minHeight: '600px',
    maxHeight: '800px',
    width: '100vw',
    border: '1px solid purple',
    display: 'grid',
    gridTemplateRows: 'repeat(7, 100/7)',
    gridTemplateColumns: 'repeat(6, 100/6)',
    gridTemplateAreas: `
      "nav nav nav nav nav nav nav nav"
      "sidebar tabs tabs tabs tabs tabs tabs tabs"
      "sidebar . . . . . . ."
      "sidebar windows windows windows windows windows windows windows"
      "sidebar windows windows windows windows windows windows windows"
      "sidebar windows windows windows windows windows windows windows"
      "sidebar windows windows windows windows windows windows windows"
    `,
    padding: 0,
  }
}

const MainContainer = () => (
  <MainContainerProvider>
    <Container style={styles.container}>
      <NavContainer/>
      <TabContainer />
      <SidebarContainer />
    </Container>
  </MainContainerProvider>
)

export default MainContainer
