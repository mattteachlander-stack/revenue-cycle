import { Navigate, Route, Routes } from 'react-router-dom'
import { DemoProvider } from './state'
import Shell from './components/Shell'
import Dashboard from './screens/Dashboard'
import Analyse from './screens/Analyse'
import Strategy from './screens/Strategy'
import Correspondence from './screens/Correspondence'
import FundResponse from './screens/FundResponse'
import Closeout from './screens/Closeout'
import Oracle from './screens/Oracle'

export default function App() {
  return (
    <DemoProvider>
      <Shell>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/correspondence" element={<Correspondence />} />
          <Route path="/response" element={<FundResponse />} />
          <Route path="/closeout" element={<Closeout />} />
          <Route path="/oracle" element={<Oracle />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Shell>
    </DemoProvider>
  )
}
