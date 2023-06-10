# sms-send-service
Simple sms send service

## Setup
### add .env file
```
ENVIRONMENT=local
SENS_SERVICE_ID={sens_service_id}
SENS_ACCESS_KEY={sens_access_key}
SENS_SECRET_KEY={sens_secret_key}
SENS_MY_NUMBER={sens_my_number}
```
---
## USE
### Install packages
```
$ yarn
```
### Start server
```
$ yarn start
```
---
## Endpoints
### Send SMS
URL
```
POST {domain}/send
```
BODY
```
{
    "phoneNumber": "XXXXXXXX",
    "message": "TEST"
}
```
---
## Author
- Donghyuk Lee, mrgamza@gmail.com
---
## License
- MIT license.
