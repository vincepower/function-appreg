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

# Adding all the application registrations

Create 100 app registrations with the directory.read.all permission by making the following two files in the same directory, be logged into the Azure CLI, and then run ./loop.sh

You still need to log into the Azure Portal afterwards and manually "Approve" each app registration because of how Azure's security works in the Graph API.

###rra.json
```
[{
  "resourceAppId": "00000002-0000-0000-c000-000000000000",
  "resourceAccess": [
    {
      "id": "311a71cc-e848-46a1-bdf8-97ff7156d8e6",
      "type": "Scope"
    },
    {
      "id": "5778995a-e1bf-45b8-affa-663a9f3f4d04",
      "type": "Role"
    }
  ]
}]
```

###loop.sh
```
#!/usr/local/bin/bash
  
for x in 0 1 2 3 4 5 6 7 8 9
do
  for y in 0 1 2 3 4 5 6 7 8 9
  do
    ARNAME=aroreg$x$y
    echo -n "\"$ARNAME\","
    #az ad app create --display-name $ARNAME --required-resource-accesses @rra.json \
    #    --identifier-uris https://$ARNAME --homepage https://$ARNAME --query 'appId'
  done
done
```
