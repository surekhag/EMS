const peerReviewEmailTemplate =(peerName)=>{return `<html><body><h1>Hello ${peerName} </h1><p style='color:red'>Please submit review for your peers.</p> </body></html>`
}

module.exports = {peerReviewEmailTemplate};
    