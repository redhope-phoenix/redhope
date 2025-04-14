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
import { PrivateRoutes } from './Private.routes'
import { PreloginRoutes } from './Prelogin.routes'
import { ErrorPage } from '../pages/error-page/ErrorPage'
import { PrivacyPolicyPage } from '../pages/policy-pages/PrivacyPolicyPage'
import { TermsPage } from '../pages/policy-pages/TermsPage'
import { Assistant } from '../pages/health-assistant/Assistant'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/auth' element={<PreloginRoutes children={<AuthnticationPage />} />} >
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignupPage />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<PrivateRoutes children={<ProfilePage />} />} >
                <Route path='/profile' element={<Navigate to={"requests"} />} />
                <Route path='requests' element={<ProfileRequestPage />} />
                <Route path='contributions' element={<ProfileContributionPage />} />
            </Route>
            <Route path='/profile-edit' element={<PrivateRoutes children={<ProfileEditPage />} />} />

            <Route path='/request/:reqestId' element={<RequestViewPage />} />
            <Route path='/create-request' element={<PrivateRoutes children={<RequestDonatePage />} />} />

            <Route path='/campaign/:campaignId' element={<CampaignViewPage />} />
            <Route path='/create-campaign' element={<PrivateRoutes children={<CreateCampaign />} />} />
            <Route path='/notifications' element={<PrivateRoutes children={<NotificationPage />} />} />

            <Route path="/health-assistant" element={<PrivateRoutes children={<Assistant />} />} />

            <Route path='/privacy' element={<PrivacyPolicyPage />} />
            <Route path='/terms' element={<TermsPage />} />

            <Route path='/*' element={<ErrorPage />} />
        </Routes>
    )
}
