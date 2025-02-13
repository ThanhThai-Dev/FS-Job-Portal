import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/admin/Dashboard';
import AddJob from './pages/admin/AddJob';
import Managejobs from './pages/admin/Managejobs';
import ViewApplications from './pages/admin/ViewApplications';
import 'quill/dist/quill.snow.css';

function App() {

  const {showRecruiterLogin} = useContext(AppContext);

  return (
    <div className="">
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/admin/dashboard' element={<Dashboard />} >
          <Route path='add-job' element={<AddJob />} />
          <Route path='manage-jobs' element={<Managejobs />} />
          <Route path='view-applications' element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
