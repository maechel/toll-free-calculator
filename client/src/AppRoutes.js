import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PassageForm, Vehicle } from './components';
import { HomePage, VehiclesPage, VehicleCreatePage, PassagesCreateForm } from './pages';

const AppRoutes = () => (
    <>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/passages-create/:id" element={<PassagesCreateForm />} />
            <Route path="/vehicles-create" element={<VehicleCreatePage />} />
            <Route path="/vehicles/:id" element={<Vehicle />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/passages" element={<PassageForm />} />
        </Routes>
    </>
);

export default AppRoutes;

