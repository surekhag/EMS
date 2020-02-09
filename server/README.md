Follow following instructions to install mongodb on local (for ubuntu only)
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

Possible error:
exception in initAndListen: NonExistentPath: Data directory /data/db not found., terminating

Solution:
Create a directory at mentioned path [/data/db]
https://stackoverflow.com/questions/30235200/mongodb-data-directory-data-db-not-found

mongodb runs on 127.0.0.1:
mongodb runs on 127.0.0.1:27017

For local development use nodemon
nodemon start server
