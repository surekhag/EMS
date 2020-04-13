const peerReviewEmailTemplate =(peerName)=>{return `<html><body><h4>Hello ${peerName} </h4><p style='color:red'>Please submit review for your peers.</p> </body></html>`
}

module.exports = {peerReviewEmailTemplate};
