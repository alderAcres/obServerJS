import React, { useReducer } from 'react';
import * as actions from '../actionTypes';

const initialState = {
  currentTabIdx: 0,
  // all open tabs
  allTabs: [
    {
      link: 'http://localhost:3000',
      route: '/user/create',
      method: 'POST',
      active: false,
      body: '',
      tabOrder: 0,
      currentMiddlewareIdx: 0,
      middleware: [
        {
          name: 'twoPlusTwo',
          code: 'const twoPlusTwo = () => 2 + 2',
          status: 'passed',
          toggled: false,
          response: {
            value: 4,
          },
          variables: [
          ]
        },
        {
          name: 'threePlusThree',
          code:
            `import React, { useContext } from 'react'
import { Container } from '@material-ui/core'
import { MainContainerContext } from '../../../Global/context/MainContainerContext'

const styles = {
  container: {
    borderRadius: 12,
    border: '1px solid white',
    padding: 0,
    margin: 0,
  }
}

const ResponseObject = () => {
  const { 
    state: { 
      currentRoute: { 
        activeMiddleware: { response }
      }
    } 
  } = useContext(MainContainerContext)

  import React, { useContext } from 'react'
  import { Container } from '@material-ui/core'
  import { MainContainerContext } from '../../../Global/context/MainContainerContext'

  const styles = {
    container: {
      borderRadius: 12,
      border: '1px solid white',
      padding: 0,
      margin: 0,
    }
  }

  const ResponseObject = () => {
    const { 
      state: { 
        currentRoute: { 
          activeMiddleware: { response }
        }
      } 
    } = useContext(MainContainerContext)
`,
          status: 'error',
          toggled: true,
          response: {
            value: 6,
          },
          variables: [
            {}
          ]
        },
        {
          name: 'fourPlusFour',
          code: 'const fourPlusFour = () => 4 + 4',
          status: 'skipped',
          toggled: false,
          response: {
            value: 4,
            value1: 8,
            value2: 6,
            value3: 10,
            value4: 12
          },
          variables: [
            {
              userRouter: 'blue',
              user: 'Ashley',
              faveColor: 'blue'
            }
          ]
        }
      ],
      tree: {
        name: 'App',
        children: [
          {
            name: 'getMiddleware',
            type: 'route',
            children: [
              { name: 'processCookies', type: 'function' },
              { name: 'authUser', type: 'function' },
              { name: 'sendResponse', type: 'function' },
              {
                name: 'getUsers',
                type: 'route',
                children: [
                  {
                    name: 'queryDB',
                    type: 'function'
                  },
                  {
                    name: 'editUser',
                    type: 'route',
                    children: [
                      {
                        name: 'getEmail',
                        type: 'function'
                      },
                      {
                        name: 'getName',
                        type: 'function'
                      },
                      {
                        name: 'formatBirthday',
                        type: 'function'
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { name: 'Cors', type: 'function' },
          {
            name: 'registerUser',
            type: 'route',
            children: [{ name: 'santitizeData', type: 'function' }, { name: 'addToDB', type: 'function' }, { name: 'redirectUser', type: 'function' }],
          },
        ],
      }
    },
    {
      link: 'http://localhost:8080',
      method: 'GET',
      body: '',
      active: true,
      tabOrder: 1,
    }
  ],
  sidebarSelection: 'Tree', // i.e. Collections, tree, request, response, etc. (min 1, max2)

}

export const MainContainerContext = React.createContext();

const MainContainerReducer = (state, action) => {
  switch (action.type) {
    
    case actions.CLOSE_TAB:
      const tab = action.payload;
      const currentState = [];
      const reSort = () => {
        for (let key of state.allTabs) {
          if (key.tabOrder !== tab) {
            if (key.tabOrder > tab) {
              key.tabOrder--
              }
            currentState.push(key)
          } 
        }
      }
      reSort();
      return { ...state, allTabs: currentState }

    case actions.NEW_TAB:
      const data = action.payload
      const tabs = state.allTabs
      tabs.forEach((tab) => {
        tab.active = false
      })
      tabs.push(data)
      //How do I add a new object to the allTabs Array?
      console.log('adding a tab')
      return { ...state, allTabs: tabs }

    case actions.CHANGE_ACTIVE_TAB:
      
      return { ...state, currentTabIdx: action.payload }

    case actions.TOGGLE_MIDDLEWARE:
      const { idx } = action.payload

      const allTabs = state.allTabs
      allTabs[state.currentTabIdx].currentMiddlewareIdx = idx

      return { ...state, allTabs }

    case actions.CHANGE_WINDOW: 

      return { ...state, sidebarSelection: action.payload }

    default:
      return state
  }
}

// Function that gets exposed when context is used inside of the application
const MainContainerProvider = ({ children }) => {
  // useReducer exposes the state and dispatch functions
  const [state, dispatch] = useReducer(MainContainerReducer, initialState)
  return (
    <MainContainerContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContainerContext.Provider>
  )
}

export default MainContainerProvider