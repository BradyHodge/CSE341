const fs = require('fs');
const path = require('path');

const base64Image = fs.readFileSync(path.join(__dirname, 'base64img.txt'), 'utf8');

const data = {
    professionalName: 'Brady Hodge',
    nameLink: {
        firstName: 'Brady',
        url: '',
    },
    base64Image: base64Image,
    firstName: 'Brady',
    primaryDescription: ' is an IT systems engineer at BYU-Idaho',
    workDescription1:
        'He manages SCCM, JMAF, Active Directory, and other systems.',
    workDescription2:
        'He is also a student at BYU-Idaho studying software engineering.',
    linkTitleText: 'Check out his linked in and github!',
    linkedInLink: {
        link: 'https://www.linkedin.com/in/brady-hodge/',
        text: 'LinkedIn',
    },
    githubLink: {
        link: 'https://github.com/bradyhodge',
        text: 'GitHub',
    },
    contactText:
        "Email contact@brayhodge.com for more information or to get in touch with Brady.",
};
  exports.getData = (req, res, next) => {
    // await mongodb call
    res.status(200).json(data);
  };