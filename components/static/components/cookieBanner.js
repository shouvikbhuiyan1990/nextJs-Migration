import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import cookie from '../../../utils/cookie';
import CookiePolicy from './cookiePolicy';

import './staticComponents.css';

const CookieBanner = () => {
    const [showBanner, setDisplayOfBanner] = useState(true);
    const [showPolicy, setDisplayOfPolicy] = useState(false);

    const displayPrivacy = (e) => {
        e.preventDefault();
        setDisplayOfPolicy(!showPolicy);
    }

    const controlCookieBanner = () => {
        setDisplayOfBanner(false);
        cookie.create('cookiePolicyAccepted', true);
    }

    useEffect(() => {
        const policy = cookie.get('cookiePolicyAccepted')[0];

        setDisplayOfBanner(!(policy === 'true'));
    }, []);

    return (
        <div className='cookie-banner'>
            {!navigator.cookieEnabled &&
                <div className='cookie-banner-inner'>
                    <CookiePolicy
                        show={showPolicy}
                        onClose={() => setDisplayOfPolicy(!showPolicy)}
                    />
                    <div className='cookie-banner-content'>
                        <p>This website uses cookies. Some features won't work as expected as cookie is disabled in this browser</p>
                    </div>
                </div>
            }
            {showBanner &&
                <div className='cookie-banner-inner'>
                    <CookiePolicy
                        show={showPolicy}
                        onClose={() => setDisplayOfPolicy(!showPolicy)}
                    />
                    <div className='cookie-banner-content'>
                        <p>This website uses cookies. By continuing to use this website you are giving consent to cookies being used. <a href="/" onClick={displayPrivacy}>View our Privacy and Cookie Policy.</a></p>
                        <Button
                            type="button"
                            className='btn-theme-global'
                            onClick={controlCookieBanner}
                        >
                            I Agree
                        </Button>
                    </div>
                </div>
            }
        </div>
    )

}

export default CookieBanner;