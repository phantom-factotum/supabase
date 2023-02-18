import {useContext} from 'react'
import AuthNavigator from './AuthNavigator'
import Navigator from './Navigator';
import {SessionContext} from '../Context'
export default function Screens (){
  const {session, user} = useContext(SessionContext)
  const isSignedIn = Boolean(user) && Boolean(session)
  return isSignedIn ? <Navigator /> : <AuthNavigator />
}