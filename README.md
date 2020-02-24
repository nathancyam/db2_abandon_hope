# IBM DB2 NodeJS Demo for the Ancients

This repository shows how you could get IBM DB2 working with updated versions of Knex, NodeJS 12 and the like. I hope one would never need this, but here's to help the poor souls that do.

## Requirements

1. Docker
2. A fair bit of space for docker images as this demonstrate will take up to 2 GB at least (each of the app images as well as the database image).

## Instructions

1. Download the following file from https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
2. Extract the contents of `linux64_odbc_cli.tar.gz`. This should create a `clidriver` directory in this project root which will we need to copy to the docker image.
3. `docker-compose up db`. Do this in another tab so you can see its progress. In this instance the db user name is `db2` and the password is `password123`. Change these in the environment settings in the docker compose file.
4. Wait for it to boot up.
5. `docker-compose up app`. _However_ this will fail for the reasons below.

## Updating the nodejs file in the container

In order to get the nodejs app to contact the DB2 server, we need to make a couple of key changes in the `knex-db2` library itself so it's in line with the updated version of `odbc`.

```javascript
return new Promise((resolve, reject) => {
-  this.driver.open(this._getConnectionString(connectionConfig), (err, connection) => {
+  this.driver.connect(this._getConnectionString(connectionConfig), (err, connection) => {
```

Also, find all `*Async` and remove the `Async` part since the updated version of `odbc` has native promise support. Alternatively, fork the repo and make your changes to your own version.

## Running the NodeJS file again

After these changes have been made, you probably want to run it again, but this time, we'll get something like this:

```bash
[Error: select * from table1 where x = 'y' - [odbc] Error getting information about parameters] {
  odbcErrors: [
    {
      state: '42S02',
      code: -204,
      message: '[IBM][CLI Driver][DB2/LINUXX8664] SQL0204N  "DB2.TABLE1" is an undefined name.  SQLSTATE=42704\n'
    }
  ]
}
```

This is actually great news, it's actually connecting the database!
