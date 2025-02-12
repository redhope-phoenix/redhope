import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home-page/Home'
import { ProfileContributionPage, ProfilePage, ProfileRequestPage } from '../pages/profile-page/ProfilePage'
import { RequestDonatePage } from '../pages/request-page/RequestDonatePage'
import { CreateCampaign } from '../pages/campaign-pages/CreateCampaign'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<ProfilePage />} >
                <Route path='requests' element={<ProfileRequestPage />} />
                <Route path='contributions' element={<ProfileContributionPage />} />
            </Route>
            <Route path='/donation-request' element={<RequestDonatePage />} />
            <Route path='/create-campaign' element={<CreateCampaign />} />
        </Routes>
    )
}
