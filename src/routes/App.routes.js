import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home-page/Home'
import { ProfileContributionPage, ProfilePage, ProfileRequestPage } from '../pages/profile-page/ProfilePage'
import { RequestDonatePage } from '../pages/request-page/RequestDonatePage'
import { CreateCampaign } from '../pages/campaign-pages/CreateCampaign'
import { NotificationPage } from '../pages/notification/NotificationPage'
import { AuthnticationPage, LoginPage, SignupPage } from '../pages/auth-pages/AuthnticationPage'
import { RequestViewPage } from '../pages/request-page/RequestViewPage'
import { CampaignViewPage } from '../pages/campaign-pages/CampaignViewPage'
import { ProfileEditPage } from '../pages/profile-page/ProfileEditPage'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/auth' element={<AuthnticationPage />} >
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignupPage />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<ProfilePage />} >
                <Route path='/profile' element={<Navigate to={"requests"} />} />
                <Route path='requests' element={<ProfileRequestPage />} />
                <Route path='contributions' element={<ProfileContributionPage />} />
            </Route>
            <Route path='/profile-edit' element={<ProfileEditPage />} />

            <Route path='/request' element={<RequestViewPage />} />
            <Route path='/create-request' element={<RequestDonatePage />} />

            <Route path='/campaign' element={<CampaignViewPage />} />
            <Route path='/create-campaign' element={<CreateCampaign />} />
            <Route path='/notifications' element={<NotificationPage />} />
        </Routes>
    )
}
