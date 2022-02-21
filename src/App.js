import logo from './logo.svg';
import './App.css';

import AppHeader from './components/appHeader/appHeader'
import AppMenu from './components/appMenu/appMenu'
import AppFooter from './components/appFooter/appFooter'
import AppSetting from './components/appSettings/appSettings'
import AppDashboard from './components/appDashboard/appDashboard'

function App() {
  return (
    <div className="wrapper">
      <AppHeader />
      <AppMenu />
      <AppSetting />
      <AppDashboard />
      <AppFooter />
    </div>
  );
}

export default App;
