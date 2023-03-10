import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

import eyeIcon from '../assets/eyeIcon.svg'
import privacyIcon from '../assets/privacyIcon.svg'
import advancedIcon from '../assets/advancedIcon.svg'
import helpIcon from '../assets/helpIcon.svg'
import cancelButton from '../assets/cancelButton.svg'
import cancelButtonDark from '../assets/cancelButtonDark.svg'

const cookies = new Cookies()

const SelectionBar = ({ setCurrentSettingsTab }) => {
    return (
        <div className='settings_selection_wrapper'>
            <button className="tablinks" onClick={() => setCurrentSettingsTab("appr")}>
                <img src={eyeIcon} alt="Appearance"/>
                <p>Appearance</p>
            </button>
            <button className="tablinks" onClick={() => setCurrentSettingsTab("tap")}>
                <img src={privacyIcon} alt="Terms and Privacy"/>
                <p>Terms and Privacy</p>
            </button>
            <button className="tablinks" onClick={() => setCurrentSettingsTab("adv")}>
                <img src={advancedIcon} alt="Advanced"/>
                <p>Advanced</p>
            </button>
            <button className="tablinks" onClick={() => setCurrentSettingsTab("about")}>
                <img src={helpIcon} alt="About"/>
                <p>About</p>
            </button>
        </div>
    )
}

const Appr = ({ isLightMode, setIsLightMode, isDev, setIsDev }) => {
    useEffect(() => {
        if (isLightMode) {
            document.documentElement.style.setProperty('--main', '#e1e1e1')
            document.documentElement.style.setProperty('--text-color', '#000')
            document.documentElement.style.setProperty('--lightdark-line', '#4f5164')
            document.documentElement.style.setProperty('--link-color', '#2222ee')
            document.documentElement.style.setProperty('--leftbar-color', '#5588ff')
            document.documentElement.style.setProperty('--mainbar-color', '#446fff')
        } else {
            document.documentElement.style.setProperty('--main', '#414141')
            document.documentElement.style.setProperty('--text-color', '#eee')
            document.documentElement.style.setProperty('--lightdark-line', '#b0ae9b')
            document.documentElement.style.setProperty('--link-color', '#dddd11')
            document.documentElement.style.setProperty('--leftbar-color', '#333333')
            document.documentElement.style.setProperty('--mainbar-color', '#444444')
        }
    }, [isLightMode])

    return (
        <div className='appr_wrapper'>
            <div className='lightdark'>
                <div className="lightdark__switch__container">
                    <p>{isLightMode ? "Toggle to Dark Mode" : "Toggle to Light Mode"}</p>
                    <div className='lightdark__switch'>
                        <label className="lightdark__label">
                            <input type="checkbox" className="lightdark__check" onChange={() => setIsLightMode((prevState) => !prevState)} defaultChecked={!isLightMode}/>
                            <div className="lightdark__rail">
                                <span className="toggle__circle" />
                                <span className='toggle__border' />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Tap = ({ setviewingTerms }) => {
    return (
        <div className='tap_wrapper'>
            <div className='tap_odd'>
                <button className='tap_btn' onClick={() => setviewingTerms("toc")}>Terms and Conditions</button>
            </div>
            <div className='tap_even'>
                <button className='tap_btn' onClick={() => setviewingTerms("pp")}>Privacy Policy</button>
            </div>
            <div className='tap_odd'>
                <button className='tap_btn' onClick={() => setviewingTerms("d")}>Disclaimer</button>
            </div>
            <div className='tap_even'>
                <button className='tap_btn' onClick={() => setviewingTerms("cp")}>Cookies Policy</button>
            </div>
        </div>
        // https://www.privacypolicies.com/live/818b6eb4-31c1-4dff-98df-3b65cb53c948
        // https://www.privacypolicies.com/live/1bc8b780-5818-460e-b4ed-9d02fb3ac7cb
    )
}

const Adv = ({ isDev, setIsDev, reinit }) => {
    return (
        <div className='adv_wrapper'>
            <div className='lightdark'>
                <div className="lightdark__switch__container">
                    <p>{isDev ? "Disable Developer Settings" : "Enable Developer Settings"}</p>
                    <div className='lightdark__switch'>
                        <label className="lightdark__label">
                            <input type="checkbox" className="lightdark__check" onChange={() => setIsDev((prevState) => !prevState)} defaultChecked={isDev}/>
                            <div className="lightdark__rail">
                                <span className="dev__circle" />
                                <span className='dev__border' />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            {isDev === true &&
                <Tooltip title="TODO: get a better name for the button">
                    <div className='reinit_btn_wrapper'>
                        <button className='reinit_btn' onClick={reinit}>Re-init possibly incorrect usernames</button>
                    </div>
                </Tooltip>
            }
        </div>
    )
}

const About = ({ setviewingTerms }) => {
    return (
        <div className='abt_wrapper'>
            <div className='abt_odd'>
                <div className='abt_odd_left'>
                    <p>Version</p>
                </div>
                <div className='abt_odd_right'>
                    <p>0.9.4.2</p>
                </div>
            </div>
            <div className='abt_even'>
                <div className='abt_even_left'>
                    <p>Last Updated</p>
                </div>
                <div className='abt_even_right'>
                    <p>29 December 2022</p>
                </div>
            </div>
            <div className='abt_odd'>
                <div className='abt_odd_left'>
                    <p>Changelog</p>
                </div>
                <div className='abt_odd_right'>
                    <button className='changelog_btn' onClick={() => setviewingTerms("cl")}>View</button>
                </div>
            </div>
        </div>
    )
}

const MainSettings = ({ currentSettingsTab, isLightMode, setIsLightMode, setviewingTerms, isDev, setIsDev, reinit }) => {
    if (currentSettingsTab === "appr") return <Appr 
        isLightMode={isLightMode} 
        setIsLightMode={setIsLightMode} 
        isDev={isDev}
        setIsDev={setIsDev}
    />
    if (currentSettingsTab === "tap") return <Tap setviewingTerms={setviewingTerms}/>
    if (currentSettingsTab == "adv") return <Adv isDev={isDev} setIsDev={setIsDev} reinit={reinit} />
    return <About setviewingTerms={setviewingTerms}/>
}

const Toc = ({ isLightMode, setviewingTerms }) => {
    return (
        <div className='policy'>
            <div className='policy__head'>
                <h1>Terms and Conditions</h1>
                <Tooltip title="Go Back">
                    <img src={isLightMode ? cancelButton : cancelButtonDark} alt="Go Back" onClick={() => setviewingTerms("main")}/>
                </Tooltip>
            </div>
            <div className='policy__main'>
                <h1>Terms and Conditions</h1>
                <p>Last updated: December 28, 2022</p>
                <p>Please read these terms and conditions carefully before using Our Service.</p>
                <h1>Interpretation and Definitions</h1>
                <h2>Interpretation</h2>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <h2>Definitions</h2>
                <p>For the purposes of these Terms and Conditions:</p>
                <ul>
                <li>
                <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
                </li>
                <li>
                <p><strong>Country</strong> refers to:  Hong Kong SAR China</p>
                </li>
                <li>
                <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Libreqkn.</p>
                </li>
                <li>
                <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
                </li>
                <li>
                <p><strong>Service</strong> refers to the Website.</p>
                </li>
                <li>
                <p><strong>Terms and Conditions</strong> (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</p>
                </li>
                <li>
                <p><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>
                </li>
                <li>
                <p><strong>Website</strong> refers to Libreqkn, accessible from <a href="libreqkn.netlify.com" rel="external nofollow noopener" target="_blank">libreqkn.netlify.com</a></p>
                </li>
                <li>
                <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
                </li>
                </ul>
                <h1>Acknowledgment</h1>
                <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
                <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
                <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
                <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>
                <h1>Links to Other Websites</h1>
                <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
                <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
                <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
                <h1>Termination</h1>
                <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
                <p>Upon termination, Your right to use the Service will cease immediately.</p>
                <h1>Limitation of Liability</h1>
                <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
                <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
                <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>
                <h1>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h1>
                <p>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
                <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
                <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
                <h1>Governing Law</h1>
                <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
                <h1>Disputes Resolution</h1>
                <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
                <h1>For European Union (EU) Users</h1>
                <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.</p>
                <h1>United States Legal Compliance</h1>
                <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
                <h1>Severability and Waiver</h1>
                <h2>Severability</h2>
                <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
                <h2>Waiver</h2>
                <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
                <h1>Translation Interpretation</h1>
                <p>These Terms and Conditions may have been translated if We have made them available to You on our Service.
                You agree that the original English text shall prevail in the case of a dispute.</p>
                <h1>Changes to These Terms and Conditions</h1>
                <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
                <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
                <h1>Contact Us</h1>
                <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                <ul>
                <li>By email: kingking1223@gmail.com</li>
                </ul>
            </div>
        </div>
    )
}

const Pp = ({ isLightMode, setviewingTerms }) => {
    return (
        <div className='policy'>
            <div className='policy__head'>
                <h1>Privacy Policy</h1>
                <Tooltip title="Go Back">
                    <img src={isLightMode ? cancelButton : cancelButtonDark} alt="Go Back" onClick={() => setviewingTerms("main")}/>
                </Tooltip>
            </div>
            <div className='policy__main'>
            <h1>Privacy Policy</h1>
                <p>Last updated: December 28, 2022</p>
                <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
                <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
                <h1>Interpretation and Definitions</h1>
                <h2>Interpretation</h2>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <h2>Definitions</h2>
                <p>For the purposes of this Privacy Policy:</p>
                <ul>
                <li>
                <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
                </li>
                <li>
                <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Libreqkn.</p>
                </li>
                <li>
                <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
                </li>
                <li>
                <p><strong>Country</strong> refers to:  Hong Kong SAR China</p>
                </li>
                <li>
                <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
                </li>
                <li>
                <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
                </li>
                <li>
                <p><strong>Service</strong> refers to the Website.</p>
                </li>
                <li>
                <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
                </li>
                <li>
                <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
                </li>
                <li>
                <p><strong>Website</strong> refers to Libreqkn, accessible from <a href="libreqkn.netlify.com" rel="external nofollow noopener" target="_blank">libreqkn.netlify.com</a></p>
                </li>
                <li>
                <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
                </li>
                </ul>
                <h1>Collecting and Using Your Personal Data</h1>
                <h2>Types of Data Collected</h2>
                <h3>Personal Data</h3>
                <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
                <ul>
                <li>
                <p>Email address</p>
                </li>
                <li>
                <p>First name and last name</p>
                </li>
                <li>
                <p>Usage Data</p>
                </li>
                </ul>
                <h3>Usage Data</h3>
                <p>Usage Data is collected automatically when using the Service.</p>
                <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
                <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
                <h3>Tracking Technologies and Cookies</h3>
                <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
                <ul>
                <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
                <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
                </ul>
                <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies on the <a href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking" target="_blank">Privacy Policies website</a> article.</p>
                <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
                <ul>
                <li>
                <p><strong>Necessary / Essential Cookies</strong></p>
                <p>Type: Session Cookies</p>
                <p>Administered by: Us</p>
                <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                </li>
                <li>
                <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
                </li>
                <li>
                <p><strong>Functionality Cookies</strong></p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                </li>
                </ul>
                <p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
                <h2>Use of Your Personal Data</h2>
                <p>The Company may use Personal Data for the following purposes:</p>
                <ul>
                <li>
                <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
                </li>
                <li>
                <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
                </li>
                <li>
                <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
                </li>
                <li>
                <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
                </li>
                <li>
                <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
                </li>
                <li>
                <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
                </li>
                <li>
                <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
                </li>
                <li>
                <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
                </li>
                </ul>
                <p>We may share Your personal information in the following situations:</p>
                <ul>
                <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
                <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
                <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
                </ul>
                <h2>Retention of Your Personal Data</h2>
                <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
                <h2>Transfer of Your Personal Data</h2>
                <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to ??? and maintained on ??? computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
                <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
                <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
                <h2>Delete Your Personal Data</h2>
                <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
                <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
                <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
                <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
                <h2>Disclosure of Your Personal Data</h2>
                <h3>Business Transactions</h3>
                <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
                <h3>Law enforcement</h3>
                <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
                <h3>Other legal requirements</h3>
                <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
                <ul>
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of the Company</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of Users of the Service or the public</li>
                <li>Protect against legal liability</li>
                </ul>
                <h2>Security of Your Personal Data</h2>
                <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
                <h1>Links to Other Websites</h1>
                <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
                <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
                <h1>Changes to this Privacy Policy</h1>
                <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
                <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
                <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                <h1>Contact Us</h1>
                <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                <ul>
                <li>By email: kingking1223@gmail.com</li>
                </ul>
            </div>
        </div>
    )   
}

const D = ({ isLightMode, setviewingTerms }) => {
    return (
        <div className='policy'>
            <div className='policy__head'>
                <h1>Disclaimer</h1>
                <Tooltip title="Go Back">
                    <img src={isLightMode ? cancelButton : cancelButtonDark} alt="Go Back" onClick={() => setviewingTerms("main")}/>
                </Tooltip>
            </div>
            <div className='policy__main'>
                <h1>Disclaimer</h1>
                <p>Last updated: December 28, 2022</p>
                <h1>Interpretation and Definitions</h1>
                <h2>Interpretation</h2>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions.
                The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <h2>Definitions</h2>
                <p>For the purposes of this Disclaimer:</p>
                <ul>
                <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Disclaimer) refers to Libreqkn.</li>
                <li><strong>Service</strong> refers to the Website.</li>
                <li><strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                <li><strong>Website</strong> refers to Libreqkn, accessible from <a href="libreqkn.netlify.com" rel="external nofollow noopener" target="_blank">libreqkn.netlify.com</a></li>
                </ul>
                <h1>Disclaimer</h1>
                <p>The information contained on the Service is for general information purposes only.</p>
                <p>The Company assumes no responsibility for errors or omissions in the contents of the Service.</p>
                <p>In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice.</p>
                <p>The Company does not warrant that the Service is free of viruses or other harmful components.</p>
                <h1>External Links Disclaimer</h1>
                <p>The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.</p>
                <p>Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
                <h1>Errors and Omissions Disclaimer</h1>
                <p>The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to insure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.</p>
                <p>The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
                <h1>Fair Use Disclaimer</h1>
                <p>The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.</p>
                <p>The Company believes this constitutes a &quot;fair use&quot; of any such copyrighted material as provided for in section 107 of the United States Copyright law.</p>
                <p>If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.</p>
                <h1>Views Expressed Disclaimer</h1>
                <p>The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.</p>
                <p>Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.</p>
                <h1>No Responsibility Disclaimer</h1>
                <p>The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.</p>
                <p>In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.</p>
                <h1>&quot;Use at Your Own Risk&quot; Disclaimer</h1>
                <p>All information in the Service is provided &quot;as is&quot;, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.</p>
                <p>The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.</p>
                <h1>Contact Us</h1>
                <p>If you have any questions about this Disclaimer, You can contact Us:</p>
                <ul>
                <li>By email: kingking1223@gmail.com</li>
                </ul>
            </div>
        </div>
    ) 
}

const Cp = ({ isLightMode, setviewingTerms }) => {
    return (
        <div className='policy'>
            <div className='policy__head'>
                <h1>Cookies Policy</h1>
                <Tooltip title="Go Back">
                    <img src={isLightMode ? cancelButton : cancelButtonDark} alt="Go Back" onClick={() => setviewingTerms("main")}/>
                </Tooltip>
            </div>
            <div className='policy__main'>
                <h1>Cookies Policy</h1>
                <p>Last updated: December 28, 2022</p>
                <p>This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.</p>
                <p>Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy.</p>
                <p>We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.</p>
                <h1>Interpretation and Definitions</h1>
                <h2>Interpretation</h2>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <h2>Definitions</h2>
                <p>For the purposes of this Cookies Policy:</p>
                <ul>
                <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers to Libreqkn.</li>
                <li><strong>Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses.</li>
                <li><strong>Website</strong> refers to Libreqkn, accessible from <a href="libreqkn.netlify.com" rel="external nofollow noopener" target="_blank">libreqkn.netlify.com</a></li>
                <li><strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.</li>
                </ul>
                <h1>The use of the Cookies</h1>
                <h2>Type of Cookies We Use</h2>
                <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.</p>
                <p>We use both session and persistent Cookies for the purposes set out below:</p>
                <ul>
                <li>
                <p><strong>Necessary / Essential Cookies</strong></p>
                <p>Type: Session Cookies</p>
                <p>Administered by: Us</p>
                <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                </li>
                <li>
                <p><strong>Functionality Cookies</strong></p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                </li>
                </ul>
                <h2>Your Choices Regarding Cookies</h2>
                <p>If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.</p>
                <p>If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.</p>
                <p>If You'd like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.</p>
                <ul>
                <li>
                <p>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" rel="external nofollow noopener" target="_blank">https://support.google.com/accounts/answer/32050</a></p>
                </li>
                <li>
                <p>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" rel="external nofollow noopener" target="_blank">http://support.microsoft.com/kb/278835</a></p>
                </li>
                <li>
                <p>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" rel="external nofollow noopener" target="_blank">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></p>
                </li>
                <li>
                <p>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" rel="external nofollow noopener" target="_blank">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></p>
                </li>
                </ul>
                <p>For any other web browser, please visit your web browser's official web pages.</p>
                <h2>More Information about Cookies</h2>
                <p>You can learn more about cookies: <a href="https://www.privacypolicies.com/blog/cookies/" target="_blank">What Are Cookies?</a>.</p>
                <h2>Contact Us</h2>
                <p>If you have any questions about this Cookies Policy, You can contact us:</p>
                <ul>
                <li>By email: kingking1223@gmail.com</li>
                </ul>
            </div>
        </div>
    ) 
}

const Cl = ({ isLightMode, setviewingTerms }) => {
    return (
        <div className='policy'>
            <div className='policy__head'>
                <h1>Chanelog</h1>
                <Tooltip title="Go Back">
                    <img src={isLightMode ? cancelButton : cancelButtonDark} alt="Go Back" onClick={() => setviewingTerms("main")}/>
                </Tooltip>
            </div>
            <div className='policy__main'>
                <h2>0.9</h2>
                <h3>0.9.4</h3>
                <h4>0.9.4.2</h4>
                <p>Fix close button for terms and changelog hardly seeable for dark mode users.</p>
                <h4>0.9.4.1</h4>
                <p>Fix Merge Conflict.</p>
            </div>
        </div>
    )
}

const Settings = ({ client, isLightMode, setIsLightMode, isDev, setIsDev }) => {
    const [currentSettingsTab, setCurrentSettingsTab] = useState("appr")
    const [viewingTerms, setviewingTerms] = useState("main")

    const reinit = async () => {
        const apiKey = process.env.REACT_APP_STREAM_API_KEY
        const client = StreamChat.getInstance(apiKey);
        try {
            const updateResponse = await client.upsertUsers([
                { id: '18ce', name: 'Mr. Enoch Cheung', fullName: 'Cheung Enoch'},
                { id: 'cdg220055', name: 'King', fullName: 'Leung King King'},
                { id: 'cdg220083', name: 'Kenny', fullName: 'Sandhu Kei Yin Kenny'},
                { id: 'cdg220094', name: 'Calvin', fullName: 'Tang Kit Hin Calvin'},
                { id: 'cdg220102', name: 'Justin', fullName: 'Tsue Yeuk Tin Justin'},
                { id: 'cdg220108', name: 'Max', fullName: 'Wong Sheung Yau Max'}
            ]);
            console.log("test")
            alert("done")
        } catch (e) {
            alert("error")
            console.log(e)
        }
    }

    if (viewingTerms === "toc") return <Toc isLightMode={isLightMode} setviewingTerms={setviewingTerms} />
    if (viewingTerms === "pp") return <Pp isLightMode={isLightMode} setviewingTerms={setviewingTerms} />
    if (viewingTerms === "d") return <D isLightMode={isLightMode} setviewingTerms={setviewingTerms} />
    if (viewingTerms === "cp") return <Cp isLightMode={isLightMode} setviewingTerms={setviewingTerms} />
    if (viewingTerms === "cl") return <Cl isLightMode={isLightMode} setviewingTerms={setviewingTerms} />

    return (
        <div className='main_settings_wrapper'>
            <SelectionBar setCurrentSettingsTab={setCurrentSettingsTab}/>
            <MainSettings 
                currentSettingsTab={currentSettingsTab} 
                isLightMode={isLightMode} 
                setIsLightMode={setIsLightMode}
                setviewingTerms={setviewingTerms}
                isDev={isDev}
                setIsDev={setIsDev}
                reinit={reinit}
            />
        </div>
    )
}

export default Settings