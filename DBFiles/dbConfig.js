var config = {  
    server: 'wholeroot.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'darshag', //update me
            password: 'qwerty@123'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'attendees'  //update me
    }
};

module.exports = config;