import { Navigate, Route, Routes } from 'react-router-dom'
import { DemoProvider } from './state'
import { RiProvider } from './state-integrity'
import { CommercialProvider } from './state-commercial'
import Shell from './components/Shell'
import Landing from './screens/Landing'
import Dashboard from './screens/Dashboard'
import Analyse from './screens/Analyse'
import Strategy from './screens/Strategy'
import Correspondence from './screens/Correspondence'
import FundResponse from './screens/FundResponse'
import Closeout from './screens/Closeout'
import BoardPack from './screens/BoardPack'
import Oracle from './screens/Oracle'
import Performance from './screens/Performance'
import Operational from './screens/Operational'
import Reporting from './screens/Reporting'
import Legislation from './screens/Legislation'
import RegChange from './screens/RegChange'
import Education from './screens/Education'
import FundIntelligence from './screens/FundIntelligence'
import ClauseIntelligence from './screens/ClauseIntelligence'
import ChangeIntelligence from './screens/ChangeIntelligence'
import RiDashboard from './screens/integrity/RiDashboard'
import RiInbox from './screens/integrity/RiInbox'
import RiWorkbench from './screens/integrity/RiWorkbench'
import RiCdi from './screens/integrity/RiCdi'

export default function App() {
  return (
    <DemoProvider>
      <RiProvider>
        <CommercialProvider>
        <Shell>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyse" element={<Analyse />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/correspondence" element={<Correspondence />} />
            <Route path="/response" element={<FundResponse />} />
            <Route path="/closeout" element={<Closeout />} />
            <Route path="/boardpack" element={<BoardPack />} />
            <Route path="/oracle" element={<Oracle mode="ask" />} />
            <Route path="/compare" element={<Oracle mode="compare" />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/operational" element={<Operational />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/regchange" element={<RegChange />} />
            <Route path="/legislation" element={<Legislation />} />
            <Route path="/education" element={<Education />} />
            <Route path="/fund-intel" element={<FundIntelligence />} />
            <Route path="/clauses" element={<ClauseIntelligence />} />
            <Route path="/changes" element={<ChangeIntelligence />} />
            <Route path="/integrity" element={<RiDashboard />} />
            <Route path="/integrity/inbox" element={<RiInbox />} />
            <Route path="/integrity/workbench" element={<RiWorkbench />} />
            <Route path="/integrity/cdi" element={<RiCdi />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
        </CommercialProvider>
      </RiProvider>
    </DemoProvider>
  )
}
