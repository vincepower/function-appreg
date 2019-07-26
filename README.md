# Creating the CosmosDB

Create a CosmosDB with a database named "aro" and a collection called "lists". Then load data that is in the cosmosdb.json file.

# Create an Azure Function

Create an Azure Function with whatever name (adjust the RHPDS ARO env_vars.yml as required).
Load the Functions via Visual Studio, and update the integration for Cosmos DB on both Triggers to have a value connection ID.

# Create keyvault

I have a keyvault with two secrets per app registration. id-appreg00 is the object id AND key-appreg00 is the password/secret.


So once this is running the follow commands are used to get the values to assign:

```
$ curl https://blah.site/api/get/GUID
aroreg01

$ az keyvault secret show -o table --vault-name RHPDSAppRegList -n id-aroreg01
Value
--------------------------------
a1b2c3d4-e5f6-fedc-ba09-876543210123

$ az keyvault secret show -o table --vault-name RHPDSAppRegList -n key-aroreg01
Value
--------------------------------
ItsJustAnotherPassword0123456789

$ az openshift create -g resource_group -n cluster_name \
  --aad-client-app-id id_value --aad-client-app-secret key_value

```

To free up a value for later use:
```
$ curl https://blah.site/api/release/GUID
AppReg ObjectID aroreg01 for instance GUID has been released.
$
```

