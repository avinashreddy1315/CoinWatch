import React, { useState, useEffect } from 'react';
import AnimatedPage from '../../components/pageAnimations/AnimatedPage';
import { useSidebar } from '../../cutom components and hooks/SidebarContext';
import { useUser } from '../../cutom components and hooks/userprovider';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../../css/dashboard.css';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';




function Dashboard({ uid }) {
  const { sidebar, setSidebar } = useSidebar();
  const { data, setData } = useUser();
  const [allWaySelected, setAllWaysSelected] = useState(['Rank', 'Coin', 'Price']);
  const [dashboardArray, setDashboardArray] = useState([]);
  

  useEffect(() => {
    if (sidebar) {
      setSidebar(!sidebar);
    }
    if (data?.dashboard) {
      setDashboardArray(data.dashboard);
    }
  }, [data]);

  const handleChange = async (item) => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', data.uid);
    let updatedDashboardArray;

    if (dashboardArray.includes(item)) {
      updatedDashboardArray = dashboardArray.filter((dashItem) => dashItem !== item);
    } else {
      updatedDashboardArray = [...dashboardArray, item];
    }

    await updateDoc(userDocRef, {
      dashboard: updatedDashboardArray,
    });

    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const updatedData = userDocSnap.data();
      setData(updatedData);
      setDashboardArray(updatedData.dashboard);
    }
  };

  return (
    <AnimatedPage>
      <div className='dashboard_customize'>
        <h4>Dashboard</h4>
        <p style={{ fontWeight: '500' }}>Customize Content to show on Your Dashboard</p>
        <FormGroup>
          {allWaySelected.map((item) => (
            <FormControlLabel key={item} disabled control={<Switch defaultChecked />} label={item} />
          ))}
        </FormGroup>
        <FormGroup>
          {['24h', 'Market Cap'].map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Switch
                  checked={dashboardArray.includes(item)}
                  onChange={() => handleChange(item)}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      </div>
    </AnimatedPage>
  );
}

export default Dashboard;
