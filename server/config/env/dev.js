module.exports = {
  host: "127.0.0.1",
  port: 3001, // change with development port
  mongoUrl: "mongodb://localhost:27017/EMS",
  secret: "#$up3r$up3r$3cr3t#@@#",
  tokenExpiry: "1h",
  aws: {
        'key': 'AKIAI3PMW4UBQQVQ7HJA',
        'secret': '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',
        'ses': {
            'from': {
                'default': '"objectedge.com" surekha.gadkari@objectedge.com', 
            },
            'region': 'ap-south-1' 
        }
    }
    
};
