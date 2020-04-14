module.exports = {
    host: "127.0.0.1",
    port: 3001, // change with development port
    mongoUrl: "mongodb://localhost:27017/EMS",
    secret: "superSuperSecret",
    aws: {
            'key': '',
            'secret': '',
            'ses': {
                'from': {
                    'default': '"objectedge.com" surekha.gadkari@objectedge.com', 
                },
                'region': 'ap-south-1' 
            }
        }
        
    };
