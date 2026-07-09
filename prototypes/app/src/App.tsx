import { Navigate, Route, Routes } from 'react-router-dom'
import { DemoProvider } from './state'
import { RiProvider } from './state-integrity'
import Shell from './components/Shell'
import Landing from './screens/Landing'
import Dashboard from './screens/Dashboard'
import Analyse from './screens/Analyse'
import Strategy from './screens/Strategy'
import Correspondence from './screens/Correspondence'
import FundResponse from './screens/FundResponse'
import Closeout from './screens/Closeout'
import Oracle from './screens/Oracle'
import Performance from './screens/Performance'
import RiDashboard from './screens/integrity/RiDashboard'
import RiInbox from './screens/integrity/RiInbox'
import RiWorkbench from './screens/integrity/RiWorkbench'

export default function App() {
  return (
    <DemoProvider>
      <RiProvider>
        <Shell>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyse" element={<Analyse />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/correspondence" element={<Correspondence />} />
            <Route path="/response" element={<FundResponse />} />
            <Route path="/closeout" element={<Closeout />} />
            <Route path="/oracle" element={<Oracle />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/integrity" element={<RiDashboard />} />
            <Route path="/integrity/inbox" element={<RiInbox />} />
            <Route path="/integrity/workbench" element={<RiWorkbench />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
      </RiProvider>
    </DemoProvider>
  )
}
