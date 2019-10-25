const ENV_URLS = {
    'ALPHA': 'https://alpha.rippleshot.com/',
    'BETA': 'https://beta.rippleshot.com/',
    'PROD': 'https://app.rippleshot.com/',
    'ALPHA-SLD': 'https://alpha-securlockdetect.rippleshot.com/',
    'BETA-SLD': 'https://beta-securlockdetect.rippleshot.com/',
    'PROD-SLD': 'https://www.securlockdetect.com/',
};

const config = {
    testEnv: 'ALPHA',
    envUrls: ENV_URLS,
};

config.set = setObj => {
    Object.assign(config, setObj);
};

module.exports = config;
